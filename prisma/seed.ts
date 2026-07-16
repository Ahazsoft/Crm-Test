import {prisma } from '@/lib/prisma';

async function main() {
  console.log("🌱 Starting database seed...");
 
  // Clear existing data (idempotent)
  await prisma.sale.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();

  console.log("🗑️  Cleared existing data");

  // Seed Products
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Professional Laptop",
        price: 1299.99,
        stockQuantity: 45,
      },
      {
        name: "Wireless Mouse",
        price: 49.99,
        stockQuantity: 250,
      },
      {
        name: "USB-C Hub",
        price: 79.99,
        stockQuantity: 120,
      },
      {
        name: "4K Monitor",
        price: 599.99,
        stockQuantity: 32,
      },
      {
        name: "Mechanical Keyboard",
        price: 149.99,
        stockQuantity: 85,
      },
      {
        name: "Laptop Stand",
        price: 39.99,
        stockQuantity: 200,
      },
      {
        name: "Noise Cancelling Headphones",
        price: 299.99,
        stockQuantity: 60,
      },
      {
        name: "Webcam Pro",
        price: 129.99,
        stockQuantity: 95,
      },
    ],
  });
  console.log(`✅ Created ${products.count} products`);

  // Seed Customers
  const customers = await prisma.customer.createMany({
    data: [
      {
        name: "Alice Johnson",
        email: "alice.johnson@techcorp.com",
        phone: "+1-555-0101",
      },
      {
        name: "Bob Smith",
        email: "bob.smith@innovate.io",
        phone: "+1-555-0102",
      },
      {
        name: "Carol Williams",
        email: "carol.williams@startup.dev",
        phone: "+1-555-0103",
      },
      {
        name: "David Brown",
        email: "david.brown@enterprise.com",
        phone: "+1-555-0104",
      },
      {
        name: "Emma Davis",
        email: "emma.davis@agency.co",
        phone: "+1-555-0105",
      },
      {
        name: "Frank Miller",
        email: "frank.miller@solutions.io",
        phone: "+1-555-0106",
      },
      {
        name: "Grace Lee",
        email: "grace.lee@digital.io",
        phone: "+1-555-0107",
      },
      {
        name: "Henry Wilson",
        email: "henry.wilson@consulting.com",
        phone: "+1-555-0108",
      },
    ],
  });
  console.log(`✅ Created ${customers.count} customers`);

  // Fetch created customers and products for relations
  const allCustomers = await prisma.customer.findMany();
  const allProducts = await prisma.product.findMany();

  // Seed Sales (multiple purchases per customer)
  const sales = [
    // Alice - 3 purchases
    {
      customerId: allCustomers[0].id,
      productId: allProducts[0].id, // Laptop
      quantity: 2,
      totalAmount: 2599.98,
    },
    {
      customerId: allCustomers[0].id,
      productId: allProducts[1].id, // Mouse
      quantity: 5,
      totalAmount: 249.95,
    },
    {
      customerId: allCustomers[0].id,
      productId: allProducts[4].id, // Keyboard
      quantity: 3,
      totalAmount: 449.97,
    },
    // Bob - 2 purchases
    {
      customerId: allCustomers[1].id,
      productId: allProducts[3].id, // Monitor
      quantity: 1,
      totalAmount: 599.99,
    },
    {
      customerId: allCustomers[1].id,
      productId: allProducts[2].id, // USB Hub
      quantity: 2,
      totalAmount: 159.98,
    },
    // Carol - 1 purchase
    {
      customerId: allCustomers[2].id,
      productId: allProducts[6].id, // Headphones
      quantity: 1,
      totalAmount: 299.99,
    },
    // David - 4 purchases
    {
      customerId: allCustomers[3].id,
      productId: allProducts[0].id, // Laptop
      quantity: 3,
      totalAmount: 3899.97,
    },
    {
      customerId: allCustomers[3].id,
      productId: allProducts[3].id, // Monitor
      quantity: 2,
      totalAmount: 1199.98,
    },
    {
      customerId: allCustomers[3].id,
      productId: allProducts[7].id, // Webcam
      quantity: 4,
      totalAmount: 519.96,
    },
    {
      customerId: allCustomers[3].id,
      productId: allProducts[5].id, // Laptop Stand
      quantity: 5,
      totalAmount: 199.95,
    },
    // Emma - 2 purchases
    {
      customerId: allCustomers[4].id,
      productId: allProducts[4].id, // Keyboard
      quantity: 2,
      totalAmount: 299.98,
    },
    {
      customerId: allCustomers[4].id,
      productId: allProducts[1].id, // Mouse
      quantity: 10,
      totalAmount: 499.9,
    },
    // Frank - 1 purchase
    {
      customerId: allCustomers[5].id,
      productId: allProducts[2].id, // USB Hub
      quantity: 3,
      totalAmount: 239.97,
    },
    // Grace - 3 purchases
    {
      customerId: allCustomers[6].id,
      productId: allProducts[0].id, // Laptop
      quantity: 1,
      totalAmount: 1299.99,
    },
    {
      customerId: allCustomers[6].id,
      productId: allProducts[6].id, // Headphones
      quantity: 2,
      totalAmount: 599.98,
    },
    {
      customerId: allCustomers[6].id,
      productId: allProducts[7].id, // Webcam
      quantity: 1,
      totalAmount: 129.99,
    },
    // Henry - 0 purchases (to test "customers without purchases" challenge)
  ];

  await prisma.sale.createMany({
    data: sales,
  });
  console.log(`✅ Created ${sales.length} sales records`);

  // Seed Leads (various statuses)
  const leads = await prisma.lead.createMany({
    data: [
      // Some with duplicate emails (for duplicate leads challenge)
      {
        name: "Michael Chen",
        email: "michael.chen@prospect.com",
        phone: "+1-555-0201",
        source: "Website",
        status: "New",
        score: 45,
      },
      {
        name: "Mike Chen", // Potential duplicate
        email: "michael.chen@prospect.com", // DUPLICATE EMAIL
        phone: "+1-555-0202",
        source: "LinkedIn",
        status: "Contacted",
        score: 50,
      },
      {
        name: "Sarah Johnson",
        email: "sarah.johnson@prospect.io",
        phone: "+1-555-0203",
        source: "Referral",
        status: "Qualified",
        score: 85,
      },
      {
        name: "Thomas Green",
        email: "thomas.green@prospect.io",
        phone: "+1-555-0204",
        source: "Cold Call",
        status: "New",
        score: 20,
      },
      {
        name: "Jennifer White",
        email: "jennifer.white@prospect.dev",
        phone: "+1-555-0205",
        source: "Email Campaign",
        status: "Contacted",
        score: 60,
      },
      // Converted lead
      {
        name: "Robert Martinez",
        email: "robert.martinez@converted.com",
        phone: "+1-555-0206",
        source: "Event",
        status: "Converted",
        score: 100,
        convertedCustomerId: allCustomers[4].id,
      },
      // Lost lead
      {
        name: "Patricia Anderson",
        email: "patricia.anderson@prospect.com",
        phone: "+1-555-0207",
        source: "Website",
        status: "Lost",
        score: 15,
      },
      {
        name: "Christopher Lopez",
        email: "christopher.lopez@prospect.io",
        phone: "+1-555-0208",
        source: "LinkedIn",
        status: "New",
        score: 35,
      },
      {
        name: "Linda Taylor",
        email: "linda.taylor@prospect.dev",
        phone: "+1-555-0209",
        source: "Referral",
        status: "Qualified",
        score: 75,
      },
      {
        name: "James Rodriguez",
        email: "james.rodriguez@prospect.com",
        phone: "+1-555-0210",
        source: "Cold Call",
        status: "Contacted",
        score: 40,
      },
    ],
  });
  console.log(`✅ Created ${leads.count} leads`);

  console.log("🎉 Database seeding completed successfully!");
  console.log("\n📊 Data Summary:");
  console.log(`   - Customers: ${allCustomers.length}`);
  console.log(`   - Products: ${allProducts.length}`);
  console.log(`   - Sales: ${sales.length}`);
  console.log(`   - Leads: ${leads.count}`);
  console.log("\n💡 Note: Henry Wilson has no purchases (test for Challenge 1)");
  console.log("💡 Note: Michael Chen appears twice with same email (test for Challenge 2)");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
