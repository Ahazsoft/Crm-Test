# 🏢 CRM Mini Project - Developer Challenge

A comprehensive assessment project designed to test junior developer understanding of full-stack development with **Next.js**, **Prisma ORM**, and **database design**.

## 📋 Project Overview

This is a **Sales CRM (Customer Relationship Management) system** that tracks:
- **Customers** - People who have made purchases
- **Leads** - Potential customers
- **Products** - Inventory items
- **Sales** - Purchase transactions

Students must implement 4 progressively challenging API endpoints using Prisma queries and Next.js.

## 🎯 Learning Objectives

By completing this project, you will:

✅ Master Prisma ORM and complex database queries
✅ Build production-ready REST APIs with Next.js
✅ Understand database relations and joins
✅ Work with aggregations and filtering
✅ Implement error handling and type safety

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)
- Database credentials (provided by instructor)

### Setup Steps

1. **Clone/Extract the project**
   ```bash
   cd crm-mini-project
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment**
   - Ask your instructor for the `.env` file with `DATABASE_URL`
   - Place it in the root directory
   - The database should already be set up with sample data

4. **Sync Prisma schema**
   ```bash
   npx prisma generate
   ```
   

5. **Start the dev server**
   ```bash
   pnpm dev
   ```
   
   The app will run at `http://localhost:3000`

6. **Verify setup**
   ```bash
   # Test all endpoints (they should return "not implemented yet")
   curl http://localhost:3000/api/challenges/customers-no-purchases
   ```

## 📁 Project Structure

```
crm-mini-project/
├── app/
│   ├── api/challenges/
│   │   ├── customers-no-purchases/route.ts    # Challenge 1
│   │   ├── duplicate-leads/route.ts           # Challenge 2
│   │   ├── product-report/route.ts            # Challenge 3
│   │   └── conversion-metrics/route.ts        # Challenge 4
│   └── page.tsx                                # Dashboard (bonus)
├── prisma/
│   └── schema.prisma                           # Database schema
├── scripts/
│   └── verify-challenges.ts                    # Test runner
├── CHALLENGES.md                               # Challenge descriptions
├── SOLUTIONS.md                                # Reference solutions (instructors only)
└── package.json
```

## 🎓 Challenges

There are **4 challenges** to complete, ranked by difficulty:

### Challenge 1: Find Customers Without Purchases ⭐
**Endpoint:** `GET /api/challenges/customers-no-purchases`

Find all customers who have never made a purchase.

- **File:** `app/api/challenges/customers-no-purchases/route.ts`
- **Difficulty:** Beginner
- **Key Concept:** Filtering relationships with Prisma

### Challenge 2: Find Duplicate Lead Emails ⭐⭐
**Endpoint:** `GET /api/challenges/duplicate-leads`

Find emails that appear multiple times in the leads table.

- **File:** `app/api/challenges/duplicate-leads/route.ts`
- **Difficulty:** Intermediate
- **Key Concept:** Aggregation and grouping with `groupBy()`

### Challenge 3: Product Inventory Report ⭐⭐⭐
**Endpoint:** `GET /api/challenges/product-report`

Generate a report of products with current stock and total units sold.

- **File:** `app/api/challenges/product-report/route.ts`
- **Difficulty:** Advanced
- **Key Concept:** Complex aggregations and joins

### Challenge 4: Lead Conversion Metrics ⭐⭐⭐⭐
**Endpoint:** `GET /api/challenges/conversion-metrics`

Calculate lead conversion statistics.

- **File:** `app/api/challenges/conversion-metrics/route.ts`
- **Difficulty:** Expert (Bonus)
- **Key Concept:** Multiple aggregations in parallel

## 📖 How to Implement

For each challenge:

1. **Read the specification** in `CHALLENGES.md`
2. **Examine the starter template** in the corresponding route file
3. **Write your Prisma query** to fetch and transform data
4. **Handle errors** gracefully
5. **Test your implementation** using the verification script

Example structure for Challenge 1:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // TODO: Implement your query here
    const customers = await prisma.customer.findMany({
      where: {
        // Filter condition here
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## 🧪 Testing Your Solutions

### Manual Testing

Test each endpoint with curl:

```bash
# Challenge 1
curl http://localhost:3000/api/challenges/customers-no-purchases

# Challenge 2
curl http://localhost:3000/api/challenges/duplicate-leads

# Challenge 3
curl http://localhost:3000/api/challenges/product-report

# Challenge 4
curl http://localhost:3000/api/challenges/conversion-metrics
```

### Automated Testing

Run the verification script:

```bash
pnpm run verify
# or
npx ts-node scripts/verify-challenges.ts
```

This will check:
- ✅ Correct response format
- ✅ Required fields present
- ✅ Data types correct
- ✅ Proper sorting/filtering

## 📚 Resources

### Prisma Documentation
- [Prisma Query Methods](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
- [Prisma Relations](https://www.prisma.io/docs/orm/prisma-schema/relations)
- [Prisma Aggregations](https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing)
- [Prisma Raw Queries](https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access)

### Next.js Documentation
- [API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Request/Response](https://nextjs.org/docs/app/api-reference/functions/next-request)

### Database Concepts
- [SQL Joins](https://www.w3schools.com/sql/sql_join.asp)
- [GROUP BY and HAVING](https://www.w3schools.com/sql/sql_groupby.asp)
- [Aggregation Functions](https://www.w3schools.com/sql/sql_count_avg_sum.asp)

## 💡 Tips for Success

### DO ✅
- Start with Challenge 1 and work your way up
- Use Prisma's autocomplete (IntelliSense in your editor)
- Read the error messages carefully
- Test frequently with curl or Postman
- Use `select` to optimize queries (only fetch needed fields)
- Consider performance: avoid N+1 queries

### DON'T ❌
- Hardcode data or mock responses
- Query all data then filter in JavaScript
- Use deprecated Prisma methods
- Ignore TypeScript errors
- Copy/paste without understanding

## 🐛 Debugging

### Query Not Working?

1. **Check your Prisma syntax** - Use VS Code's Prisma extension
2. **Log the query** - Add `console.log()` to see generated SQL
3. **Check the data** - Use Prisma Studio to inspect the database:
   ```bash
   npx prisma studio
   ```
4. **Read the error message** - Prisma errors are usually very descriptive

### Import Errors?

Make sure you've run:
```bash
pnpm install
npx prisma generate
```

### Database Connection Issues?

Verify your `.env` file has the correct `DATABASE_URL`:
```env
DATABASE_URL="mysql://user:password@host:port/database"
```

## 🎁 Bonus Features

After completing the 4 challenges, consider adding:

1. **Dashboard UI** - Build a React page to visualize the CRM data
2. **Advanced Filtering** - Add query parameters for filtering results
3. **Pagination** - Implement pagination for large result sets
4. **Performance Optimization** - Add database indexes and optimize queries
5. **Error Recovery** - Add retry logic and graceful degradation

## 📋 Submission Checklist

Before submitting your work:

- [ ] All 4 challenges implemented
- [ ] All endpoints return correct data format
- [ ] All tests pass with `pnpm run verify`
- [ ] No hardcoded data
- [ ] Proper error handling
- [ ] Code is clean and well-commented
- [ ] TypeScript types are correct
- [ ] No console errors in browser or terminal

## 🤝 Getting Help

If you're stuck:

1. **Re-read the challenge** description carefully
2. **Check the CHALLENGES.md** for hints
3. **Review Prisma documentation** for the specific method
4. **Ask your mentor/instructor** for guidance
5. **Check reference solutions** (if provided by instructor)

## 📊 Evaluation Criteria

Your implementation will be evaluated on:

| Criteria | Weight |
|----------|--------|
| Correctness | 40% |
| Code Quality | 25% |
| Error Handling | 15% |
| Performance | 15% |
| Documentation | 5% |

## 🎉 Good Luck!

This is a real-world scenario that junior developers face daily. Master these skills, and you'll be well-prepared for a professional development role!

**Questions?** Ask your instructor or mentor during office hours.

---

**Last Updated:** July 2026
**Difficulty:** Junior Full Stack Developer
**Time Estimate:** 2-4 hours
