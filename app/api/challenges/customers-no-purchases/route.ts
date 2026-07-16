import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Challenge 1: Find Customers Without Purchases
 * 
 * TODO: Implement this endpoint to return all customers who have never made a purchase.
 * 
 * Requirements:
 * - Find customers in the database
 * - Filter for those with NO sales records
 * - Return only: id, name, email
 * - Handle any errors gracefully
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement your solution here
    // Step 1: Query all customers
    // Step 2: Filter those without any sales
    // Step 3: Return the filtered list


    // Remove this and implement:
    return NextResponse.json(
      { error: 'Challenge 1 not implemented yet' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Challenge 1 Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
