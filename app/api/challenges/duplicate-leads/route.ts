import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface DuplicateLeadResult {
  email: string;
  leadIds: string;
}

/**
 * Challenge 2: Find Duplicate Lead Emails
 *
 * TODO: Implement this endpoint to find emails that appear multiple times in the leads table.
 *
 * Requirements:
 * - Find emails that appear 2 or more times
 * - For each duplicate email, list all the lead IDs (comma-separated)
 * - Return format: { email, leadIds: "1,2,3" }
 * - Handle edge cases (no duplicates, null emails)
 */

// cache for this endpoint, same idea as challenge 1
let cache: { data: DuplicateLeadResult[]; expires: number } | null = null;
const CACHE_TIME = 30 * 1000;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || null;
    const limit = Number(searchParams.get('limit')) || 10;

    if (cache && Date.now() < cache.expires && !page) {
      // used cache here so its faster on repeat calls
      return NextResponse.json(cache.data);
    }

    const grouped = await prisma.lead.groupBy({
      by: ['email'],
      where: {
        email: {
          not: null,
        },
      },
      _count: {
        email: true,
      },
    });

    const duplicates = grouped.filter((g) => g._count.email >= 2 && g.email);

    const result: DuplicateLeadResult[] = [];

    for (const dup of duplicates) {
      const leads = await prisma.lead.findMany({
        where: { email: dup.email },
        select: { id: true },
      });

      result.push({
        email: dup.email!,
        leadIds: leads.map((l) => l.id).join(','),
      });
    }

    cache = { data: result, expires: Date.now() + CACHE_TIME };

    // pagination - only if page is passed
    if (page) {
      const start = (page - 1) * limit;
      return NextResponse.json({
        data: result.slice(start, start + limit),
        page,
        limit,
        total: result.length,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Challenge 2 Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
