import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ConversionMetrics {
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number; // percentage, rounded to 2 decimals
  averageLeadScore: number;
}

/**
 * Challenge 4: Lead Conversion Metrics (BONUS)
 *
 * TODO: Implement this endpoint to calculate lead conversion metrics.
 *
 * Requirements:
 * - Count total leads in the database
 * - Count leads with status "Converted"
 * - Calculate conversion rate as percentage (convertedLeads / totalLeads * 100)
 * - Calculate average lead score across all leads
 * - Round conversionRate to 2 decimal places
 * - Return format: { totalLeads, convertedLeads, conversionRate, averageLeadScore }
 */

// no pagination here cus its just one object, but i cached it
let cache: { data: ConversionMetrics; expires: number } | null = null;
const CACHE_TIME = 30 * 1000;

export async function GET(request: NextRequest) {
  try {
    if (cache && Date.now() < cache.expires) {
      // serving from cache
      return NextResponse.json(cache.data);
    }

    const totalLeads = await prisma.lead.count();

    const convertedLeads = await prisma.lead.count({
      where: {
        status: 'Converted',
      },
    });

    const avg = await prisma.lead.aggregate({
      _avg: {
        score: true,
      },
    });

    let conversionRate = 0;
    if (totalLeads > 0) {
      conversionRate = Number(
        ((convertedLeads / totalLeads) * 100).toFixed(2)
      );
    }

    const metrics: ConversionMetrics = {
      totalLeads,
      convertedLeads,
      conversionRate,
      averageLeadScore: avg._avg.score ?? 0,
    };

    // cache the metrics
    cache = { data: metrics, expires: Date.now() + CACHE_TIME };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Challenge 4 Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
