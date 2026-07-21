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

// simple cache so we dont hit db every request (bonus)
let cache: { data: unknown; expires: number } | null = null;
const CACHE_TIME = 30 * 1000; // 30 seconds

export async function GET(request: NextRequest) {
  try {
    // pagination stuff - ?page=1&limit=10
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || null;
    const limit = Number(searchParams.get('limit')) || 10;

    // return from cache if its still valid
    if (cache && Date.now() < cache.expires && !page) {
      return NextResponse.json(cache.data);
    }

    const customers = await prisma.customer.findMany({
      where: {
        sales: {
          none: {},
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // save to cache
    cache = { data: customers, expires: Date.now() + CACHE_TIME };

    // if they asked for a page, slice it (pagination)
    if (page) {
      const start = (page - 1) * limit;
      const paged = customers.slice(start, start + limit);
      return NextResponse.json({
        data: paged,
        page,
        limit,
        total: customers.length,
      });
    }

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Challenge 1 Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
