import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {getDuplicateLeads} from "@/lib/leads.service";

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
export async function GET(request: NextRequest) {
    try {
        const duplicateLeads = await getDuplicateLeads();

        return NextResponse.json(duplicateLeads)
    } catch (error) {
        console.error('Challenge 2 Error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}
