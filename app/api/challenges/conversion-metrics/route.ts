import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {getMetrics} from "@/lib/metrics.service";

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
        const metrics = await getMetrics()
        return NextResponse.json(
            metrics);
    } catch (error) {
        console.error('Challenge 4 Error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}
