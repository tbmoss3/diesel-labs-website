import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getRepoInfo, getRepoCommits, getFileContent, getRepoIssues } from '@/lib/github';

// Simple in-memory cache for AI summaries (more expensive to generate)
const summaryCache = new Map<string, { data: ProjectSummary; timestamp: number }>();
const SUMMARY_CACHE_TTL = 30 * 60 * 1000; // 30 minutes for AI summaries

interface ProjectSummary {
  description: string;
  techStack: string[];
  recentActivity: string;
  featuresBuilt: string[];
  featuresPlanned: string[];
  generatedAt: string;
}

async function generateAISummary(
  owner: string,
  repo: string,
  readme: string | null,
  packageJson: string | null,
  commits: Array<{ message: string; date: string }>,
  openIssues: Array<{ title: string }>,
  closedIssues: Array<{ title: string }>
): Promise<ProjectSummary> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  
  if (!anthropicKey) {
    // Return basic summary without AI
    return {
      description: readme?.slice(0, 200) || `${owner}/${repo} repository`,
      techStack: packageJson ? extractTechStack(packageJson) : [],
      recentActivity: commits.length > 0 
        ? `${commits.length} commits recently, latest: "${commits[0].message}"`
        : 'No recent activity',
      featuresBuilt: closedIssues.slice(0, 5).map(i => i.title),
      featuresPlanned: openIssues.slice(0, 5).map(i => i.title),
      generatedAt: new Date().toISOString(),
    };
  }

  // Build context for Claude
  const context = `
Repository: ${owner}/${repo}

README (first 2000 chars):
${readme?.slice(0, 2000) || 'No README found'}

package.json:
${packageJson || 'No package.json found'}

Recent commits (${commits.length}):
${commits.slice(0, 10).map(c => `- ${c.message}`).join('\n')}

Open issues (${openIssues.length}):
${openIssues.slice(0, 10).map(i => `- ${i.title}`).join('\n')}

Closed issues (${closedIssues.length}):
${closedIssues.slice(0, 10).map(i => `- ${i.title}`).join('\n')}
  `.trim();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `Analyze this GitHub repository and provide a JSON summary.

${context}

Respond with ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "description": "2-3 sentence project description",
  "techStack": ["array", "of", "main", "technologies"],
  "recentActivity": "1-2 sentence summary of recent development activity",
  "featuresBuilt": ["list of 3-5 features that appear to be completed based on closed issues and commits"],
  "featuresPlanned": ["list of 3-5 features that appear to be in progress or planned based on open issues"]
}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;
    
    if (!content) {
      throw new Error('No content in response');
    }

    const parsed = JSON.parse(content);
    
    return {
      description: parsed.description || `${owner}/${repo} repository`,
      techStack: parsed.techStack || [],
      recentActivity: parsed.recentActivity || 'No recent activity data',
      featuresBuilt: parsed.featuresBuilt || [],
      featuresPlanned: parsed.featuresPlanned || [],
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('AI summary generation failed:', error);
    // Fallback to basic summary
    return {
      description: readme?.slice(0, 200) || `${owner}/${repo} repository`,
      techStack: packageJson ? extractTechStack(packageJson) : [],
      recentActivity: commits.length > 0 
        ? `${commits.length} commits recently`
        : 'No recent activity',
      featuresBuilt: closedIssues.slice(0, 5).map(i => i.title),
      featuresPlanned: openIssues.slice(0, 5).map(i => i.title),
      generatedAt: new Date().toISOString(),
    };
  }
}

function extractTechStack(packageJsonStr: string): string[] {
  try {
    const pkg = JSON.parse(packageJsonStr);
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const techStack: string[] = [];
    
    // Common frameworks/libraries to highlight
    const important = [
      'react', 'next', 'vue', 'nuxt', 'angular', 'svelte',
      'express', 'fastify', 'nest', 'hono',
      'typescript', 'prisma', 'drizzle', 'mongoose',
      'tailwindcss', 'sass', 'styled-components',
      'vite', 'webpack', 'esbuild',
    ];
    
    for (const dep of important) {
      if (deps[dep]) {
        techStack.push(dep);
      }
    }
    
    return techStack;
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  const refresh = searchParams.get('refresh') === 'true';

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing required parameters: owner and repo' },
      { status: 400 }
    );
  }

  // Check cache unless refresh requested
  const cacheKey = `summary:${owner}/${repo}`;
  if (!refresh) {
    const cached = summaryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < SUMMARY_CACHE_TTL) {
      return NextResponse.json({
        owner,
        repo,
        summary: cached.data,
        cached: true,
      });
    }
  }

  try {
    // Fetch all data in parallel
    const [repoInfo, commits, readme, packageJson, issues] = await Promise.all([
      getRepoInfo(owner, repo),
      getRepoCommits(owner, repo, 20),
      getFileContent(owner, repo, 'README.md'),
      getFileContent(owner, repo, 'package.json'),
      getRepoIssues(owner, repo, 'all', 50),
    ]);

    const openIssues = issues.filter(i => i.state === 'open');
    const closedIssues = issues.filter(i => i.state === 'closed');

    // Generate AI summary
    const summary = await generateAISummary(
      owner,
      repo,
      readme,
      packageJson,
      commits.map(c => ({ message: c.message, date: c.date })),
      openIssues.map(i => ({ title: i.title })),
      closedIssues.map(i => ({ title: i.title }))
    );

    // Cache the result
    summaryCache.set(cacheKey, { data: summary, timestamp: Date.now() });

    return NextResponse.json({
      owner,
      repo,
      repoInfo,
      summary,
      stats: {
        commits: commits.length,
        openIssues: openIssues.length,
        closedIssues: closedIssues.length,
      },
      cached: false,
    });
  } catch (error) {
    console.error('GitHub summary generation error:', error);
    
    const message = error instanceof Error ? error.message : 'Failed to generate summary';
    const status = message.includes('rate limit') ? 429 : 
                   message.includes('not found') ? 404 : 500;
    
    return NextResponse.json({ error: message }, { status });
  }
}
