import { prisma } from './prisma';

export type HealthStatus = 'healthy' | 'degraded' | 'down' | 'unknown';

export interface HealthCheckResult {
  status: HealthStatus;
  responseTime?: number; // in milliseconds
  error?: string;
  checkedAt: Date;
}

/**
 * Check health of a Railway service using their API
 */
export async function checkRailwayHealth(serviceId: string): Promise<HealthCheckResult> {
  const apiToken = process.env.RAILWAY_API_TOKEN;
  
  if (!apiToken) {
    return {
      status: 'unknown',
      error: 'RAILWAY_API_TOKEN not configured',
      checkedAt: new Date(),
    };
  }

  const startTime = Date.now();
  
  try {
    const response = await fetch('https://backboard.railway.app/graphql/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        query: `
          query ServiceStatus($serviceId: String!) {
            service(id: $serviceId) {
              id
              name
              deployments(first: 1) {
                edges {
                  node {
                    id
                    status
                    createdAt
                  }
                }
              }
            }
          }
        `,
        variables: { serviceId },
      }),
    });

    const responseTime = Date.now() - startTime;
    const data = await response.json();

    if (data.errors) {
      return {
        status: 'down',
        responseTime,
        error: data.errors[0]?.message || 'Railway API error',
        checkedAt: new Date(),
      };
    }

    const deployment = data.data?.service?.deployments?.edges?.[0]?.node;
    
    if (!deployment) {
      return {
        status: 'unknown',
        responseTime,
        error: 'No deployments found',
        checkedAt: new Date(),
      };
    }

    // Railway status values: SUCCESS, BUILDING, DEPLOYING, FAILED, CRASHED, etc.
    const railwayStatus = deployment.status?.toUpperCase();
    let status: HealthStatus = 'unknown';
    
    if (railwayStatus === 'SUCCESS') {
      status = responseTime > 3000 ? 'degraded' : 'healthy';
    } else if (['BUILDING', 'DEPLOYING'].includes(railwayStatus)) {
      status = 'degraded';
    } else if (['FAILED', 'CRASHED', 'REMOVED'].includes(railwayStatus)) {
      status = 'down';
    }

    return {
      status,
      responseTime,
      checkedAt: new Date(),
    };
  } catch (error) {
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
      checkedAt: new Date(),
    };
  }
}

/**
 * Check health of a Vercel deployment using their API
 */
export async function checkVercelHealth(projectId: string): Promise<HealthCheckResult> {
  const apiToken = process.env.VERCEL_API_TOKEN;
  
  if (!apiToken) {
    return {
      status: 'unknown',
      error: 'VERCEL_API_TOKEN not configured',
      checkedAt: new Date(),
    };
  }

  const startTime = Date.now();
  
  try {
    const response = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=1&state=READY`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
        },
      }
    );

    const responseTime = Date.now() - startTime;
    
    if (!response.ok) {
      return {
        status: 'down',
        responseTime,
        error: `Vercel API returned ${response.status}`,
        checkedAt: new Date(),
      };
    }

    const data = await response.json();
    const deployment = data.deployments?.[0];

    if (!deployment) {
      return {
        status: 'unknown',
        responseTime,
        error: 'No deployments found',
        checkedAt: new Date(),
      };
    }

    // Check the deployment state
    const vercelState = deployment.state?.toUpperCase();
    let status: HealthStatus = 'unknown';

    if (vercelState === 'READY') {
      status = responseTime > 3000 ? 'degraded' : 'healthy';
    } else if (['BUILDING', 'INITIALIZING', 'QUEUED'].includes(vercelState)) {
      status = 'degraded';
    } else if (['ERROR', 'CANCELED'].includes(vercelState)) {
      status = 'down';
    }

    return {
      status,
      responseTime,
      checkedAt: new Date(),
    };
  } catch (error) {
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
      checkedAt: new Date(),
    };
  }
}

/**
 * Check health of a custom endpoint via HTTP GET
 */
export async function checkCustomEndpoint(url: string): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Diesel-Labs-Monitor/1.0',
      },
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      // 2xx response
      if (responseTime > 3000) {
        return {
          status: 'degraded',
          responseTime,
          error: 'Slow response time',
          checkedAt: new Date(),
        };
      }
      return {
        status: 'healthy',
        responseTime,
        checkedAt: new Date(),
      };
    } else {
      // Non-2xx response
      return {
        status: 'down',
        responseTime,
        error: `HTTP ${response.status}`,
        checkedAt: new Date(),
      };
    }
  } catch (error) {
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
      checkedAt: new Date(),
    };
  }
}

/**
 * Run health check for a deployment based on its configuration
 */
export async function checkDeploymentHealth(deployment: {
  id: string;
  platform: string;
  serviceId?: string | null;
  healthEndpoint?: string | null;
}): Promise<HealthCheckResult> {
  // Priority 1: Custom health endpoint
  if (deployment.healthEndpoint) {
    return checkCustomEndpoint(deployment.healthEndpoint);
  }

  // Priority 2: Platform-specific API check
  if (deployment.serviceId) {
    if (deployment.platform === 'railway') {
      return checkRailwayHealth(deployment.serviceId);
    }
    if (deployment.platform === 'vercel') {
      return checkVercelHealth(deployment.serviceId);
    }
  }

  // No health check method available
  return {
    status: 'unknown',
    error: 'No health check method configured',
    checkedAt: new Date(),
  };
}

/**
 * Update deployment status in the database
 */
export async function updateDeploymentStatus(
  deploymentId: string,
  result: HealthCheckResult
): Promise<void> {
  await prisma.deployment.update({
    where: { id: deploymentId },
    data: {
      status: result.status,
      lastChecked: result.checkedAt,
      updatedAt: new Date(),
    },
  });
}

/**
 * Check health of all deployments for a project and update database
 */
export async function checkProjectHealth(projectId: string): Promise<{
  projectId: string;
  deployments: Array<{
    id: string;
    name: string;
    platform: string;
    result: HealthCheckResult;
  }>;
}> {
  const deployments = await prisma.deployment.findMany({
    where: { projectId },
  });

  const results = await Promise.all(
    deployments.map(async (deployment) => {
      const result = await checkDeploymentHealth(deployment);
      await updateDeploymentStatus(deployment.id, result);
      return {
        id: deployment.id,
        name: deployment.name,
        platform: deployment.platform,
        result,
      };
    })
  );

  return {
    projectId,
    deployments: results,
  };
}

/**
 * Check health of all deployments for a user's projects
 */
export async function checkUserProjectsHealth(userId: string): Promise<Array<{
  projectId: string;
  projectName: string;
  deployments: Array<{
    id: string;
    name: string;
    platform: string;
    result: HealthCheckResult;
  }>;
}>> {
  const client = await prisma.client.findUnique({
    where: { userId },
    include: {
      projects: {
        include: {
          deployments: true,
        },
      },
    },
  });

  if (!client) {
    return [];
  }

  const results = await Promise.all(
    client.projects.map(async (project) => {
      const deploymentResults = await Promise.all(
        project.deployments.map(async (deployment) => {
          const result = await checkDeploymentHealth(deployment);
          await updateDeploymentStatus(deployment.id, result);
          return {
            id: deployment.id,
            name: deployment.name,
            platform: deployment.platform,
            result,
          };
        })
      );

      return {
        projectId: project.id,
        projectName: project.name,
        deployments: deploymentResults,
      };
    })
  );

  return results;
}

// CRON JOB HINT:
// To run health checks automatically every 5 minutes, set up a cron job:
// 
// Option 1: Vercel Cron (vercel.json)
// {
//   "crons": [{
//     "path": "/api/monitoring/cron",
//     "schedule": "*/5 * * * *"
//   }]
// }
//
// Option 2: External cron service (e.g., cron-job.org)
// POST https://your-domain.com/api/monitoring/check with auth header
//
// Option 3: Railway cron service
// Create a separate service that calls the health check endpoint
