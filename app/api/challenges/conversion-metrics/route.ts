import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
 
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
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement your solution here
    // Step 1: Get total count of leads
    // Step 2: Get count of converted leads (status = 'Converted')
    // Step 3: Calculate conversion rate
    // Step 4: Get average lead score
    // Step 5: Return formatted response
    
    // Hint: Consider using:
    // - prisma.lead.count()
    // - prisma.lead.findMany() with where filter
    // - prisma.lead.aggregate() for average calculation
  
    // Remove this and implement:
    return NextResponse.json(
      { error: 'Challenge 4 not implemented yet' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Challenge 4 Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
