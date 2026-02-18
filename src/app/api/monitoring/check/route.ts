import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { checkDeploymentHealth, checkProjectHealth, updateDeploymentStatus } from '@/lib/monitoring';

interface CheckRequestBody {
  deploymentId?: string;
  projectId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: CheckRequestBody = await request.json();
    const { deploymentId, projectId } = body;

    if (!deploymentId && !projectId) {
      return NextResponse.json(
        { error: 'Either deploymentId or projectId is required' },
        { status: 400 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    const isAdmin = user?.role === 'admin';

    if (deploymentId) {
      // Check single deployment
      const deployment = await prisma.deployment.findUnique({
        where: { id: deploymentId },
        include: {
          project: {
            include: {
              client: {
                select: { userId: true },
              },
            },
          },
        },
      });

      if (!deployment) {
        return NextResponse.json(
          { error: 'Deployment not found' },
          { status: 404 }
        );
      }

      // Verify access
      if (!isAdmin && deployment.project.client.userId !== session.user.id) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }

      const result = await checkDeploymentHealth(deployment);
      await updateDeploymentStatus(deploymentId, result);

      return NextResponse.json({
        success: true,
        data: {
          id: deployment.id,
          name: deployment.name,
          platform: deployment.platform,
          status: result.status,
          responseTime: result.responseTime,
          error: result.error,
          lastChecked: result.checkedAt.toISOString(),
        },
      });
    }

    if (projectId) {
      // Check all deployments for a project
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
          client: {
            select: { userId: true },
          },
        },
      });

      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }

      // Verify access
      if (!isAdmin && project.client.userId !== session.user.id) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }

      const result = await checkProjectHealth(projectId);

      return NextResponse.json({
        success: true,
        data: {
          projectId: result.projectId,
          projectName: project.name,
          deployments: result.deployments.map((d) => ({
            id: d.id,
            name: d.name,
            platform: d.platform,
            status: d.result.status,
            responseTime: d.result.responseTime,
            error: d.result.error,
            lastChecked: d.result.checkedAt.toISOString(),
          })),
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Force check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
