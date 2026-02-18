import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getRepoCommits } from '@/lib/github';

export async function GET(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 10;

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing required parameters: owner and repo' },
      { status: 400 }
    );
  }

  if (isNaN(limit) || limit < 1 || limit > 100) {
    return NextResponse.json(
      { error: 'Limit must be between 1 and 100' },
      { status: 400 }
    );
  }

  try {
    const commits = await getRepoCommits(owner, repo, limit);
    
    return NextResponse.json({
      owner,
      repo,
      commits,
      count: commits.length,
    });
  } catch (error) {
    console.error('GitHub commits fetch error:', error);
    
    const message = error instanceof Error ? error.message : 'Failed to fetch commits';
    const status = message.includes('rate limit') ? 429 : 
                   message.includes('not found') ? 404 : 500;
    
    return NextResponse.json({ error: message }, { status });
  }
}
