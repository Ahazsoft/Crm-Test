# Instructor Guide - CRM Mini Challenge

This guide helps instructors/mentors set up and manage the CRM challenge for junior developers.

## Overview

The CRM Mini Challenge is designed to assess and develop:
- **Prisma ORM** - Database modeling and querying
- **Next.js** - API route development
- **TypeScript** - Type-safe code
- **Database Design** - Relations, aggregations, filtering
- **Full-Stack Development** - Combining frontend and backend

**Target:** Junior Developers (0-2 years experience)
**Duration:** 2 hours
**Difficulty Progression:** ⭐ to ⭐⭐⭐⭐

---

## Pre-Challenge Setup

### 1. Create the Database

Set up a database with the CRM schema. You can use:

**MySQL/MariaDB:**
```sql
-- Create database
CREATE DATABASE crm_challenge;
USE crm_challenge;

-- Create tables (from prisma/schema.prisma, translated to SQL)
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  source VARCHAR(50),
  status VARCHAR(20) DEFAULT 'New',
  score INT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  convertedCustomerId INT NULL,
  FOREIGN KEY (convertedCustomerId) REFERENCES customers(id)
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  price DECIMAL(10,2) NOT NULL
);

CREATE TABLE sales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

**PostgreSQL:**
```sql
CREATE DATABASE crm_challenge;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Similar for other tables (adjust syntax as needed)
```

### 2. Seed Sample Data

Add realistic test data:

```sql
-- Add customers
INSERT INTO customers (name, email, phone) VALUES
('John Doe', 'john@example.com', '555-0101'),
('Jane Smith', 'jane@example.com', '555-0102'),
('Bob Johnson', 'bob@example.com', NULL),
('Alice Wilson', 'alice@example.com', '555-0104'),
('Charlie Brown', 'charlie@example.com', '555-0105');

-- Add leads
INSERT INTO leads (name, email, phone, source, status, score, convertedCustomerId) VALUES
('David Lee', 'david@example.com', '555-0201', 'Website', 'New', 30, NULL),
('Eve Martinez', 'eve@example.com', '555-0202', 'Referral', 'Contacted', 45, NULL),
('Frank Taylor', 'frank@example.com', '555-0203', 'Email', 'Qualified', 70, 1),
('Grace Chen', 'grace@example.com', '555-0204', 'LinkedIn', 'Lost', 20, NULL),
('contact@example.com', NULL, NULL, 'Web Form', 'New', 25, NULL),
('contact@example.com', NULL, NULL, 'Web Form', 'Contacted', 35, NULL);

-- Add products
INSERT INTO products (name, stock_quantity, price) VALUES
('Laptop', 15, 999.99),
('Mouse', 100, 29.99),
('Keyboard', 75, 79.99),
('Monitor', 20, 299.99),
('Headphones', 50, 149.99),
('USB Cable', 200, 9.99);

-- Add sales
INSERT INTO sales (customer_id, product_id, quantity, total_amount) VALUES
(1, 1, 1, 999.99),
(1, 3, 2, 159.98),
(2, 2, 3, 89.97),
(2, 5, 1, 149.99),
(4, 1, 1, 999.99),
(4, 4, 2, 599.98),
(5, 2, 5, 149.95),
(1, 2, 2, 59.98);
```

### 3. Create Environment File

Generate DATABASE_URL:

```env
# For MySQL
DATABASE_URL="mysql://root:password@localhost:3306/crm_challenge"

# For PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/crm_challenge"

# For Neon (managed PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-...neon.tech/crm_challenge"
```

### 4. Distribute to Students

Provide each student with:
1. Project files (ZIP or git repo)
2. `.env` file with DATABASE_URL
3. SETUP.md instructions
4. CHALLENGES.md challenge descriptions

---

## During the Challenge

### Monitoring Progress

Track student progress:

```bash
# Check if student's endpoint works
curl http://localhost:3000/api/challenges/customers-no-purchases

# Use dashboard to test
# Visit http://localhost:3000/dashboard
```

### Common Issues & Solutions

**Issue: Student hardcodes data**
- Check if response matches database
- Explain difference between mock and real data
- Point to Prisma documentation

**Issue: N+1 query problem**
- Query is correct but inefficient
- Show how to use `include` to fetch relations
- Discuss performance implications

**Issue: Wrong aggregation**
- Result format is correct but calculations wrong
- Debug with Prisma Studio
- Explain groupBy vs aggregate

**Issue: Null/undefined values**
- Handle edge cases in code
- Test with database containing nulls
- Use optional chaining (?.)

**Issue: TypeScript errors**
- Verify return types
- Check interface definitions
- Use `as unknown as Type` cautiously

### Feedback Template

When reviewing student code:

```markdown
## Challenge [N] Review

### ✅ What Went Well
- Correct query structure
- Good error handling
- Clean code formatting

### ⚠️ Areas for Improvement
- Consider using `select` instead of `include`
- Add validation for edge cases
- Performance could be optimized with...

### 🎓 Learning Points
- This pattern is useful for...
- Alternative approach: ...
- Best practice: ...

### 📈 Next Steps
- Try Challenge [N+1]
- Optional: Add pagination
- Bonus: Implement caching
```

---

## Evaluation Rubric

### Scoring Breakdown

| Category | Weight | Criteria |
|----------|--------|----------|
| **Correctness** | 40% | Returns correct data, proper types, handles edge cases |
| **Code Quality** | 25% | Clean, readable, follows patterns, proper naming |
| **Error Handling** | 15% | Catches errors, returns proper status codes |
| **Performance** | 15% | Efficient queries, no N+1, proper indexing |
| **Documentation** | 5% | Comments, clear intent, follows conventions |

### Example Scoring

**Challenge 1: 95/100**
- Correctness: 38/40 (forgot null email handling)
- Code Quality: 25/25
- Error Handling: 15/15
- Performance: 14/15 (query could be optimized)
- Documentation: 3/5 (no comments)

### Grade Mapping

- **90-100:** Excellent - Ready for production
- **80-89:** Good - Minor improvements needed
- **70-79:** Satisfactory - Understand concepts, needs refinement
- **60-69:** Needs Work - Struggling with implementation
- **Below 60:** Incomplete - Schedule review

---

## Reference Solutions

### Challenge 1 Solution
```typescript
export async function GET(request: NextRequest) {
  try {
    const customersWithoutPurchases = await prisma.customer.findMany({
      where: {
        sales: {
          none: {}
        }
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return NextResponse.json(customersWithoutPurchases);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Key Concepts:**
- `where` filtering with relationships
- `none: {}` for empty relations
- `select` for performance

### Challenge 2 Solution
```typescript
export async function GET(request: NextRequest) {
  try {
    const duplicates = await prisma.$queryRaw`
      SELECT email, GROUP_CONCAT(id) as leadIds
      FROM leads
      WHERE email IS NOT NULL
      GROUP BY email
      HAVING COUNT(*) > 1
    `;

    return NextResponse.json(duplicates);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Key Concepts:**
- Raw SQL for complex aggregations
- GROUP_CONCAT for string concatenation
- HAVING clause for filtering groups

### Challenge 3 Solution
```typescript
export async function GET(request: NextRequest) {
  try {
    const report = await prisma.$queryRaw`
      SELECT 
        p.name,
        p.stock_quantity as currentStock,
        COALESCE(SUM(s.quantity), 0) as totalSold
      FROM products p
      LEFT JOIN sales s ON p.id = s.product_id
      GROUP BY p.id
      ORDER BY totalSold DESC
    `;

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Key Concepts:**
- LEFT JOIN for including unmatched records
- COALESCE to handle NULL values
- GROUP BY with aggregation

### Challenge 4 Solution
```typescript
export async function GET(request: NextRequest) {
  try {
    const [totalLeads, convertedLeads, scoreAggregate] = 
      await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { status: 'Converted' } }),
        prisma.lead.aggregate({ _avg: { score: true } })
      ]);

    const conversionRate = totalLeads > 0
      ? Number(((convertedLeads / totalLeads) * 100).toFixed(2))
      : 0;

    return NextResponse.json({
      totalLeads,
      convertedLeads,
      conversionRate,
      averageLeadScore: scoreAggregate._avg.score || 0
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Key Concepts:**
- Parallel queries with Promise.all
- count() with filtering
- aggregate() for calculations
- Safe division by checking for zero

---

## Assessment Strategies

### Whiteboarding
Have students explain their query logic:
- "Walk me through what this WHERE clause does"
- "Why did you choose include vs select?"
- "What happens if there are no results?"

### Code Review
Provide meaningful feedback:
- Point out specific lines
- Explain why it's good or needs improvement
- Suggest alternatives

### Live Coding
Ask students to implement a new feature:
- "Add pagination"
- "Filter by date range"
- "Sort by multiple columns"

### Pair Programming
Work through a challenge together:
- Instructor guides, student types
- Stop and ask questions
- Explain decisions in real-time

---

## Post-Challenge

### Debrief Questions

Ask students to reflect:

1. **What was the hardest part?**
   - Understanding Prisma syntax?
   - Database relationships?
   - TypeScript types?

2. **What would you do differently?**
   - More comments?
   - Different query approach?
   - Better error handling?

3. **What did you learn?**
   - New Prisma features?
   - API design patterns?
   - Debugging techniques?

### Extension Challenges

For advanced students:

1. **Add Pagination**
   - Implement skip/take
   - Return total count
   - Build UI for navigation

2. **Add Filtering**
   - Query parameters for filters
   - Date range filtering
   - Multi-field search

3. **Performance Optimization**
   - Add database indexes
   - Implement caching
   - Monitor query times

4. **Frontend Dashboard**
   - Visualize challenge data
   - Add charts/graphs
   - Real-time updates

---

## Distribution Checklist

Before giving to students, ensure:

- [ ] Database created and seeded
- [ ] DATABASE_URL tested and correct
- [ ] Project files extracted
- [ ] Dependencies can be installed
- [ ] SETUP.md instructions are clear
- [ ] CHALLENGES.md has all details
- [ ] SOLUTIONS.md is hidden/protected
- [ ] Dashboard loads without errors
- [ ] Each endpoint returns "not implemented"

---

## Technical Support

### Testing Endpoints

```bash
# Test Challenge 1
curl http://localhost:3000/api/challenges/customers-no-purchases

# Test Challenge 2
curl http://localhost:3000/api/challenges/duplicate-leads

# Test Challenge 3
curl http://localhost:3000/api/challenges/product-report

# Test Challenge 4
curl http://localhost:3000/api/challenges/conversion-metrics
```

### Verifying Database

```bash
# Connect to database
mysql -h localhost -u root -p crm_challenge

# Show tables
SHOW TABLES;

# Count records
SELECT COUNT(*) FROM customers;
SELECT COUNT(*) FROM leads;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM sales;
```

### Checking Logs

```bash
# View Next.js server logs
pnpm dev

# Watch for errors during student testing
# Check terminal output for SQL errors
```

---

## Frequently Asked Questions

**Q: Can students work in teams?**
A: Yes, but ensure each understands their solution. Consider pairing junior devs.

**Q: How long should this take?**
A: 2-4 hours depending on skill level. Challenge 1-2 are ~30 min each, 3-4 are ~45-60 min.

**Q: What if students get stuck?**
A: Provide hints from CHALLENGES.md. Point to documentation. Schedule office hours.

**Q: Can students use SOLUTIONS.md?**
A: Only after attempting! Make it unavailable until they've tried.

**Q: Should we cover web development topics?**
A: This assumes basic Next.js/React knowledge. Cover Prisma separately if needed.

**Q: How is this evaluated?**
A: Use the rubric. Consider partial credit for approach even if results aren't perfect.

**Q: Can students submit on GitHub?**
A: Yes, have them create a private repo and add you as collaborator.

---

## Improvements & Feedback

After running the challenge, consider:

1. **Did all students understand the objectives?**
   - Adjust SETUP.md instructions
   - Add more guidance to CHALLENGES.md

2. **Were the challenges at the right difficulty?**
   - Add/remove challenges
   - Reorder them
   - Adjust complexity

3. **Did students get stuck on technology?**
   - Add more Prisma examples
   - Create video tutorials
   - Host office hours

4. **How long did it actually take?**
   - Adjust time estimates
   - Provide more/fewer extensions
   - Streamline setup process

---

## Contact & Support

For questions about the challenge framework:
- Email: instructor@example.com
- Slack: #crm-challenge
- GitHub: CRM Challenge Issues

---

**Good luck with your students! 🎓**
