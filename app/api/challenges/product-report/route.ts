import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ProductReport {
  name: string;
  currentStock: number;
  totalSold: number;
}

/**
 * Challenge 3: Product Inventory Report
 *
 * TODO: Implement this endpoint to generate a product report.
 *
 * Requirements:
 * - Get all products
 * - Include current stock_quantity
 * - Calculate total quantity sold from sales table
 * - Include products with 0 sales (never sold)
 * - Sort by totalSold in descending order
 * - Return format: { name, currentStock, totalSold }
 */

// caching the report for a bit, products dont change that often
let cache: { data: ProductReport[]; expires: number } | null = null;
const CACHE_TIME = 30 * 1000;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || null;
    const limit = Number(searchParams.get('limit')) || 10;

    if (cache && Date.now() < cache.expires && !page) {
      return NextResponse.json(cache.data);
    }

    const products = await prisma.product.findMany({
      include: {
        sales: true,
      },
    });

    const report: ProductReport[] = products.map((product) => {
      let totalSold = 0;
      for (const sale of product.sales) {
        totalSold += sale.quantity;
      }

      return {
        name: product.name,
        currentStock: product.stockQuantity,
        totalSold,
      };
    });

    report.sort((a, b) => b.totalSold - a.totalSold);

    // store in cache after we build it
    cache = { data: report, expires: Date.now() + CACHE_TIME };

    // i added pagination here with page + limit query params
    if (page) {
      const start = (page - 1) * limit;
      return NextResponse.json({
        data: report.slice(start, start + limit),
        page,
        limit,
        total: report.length,
      });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error('Challenge 3 Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
