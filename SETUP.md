# Setup Guide - CRM Mini Challenge

This guide walks through setting up and preparing the CRM challenge project.

## Prerequisites

Before starting, ensure you have:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** - `npm install -g pnpm` (or use npm/yarn)
- **Git** (optional, for version control)
- **Database credentials** from your instructor

## Installation Steps

### 1. Extract Project Files

If provided as a ZIP file:
```bash
unzip crm-mini-challenge.zip
cd crm-mini-challenge
```

Or if cloning from repository:
```bash
git clone <repository-url>
cd crm-mini-challenge
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs:
- Next.js 16
- Prisma 7
- React 19
- Tailwind CSS
- All other required packages

**If using npm:**
```bash
npm install
```

**If using yarn:**
```bash
yarn install
```

### 3. Configure Environment Variables

Your instructor will provide a `.env` file containing:
```env
DATABASE_URL="mysql://user:password@host:port/database_name"
```

**Steps:**
1. Receive the `.env` file from your instructor
2. Place it in the root directory (same level as package.json)
3. Do NOT commit this to git (it's in .gitignore)

### 4. Sync Prisma Schema

The Prisma schema is already created at `prisma/schema.prisma`.

Sync it with your database:

```bash
npx prisma migrate dev
```

This command will:
- Connect to your database using DATABASE_URL
- Create/update all tables
- Seed sample data (if configured)

**If migrations aren't available:**
```bash
npx prisma db push
```

### 5. Verify Setup

Check that everything is working:

```bash
# Start the dev server
pnpm dev
```

Open your browser to: `http://localhost:3000`

You should see the CRM Challenge home page.

### 6. View Database (Optional)

Prisma Studio is a visual database viewer:

```bash
npx prisma studio
```

This opens a GUI at `http://localhost:5555` where you can:
- Browse tables
- View records
- Make test queries
- Add/edit data

## Project Structure

After setup, your project should look like:

```
crm-mini-challenge/
├── .env                           # Database credentials (provided by instructor)
├── .next/                         # Build output (auto-generated)
├── app/
│   ├── api/challenges/
│   │   ├── customers-no-purchases/route.ts
│   │   ├── duplicate-leads/route.ts
│   │   ├── product-report/route.ts
│   │   └── conversion-metrics/route.ts
│   ├── dashboard/page.tsx         # Challenge dashboard
│   ├── page.tsx                   # Home page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── prisma/
│   └── schema.prisma              # Database schema
├── scripts/
│   └── verify-challenges.ts       # Test verification script
├── node_modules/                  # Dependencies
├── CHALLENGES.md                  # Challenge descriptions
├── SOLUTIONS.md                   # Reference solutions (instructors)
├── SETUP.md                       # This file
├── README.md                      # Project README
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server on localhost:3000

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Database
npx prisma studio    # Open visual database viewer
npx prisma generate  # Generate Prisma client

# Testing
pnpm verify          # Run challenge verification tests
pnpm test:challenges # Same as above

# Code Quality
pnpm lint            # Run linter
```

## Database Schema Overview

Your database contains 4 tables:

### Customers
```
- id (PRIMARY KEY)
- name (VARCHAR 100)
- email (VARCHAR 150, UNIQUE)
- phone (VARCHAR 20)
- createdAt (DATETIME)
```

### Leads
```
- id (PRIMARY KEY)
- name (VARCHAR 100)
- email (VARCHAR 150)
- phone (VARCHAR 20)
- source (VARCHAR 50)
- status (VARCHAR 20: 'New','Contacted','Qualified','Lost','Converted')
- score (INT: 0-100)
- createdAt (DATETIME)
- convertedCustomerId (FOREIGN KEY → customers.id)
```

### Products
```
- id (PRIMARY KEY)
- name (VARCHAR 100)
- stockQuantity (INT)
- price (DECIMAL 10,2)
```

### Sales
```
- id (PRIMARY KEY)
- customerId (FOREIGN KEY → customers.id)
- productId (FOREIGN KEY → products.id)
- quantity (INT)
- saleDate (DATETIME)
- totalAmount (DECIMAL 10,2)
```

## Troubleshooting

### Issue: "DATABASE_URL not set"

**Solution:** 
1. Verify `.env` file exists in root directory
2. Check it contains `DATABASE_URL=...`
3. Restart dev server after adding .env

### Issue: "Connection refused" or "Cannot connect to database"

**Solutions:**
1. Verify DATABASE_URL is correct
2. Check network access to database server
3. Confirm database server is running
4. Ask instructor for connection help

### Issue: "No schema found"

**Solution:**
```bash
npx prisma generate
npx prisma migrate dev
```

### Issue: "Prisma not found" or module errors

**Solution:**
```bash
rm -rf node_modules
pnpm install
npx prisma generate
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use different port
pnpm dev -- -p 3001
```

### Issue: "Next.js not found"

**Solution:**
```bash
pnpm install
pnpm dev
```

## First-Time Usage

After successful setup:

1. **Visit Home Page** - `http://localhost:3000`
   - Read the overview
   - Review the challenges

2. **Go to Dashboard** - `http://localhost:3000/dashboard`
   - See all 4 challenges
   - Test endpoints (they'll show "not implemented")

3. **Read Challenges** - Open `CHALLENGES.md`
   - Understand what each challenge requires
   - Review hints and requirements

4. **Start Challenge 1** - Open `/app/api/challenges/customers-no-purchases/route.ts`
   - Replace the TODO with your implementation
   - Use Prisma to query customers

5. **Test Your Work** - Click "Test Endpoint" on dashboard
   - See if your implementation works
   - Debug any errors

6. **Iterate** - Repeat for all 4 challenges

## Editor Setup

### VS Code (Recommended)

Install these extensions for better development:

1. **Prisma** - `prisma.prisma`
   - Syntax highlighting
   - IntelliSense for schema
   - Query snippets

2. **TypeScript** - Built-in
   - Full TypeScript support

3. **Tailwind CSS** - `bradlc.vscode-tailwindcss`
   - Tailwind class suggestions
   - Color previews

4. **REST Client** - `humao.rest-client`
   - Test APIs directly in editor

### Other Editors

- **WebStorm** - Has Prisma support built-in
- **Vim/Neovim** - Use LSP for TypeScript/Prisma
- **Sublime** - Various packages available

## Git Setup (Optional)

If using version control:

```bash
# Initialize repository
git init

# Create .gitignore (already exists)
# Ignore node_modules, .env, .next, etc.

# Make first commit
git add .
git commit -m "Initial commit: CRM challenge setup"

# Add remote (optional)
git remote add origin https://github.com/yourname/repo
git push -u origin main
```

## Next Steps

1. ✅ Verify `pnpm dev` works and site loads
2. ✅ Check database connection with Prisma Studio
3. ✅ Read CHALLENGES.md for all challenge details
4. ✅ Open first challenge file and read the TODO
5. ✅ Implement Challenge 1
6. ✅ Test on dashboard
7. ✅ Move to Challenge 2, repeat

## Getting Help

If you get stuck:

1. **Check error messages** - Usually very descriptive
2. **Read CHALLENGES.md** - Hints are provided
3. **Review Prisma docs** - Official documentation is comprehensive
4. **Ask instructor/mentor** - Office hours or Slack/Teams
5. **Check SOLUTIONS.md** - Only after attempting yourself

## Success Checklist

Before submitting:

- [ ] All 4 challenges implemented
- [ ] `pnpm verify` shows all tests passing
- [ ] No hardcoded data (use Prisma queries)
- [ ] Proper error handling
- [ ] TypeScript compiles without errors
- [ ] Code is readable and commented
- [ ] No console errors or warnings

## Performance Tips

- Use `select` to fetch only needed fields
- Use `include` efficiently to avoid N+1 queries
- Index frequently queried columns in database
- Use aggregations for counting/summing
- Avoid fetching all records when possible

---

**Ready to start?** Go to `http://localhost:3000` and begin! 🚀
