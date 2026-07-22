import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {getProductReport} from "@/lib/productReport.service";

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
export async function GET(request: NextRequest) {
    try {
        const productsReport = await getProductReport()
        return NextResponse.json(
            {data: productsReport},
            {status: 200}
        );
    } catch (error) {
        console.error('Challenge 3 Error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}
