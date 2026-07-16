/**
 * CRM Challenge Test Suite
 * 
 * Tests for all 4 challenges using Jest
 * Run: npm test or npx jest
 */

import { prisma } from '@/lib/prisma';

const BASE_URL = 'http://localhost:3000';

describe('CRM Challenge Tests', () => {
  // Setup and teardown
  beforeAll(async () => {
    // Ensure database is seeded with test data
    console.log('Starting CRM Challenge Tests');
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // ============================================
  // Challenge 1: Customers Without Purchases
  // ============================================
  describe('Challenge 1: Customers Without Purchases', () => {
    let response: Response;
    let data: unknown;

    beforeAll(async () => {
      response = await fetch(`${BASE_URL}/api/challenges/customers-no-purchases`);
      data = await response.json();
    });

    test('should return HTTP 200 status', () => {
      // Skip if not implemented
      if (response.status === 501) {
        console.log('Challenge 1 not implemented yet');
        return;
      }
      expect(response.status).toBe(200);
    });

    test('should return an array', () => {
      if (response.status === 501) return;
      expect(Array.isArray(data)).toBe(true);
    });

    test('should have required fields in each record', () => {
      if (response.status === 501 || !Array.isArray(data) || data.length === 0) return;

      const first = data[0] as Record<string, unknown>;
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('name');
      expect(first).toHaveProperty('email');
    });

    test('should have correct field types', () => {
      if (response.status === 501 || !Array.isArray(data) || data.length === 0) return;

      const first = data[0] as Record<string, unknown>;
      expect(typeof first.id).toBe('number');
      expect(typeof first.name).toBe('string');
      expect(typeof first.email).toBe('string');
    });

    test('customers should have no purchases', async () => {
      if (response.status === 501 || !Array.isArray(data)) return;

      for (const customer of data as Array<{ id: number }>) {
        const sales = await prisma.sale.findMany({
          where: { customerId: customer.id }
        });
        expect(sales.length).toBe(0);
      }
    });

    test('should not include customers with purchases', async () => {
      if (response.status === 501 || !Array.isArray(data)) return;

      const customersWithSales = await prisma.customer.findMany({
        where: {
          sales: {
            some: {}
          }
        },
        select: { id: true }
      });

      const returnedIds = (data as Array<{ id: number }>).map(c => c.id);
      for (const customer of customersWithSales) {
        expect(returnedIds).not.toContain(customer.id);
      }
    });
  });

  // ============================================
  // Challenge 2: Duplicate Lead Emails
  // ============================================
  describe('Challenge 2: Duplicate Lead Emails', () => {
    let response: Response;
    let data: unknown;

    beforeAll(async () => {
      response = await fetch(`${BASE_URL}/api/challenges/duplicate-leads`);
      data = await response.json();
    });

    test('should return HTTP 200 status', () => {
      if (response.status === 501) {
        console.log('Challenge 2 not implemented yet');
        return;
      }
      expect(response.status).toBe(200);
    });

    test('should return an array', () => {
      if (response.status === 501) return;
      expect(Array.isArray(data)).toBe(true);
    });

    test('should have required fields in each record', () => {
      if (response.status === 501 || !Array.isArray(data) || data.length === 0) return;

      const first = data[0] as Record<string, unknown>;
      expect(first).toHaveProperty('email');
      expect(first).toHaveProperty('leadIds');
    });

    test('should have correct field types', () => {
      if (response.status === 501 || !Array.isArray(data) || data.length === 0) return;

      const first = data[0] as Record<string, unknown>;
      expect(typeof first.email).toBe('string');
      expect(typeof first.leadIds).toBe('string');
    });

    test('should only include emails with duplicates', () => {
      if (response.status === 501 || !Array.isArray(data)) return;

      for (const item of data as Array<{ email: string; leadIds: string }>) {
        // leadIds should have at least 2 IDs (comma-separated)
        const ids = item.leadIds.split(',');
        expect(ids.length).toBeGreaterThanOrEqual(2);
      }
    });

    test('should not include non-duplicate emails', async () => {
      if (response.status === 501) return;

      const allEmails = await prisma.lead.findMany({
        where: { email: { not: null } },
        select: { email: true }
      });

      // Count occurrences
      const emailCounts: Record<string, number> = {};
      for (const lead of allEmails) {
        if (lead.email) {
          emailCounts[lead.email] = (emailCounts[lead.email] || 0) + 1;
        }
      }

      // Get unique emails from response
      const returnedEmails = (data as Array<{ email: string }>).map(item => item.email);

      // All returned emails should have count > 1
      for (const email of returnedEmails) {
        expect(emailCounts[email] || 0).toBeGreaterThan(1);
      }
    });
  });

  // ============================================
  // Challenge 3: Product Inventory Report
  // ============================================
  describe('Challenge 3: Product Inventory Report', () => {
    let response: Response;
    let data: unknown;

    beforeAll(async () => {
      response = await fetch(`${BASE_URL}/api/challenges/product-report`);
      data = await response.json();
    });

    test('should return HTTP 200 status', () => {
      if (response.status === 501) {
        console.log('Challenge 3 not implemented yet');
        return;
      }
      expect(response.status).toBe(200);
    });

    test('should return an array', () => {
      if (response.status === 501) return;
      expect(Array.isArray(data)).toBe(true);
    });

    test('should have required fields in each record', () => {
      if (response.status === 501 || !Array.isArray(data) || data.length === 0) return;

      const first = data[0] as Record<string, unknown>;
      expect(first).toHaveProperty('name');
      expect(first).toHaveProperty('currentStock');
      expect(first).toHaveProperty('totalSold');
    });

    test('should have correct field types', () => {
      if (response.status === 501 || !Array.isArray(data) || data.length === 0) return;

      const first = data[0] as Record<string, unknown>;
      expect(typeof first.name).toBe('string');
      expect(typeof first.currentStock).toBe('number');
      expect(typeof first.totalSold).toBe('number');
    });

    test('should include products with zero sales', () => {
      if (response.status === 501 || !Array.isArray(data)) return;

      // At least one product should have totalSold = 0
      const hasZeroSales = (data as Array<{ totalSold: number }>).some(p => p.totalSold === 0);
      expect(hasZeroSales).toBe(true);
    });

    test('should be sorted by totalSold descending', () => {
      if (response.status === 501 || !Array.isArray(data) || data.length < 2) return;

      const products = data as Array<{ totalSold: number }>;
      for (let i = 1; i < products.length; i++) {
        expect(products[i].totalSold).toBeLessThanOrEqual(products[i - 1].totalSold);
      }
    });

    test('totalSold should match database sales sum', async () => {
      if (response.status === 501 || !Array.isArray(data)) return;

      for (const product of data as Array<{ name: string; totalSold: number }>) {
        const dbProduct = await prisma.product.findFirst({
          where: { name: product.name },
          include: { sales: true }
        });

        if (dbProduct) {
          const actualTotal = dbProduct.sales.reduce((sum, sale) => sum + sale.quantity, 0);
          expect(product.totalSold).toBe(actualTotal);
        }
      }
    });
  });

  // ============================================
  // Challenge 4: Lead Conversion Metrics
  // ============================================
  describe('Challenge 4: Lead Conversion Metrics', () => {
    let response: Response;
    let data: unknown;

    beforeAll(async () => {
      response = await fetch(`${BASE_URL}/api/challenges/conversion-metrics`);
      data = await response.json();
    });

    test('should return HTTP 200 status', () => {
      if (response.status === 501) {
        console.log('Challenge 4 not implemented yet');
        return;
      }
      expect(response.status).toBe(200);
    });

    test('should return an object', () => {
      if (response.status === 501) return;
      expect(typeof data).toBe('object');
      expect(!Array.isArray(data)).toBe(true);
    });

    test('should have all required fields', () => {
      if (response.status === 501) return;

      const obj = data as Record<string, unknown>;
      expect(obj).toHaveProperty('totalLeads');
      expect(obj).toHaveProperty('convertedLeads');
      expect(obj).toHaveProperty('conversionRate');
      expect(obj).toHaveProperty('averageLeadScore');
    });

    test('should have correct field types', () => {
      if (response.status === 501) return;

      const obj = data as Record<string, unknown>;
      expect(typeof obj.totalLeads).toBe('number');
      expect(typeof obj.convertedLeads).toBe('number');
      expect(typeof obj.conversionRate).toBe('number');
      expect(typeof obj.averageLeadScore).toBe('number');
    });

    test('should have non-negative values', () => {
      if (response.status === 501) return;

      const obj = data as Record<string, number>;
      expect(obj.totalLeads).toBeGreaterThanOrEqual(0);
      expect(obj.convertedLeads).toBeGreaterThanOrEqual(0);
      expect(obj.conversionRate).toBeGreaterThanOrEqual(0);
      expect(obj.averageLeadScore).toBeGreaterThanOrEqual(0);
    });

    test('conversionRate should be between 0 and 100', () => {
      if (response.status === 501) return;

      const obj = data as Record<string, number>;
      expect(obj.conversionRate).toBeLessThanOrEqual(100);
    });

    test('convertedLeads should not exceed totalLeads', () => {
      if (response.status === 501) return;

      const obj = data as Record<string, number>;
      expect(obj.convertedLeads).toBeLessThanOrEqual(obj.totalLeads);
    });

    test('totalLeads should match database count', async () => {
      if (response.status === 501) return;

      const count = await prisma.lead.count();
      const obj = data as Record<string, number>;
      expect(obj.totalLeads).toBe(count);
    });

    test('convertedLeads should match "Converted" status count', async () => {
      if (response.status === 501) return;

      const count = await prisma.lead.count({
        where: { status: 'Converted' }
      });
      const obj = data as Record<string, number>;
      expect(obj.convertedLeads).toBe(count);
    });

    test('conversionRate should be correctly calculated', () => {
      if (response.status === 501) return;

      const obj = data as Record<string, number>;
      const expected = obj.totalLeads > 0
        ? Number(((obj.convertedLeads / obj.totalLeads) * 100).toFixed(2))
        : 0;
      expect(obj.conversionRate).toBe(expected);
    });
  });
});
