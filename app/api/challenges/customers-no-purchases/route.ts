import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {getCustomerWithoutPurchase} from "@/lib/customers.service";

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
        const users = await getCustomerWithoutPurchase()

        return NextResponse.json(users)
    } catch (error) {
        console.error('Challenge 1 Error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}
