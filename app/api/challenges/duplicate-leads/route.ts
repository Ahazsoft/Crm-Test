import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma'; 

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
    // TODO: Implement your solution here
    // Step 1: Group leads by email
    // Step 2: Count occurrences of each email
    // Step 3: Filter for emails with count >= 2
    // Step 4: Collect the lead IDs for each email
    // Step 5: Return formatted response

  
    
    // Hint: You might want to use:
    // - prisma.lead.groupBy()
    // - prisma.lead.findMany()
    // - Or raw SQL via prisma.$queryRaw
    
    // Remove this and implement:
    return NextResponse.json(
      { error: 'Challenge 2 not implemented yet' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Challenge 2 Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
