import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { checkProjectHealth, checkUserProjectsHealth } from '@/lib/monitoring';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    const isAdmin = user?.role === 'admin';

    if (projectId) {
      // Check specific project
      // Verify user has access to this project
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

      // Allow admin or project owner
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
    } else {
      // Check all projects for user
      let results;
      
      if (isAdmin) {
        // Admin can see all projects
        const allProjects = await prisma.project.findMany({
          include: {
            deployments: true,
          },
        });

        results = await Promise.all(
          allProjects.map(async (project) => {
            const healthResult = await checkProjectHealth(project.id);
            return {
              projectId: project.id,
              projectName: project.name,
              deployments: healthResult.deployments.map((d) => ({
                id: d.id,
                name: d.name,
                platform: d.platform,
                status: d.result.status,
                responseTime: d.result.responseTime,
                error: d.result.error,
                lastChecked: d.result.checkedAt.toISOString(),
              })),
            };
          })
        );
      } else {
        // Regular user sees only their projects
        const rawResults = await checkUserProjectsHealth(session.user.id);
        results = rawResults.map((r) => ({
          projectId: r.projectId,
          projectName: r.projectName,
          deployments: r.deployments.map((d) => ({
            id: d.id,
            name: d.name,
            platform: d.platform,
            status: d.result.status,
            responseTime: d.result.responseTime,
            error: d.result.error,
            lastChecked: d.result.checkedAt.toISOString(),
          })),
        }));
      }

      return NextResponse.json({
        success: true,
        data: results,
      });
    }
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
