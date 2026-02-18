import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getRepoIssues } from '@/lib/github';

export async function GET(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  const state = searchParams.get('state') as 'open' | 'closed' | 'all' | null;
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 50;

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing required parameters: owner and repo' },
      { status: 400 }
    );
  }

  const validStates = ['open', 'closed', 'all'];
  const issueState = state && validStates.includes(state) ? state : 'all';

  if (isNaN(limit) || limit < 1 || limit > 100) {
    return NextResponse.json(
      { error: 'Limit must be between 1 and 100' },
      { status: 400 }
    );
  }

  try {
    const issues = await getRepoIssues(owner, repo, issueState, limit);
    
    // Separate issues by state
    const openIssues = issues.filter(i => i.state === 'open');
    const closedIssues = issues.filter(i => i.state === 'closed');
    
    return NextResponse.json({
      owner,
      repo,
      issues,
      summary: {
        total: issues.length,
        open: openIssues.length,
        closed: closedIssues.length,
      },
      openIssues,
      closedIssues,
    });
  } catch (error) {
    console.error('GitHub issues fetch error:', error);
    
    const message = error instanceof Error ? error.message : 'Failed to fetch issues';
    const status = message.includes('rate limit') ? 429 : 
                   message.includes('not found') ? 404 : 500;
    
    return NextResponse.json({ error: message }, { status });
  }
}
