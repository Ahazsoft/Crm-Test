# CRM Challenge - Quick Reference Card

Print this page or keep it open while working!

---

## 🚀 Quick Start (5 minutes)

```bash
pnpm install                    # Install dependencies
npx prisma migrate dev          # Setup database
pnpm dev                        # Start server
# Open http://localhost:3000
```

---

## 🎯 The 4 Challenges

| # | Name | Endpoint | Difficulty |
|---|------|----------|-----------|
| 1 | Customers Without Purchases | `/api/challenges/customers-no-purchases` | ⭐ |
| 2 | Duplicate Lead Emails | `/api/challenges/duplicate-leads` | ⭐⭐ |
| 3 | Product Inventory Report | `/api/challenges/product-report` | ⭐⭐⭐ |
| 4 | Conversion Metrics | `/api/challenges/conversion-metrics` | ⭐⭐⭐⭐ |

---

## 📁 Where to Code

Each challenge has a starter file:

```
app/api/challenges/
├── customers-no-purchases/route.ts      ← Challenge 1 HERE
├── duplicate-leads/route.ts             ← Challenge 2 HERE
├── product-report/route.ts              ← Challenge 3 HERE
└── conversion-metrics/route.ts          ← Challenge 4 HERE
```

**Find the TODO comment and replace with your implementation.**

---

## 🗄️ Database Tables

### Customers
```
id (int), name (string), email (string), phone (string)
Relations: sales, leads
```

### Leads
```
id (int), name (string), email (string), status (string), 
score (int), convertedCustomerId (int)
Relations: convertedCustomer
```

### Products
```
id (int), name (string), stockQuantity (int), price (decimal)
Relations: sales
```

### Sales
```
id (int), customerId (int), productId (int), quantity (int)
Relations: customer, product
```

---

## 💡 Prisma Snippets

### Basic Query
```typescript
const items = await prisma.model.findMany();
```

### Filter by Condition
```typescript
const items = await prisma.model.findMany({
  where: { field: value }
});
```

### Include Relations
```typescript
const items = await prisma.model.findMany({
  include: { relationName: true }
});
```

### Select Specific Fields
```typescript
const items = await prisma.model.findMany({
  select: { id: true, name: true }
});
```

### Count
```typescript
const count = await prisma.model.count();
const count = await prisma.model.count({ where: { field: value } });
```

### Aggregate (Sum, Avg, Min, Max)
```typescript
const agg = await prisma.model.aggregate({
  _sum: { field: true },
  _avg: { field: true }
});
```

### Group By
```typescript
const groups = await prisma.model.groupBy({
  by: ['field'],
  _count: true
});
```

### Filter Empty Relations
```typescript
await prisma.model.findMany({
  where: { relation: { none: {} } }  // No related records
});

await prisma.model.findMany({
  where: { relation: { some: {} } }  // Has related records
});
```

### Raw SQL
```typescript
const result = await prisma.$queryRaw`
  SELECT * FROM table WHERE condition
`;
```

---

## ✅ Testing Your Solution

### Dashboard (Easiest)
1. Go to http://localhost:3000/dashboard
2. Click "Test Endpoint" for each challenge
3. See live results

### Command Line
```bash
pnpm verify              # Test all challenges
npx ts-node scripts/verify-challenges.ts
```

### Manual Testing
```bash
curl http://localhost:3000/api/challenges/customers-no-purchases
```

---

## 🐛 Debugging Tips

### Check Database Data
```bash
npx prisma studio     # Opens GUI at http://localhost:5555
```

### Log Your Queries
```typescript
console.log("[v0] Data:", data);
```

### TypeScript Errors
- Hover over red squiggles in VS Code
- Check Prisma documentation for correct syntax
- Use `as unknown as Type` only as last resort

### Not Getting Results
1. Verify database has data in Prisma Studio
2. Check WHERE clause logic
3. Make sure SELECT/INCLUDE is correct
4. Test with simpler query first

---

## 📚 Common Prisma Patterns

### Challenge 1 Pattern: Filter Empty Relations
```typescript
const customers = await prisma.customer.findMany({
  where: {
    sales: { none: {} }  // ← No purchases
  },
  select: { id: true, name: true, email: true }
});
```

### Challenge 2 Pattern: Find Duplicates
```typescript
const duplicates = await prisma.$queryRaw`
  SELECT email, GROUP_CONCAT(id) as leadIds
  FROM leads
  WHERE email IS NOT NULL
  GROUP BY email
  HAVING COUNT(*) > 1
`;
```

### Challenge 3 Pattern: Join & Aggregate
```typescript
const report = await prisma.$queryRaw`
  SELECT 
    p.name,
    p.stock_quantity,
    COALESCE(SUM(s.quantity), 0) as totalSold
  FROM products p
  LEFT JOIN sales s ON p.id = s.product_id
  GROUP BY p.id
  ORDER BY totalSold DESC
`;
```

### Challenge 4 Pattern: Multiple Aggregates
```typescript
const [total, converted, avgScore] = await Promise.all([
  prisma.lead.count(),
  prisma.lead.count({ where: { status: 'Converted' } }),
  prisma.lead.aggregate({ _avg: { score: true } })
]);
```

---

## 🚨 Status Codes & Errors

### Correct Responses
- `200` - Success, data returned
- `400` - Bad request
- `500` - Server error (check logs)
- `501` - Not implemented (your TODO)

### Common Errors
| Error | Cause | Fix |
|-------|-------|-----|
| `DATABASE_URL not set` | Missing .env | Ask instructor for .env |
| `Module not found` | Not installed | `pnpm install` |
| `Prisma type mismatch` | Wrong return type | Check Prisma docs |
| `No data returned` | Query logic wrong | Debug in Prisma Studio |
| `Port 3000 in use` | Other app running | `pnpm dev -p 3001` |

---

## 📖 Essential Resources

```
📄 README.md           ← Start here for overview
📄 SETUP.md           ← Installation help
📄 CHALLENGES.md      ← Full challenge details + hints
📄 SOLUTIONS.md       ← Reference (after trying!)
🌐 Prisma Docs        → prisma.io/docs
🌐 Next.js Docs       → nextjs.org/docs
🌐 TypeScript Docs    → typescriptlang.org
```

---

## ✨ Code Quality Checklist

Before submitting:

- [ ] No hardcoded data (use Prisma queries)
- [ ] Proper TypeScript types
- [ ] Error handling (try/catch)
- [ ] Returns correct HTTP status
- [ ] Fields match expected format
- [ ] Database queries optimized (select/include)
- [ ] Code is readable and commented
- [ ] All tests passing with `pnpm verify`

---

## 🎓 Learning Tips

1. **Start with Challenge 1** - It's easier!
2. **Read the hints in CHALLENGES.md** - They help
3. **Use Prisma Studio** - Understand your data first
4. **Test frequently** - Click "Test" after each change
5. **Google Prisma docs** - They have great examples
6. **Compare with SOLUTIONS.md** - But only after trying!

---

## 📞 When You're Stuck

1. Re-read the challenge description
2. Check CHALLENGES.md for hints
3. Look at database in Prisma Studio
4. Search Prisma documentation
5. Try a simpler query first
6. Ask your instructor/mentor
7. Check SOLUTIONS.md as last resort

---

## ⏱️ Time Estimates

| Challenge | Time |
|-----------|------|
| 1 | 15-30 min |
| 2 | 30-45 min |
| 3 | 45-60 min |
| 4 | 60-90 min |
| **Total** | **2-4 hours** |

---

## 🎁 After You Finish

**Bonus features to try:**
- Add pagination to results
- Add query filters (date range, status, etc.)
- Create a dashboard UI
- Optimize queries with indexes
- Add caching
- Build REST API versioning

---

## 🚀 Ready? Let's Go!

```bash
# 1. Open terminal
# 2. Run:
pnpm dev

# 3. Open browser:
http://localhost:3000

# 4. Click: Dashboard →

# 5. Start with Challenge 1

# 6. Good luck! 🎉
```

---

**Print this page, keep it open, and reference it as you code!**

Last Updated: July 2026
