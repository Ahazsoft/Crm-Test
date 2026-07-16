// pages/challenges.tsx
import Head from 'next/head';

export default function ChallengesPage() {
  return (
    <>
      <Head>
        <title>CRM Mini Project – Junior Developer Challenges</title>
        <meta name="description" content="CRM testing challenges for junior developers" />
      </Head>

      <div className="min-h-screen bg-white text-gray-900">
        {/* Navigation – consistent with the white/blue Home page */}
        <nav className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">🏢 CRM Challenge</div>
          </div>
        </nav>

        {/* Hero */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              CRM Mini Project – Junior Developer Challenges
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              This project tests your understanding of Prisma ORM, Next.js API Routes, TypeScript, and database relations.
            </p>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-16">
          {/* Setup Instructions */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Setup Instructions
            </h2>
            <ol className="mt-4 list-decimal list-inside space-y-2 text-gray-700">
              <li>
                <strong>Environment Variables</strong> – Your instructor will provide a{' '}
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-blue-600">.env</code> file with the{' '}
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-blue-600">DATABASE_URL</code>.
                Place it in the root directory.
              </li>
              <li>
                <strong>Prisma Initialization</strong> – Run{' '}
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-blue-600">
                  pnpx prisma generate
                </code>{' '}
                to sync the schema with your database.
              </li>
              <li>
                <strong>Explore Schema</strong> – Open{' '}
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-blue-600">
                  prisma/schema.prisma
                </code>{' '}
                to understand the data model.
              </li>
            </ol>
          </section>

          {/* Challenge Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Challenge Overview
            </h2>
            <p className="mt-4 text-gray-700">The CRM system tracks:</p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
              <li>
                <strong>Customers</strong> – People who have made purchases
              </li>
              <li>
                <strong>Leads</strong> – Potential customers that may convert to customers
              </li>
              <li>
                <strong>Products</strong> – Items in inventory
              </li>
              <li>
                <strong>Sales</strong> – Purchase records linking customers and products
              </li>
            </ul>
          </section>

          {/* Challenge Cards */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Challenges
            </h2>

            <ChallengeCard
              number={1}
              difficulty="Beginner"
              objective="Find all customers who have never made a purchase."
              requirements={[
                'Create an API route: GET /api/challenges/customers-no-purchases',
                'Return an array of customers with id, name, and email',
                'Customers should appear in the customers table but have NO records in the sales table',
              ]}
              expectedResponse={`[
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 3, "name": "Jane Smith", "email": "jane@example.com" }
]`}
              hints={[
                'Use prisma.customer.findMany()',
                'Filter for customers where sales relation is empty',
                'Use select or include to work with relations',
              ]}
            />

            <ChallengeCard
              number={2}
              difficulty="Intermediate"
              objective="Find all email addresses that appear more than once in the leads table, along with the lead IDs that share that email."
              requirements={[
                'Create an API route: GET /api/challenges/duplicate-leads',
                'Return an array of objects with email and leadIds (comma-separated or array)',
                'Only include emails that appear 2+ times',
              ]}
              expectedResponse={`[
  { "email": "contact@example.com", "leadIds": "1,5,8" },
  { "email": "test@email.com", "leadIds": "12,15" }
]`}
              hints={[
                'Use prisma.lead.groupBy() with aggregation',
                'Use _count to count occurrences per email',
                'Filter where count > 1',
                'Consider using raw SQL if groupBy feels complex',
              ]}
            />

            <ChallengeCard
              number={3}
              difficulty="Advanced"
              objective="Generate a product report showing current inventory and total units sold."
              requirements={[
                'Create an API route: GET /api/challenges/product-report',
                'Return products with: name, currentStock, totalSold',
                'Include products that have NEVER been sold (show 0 for totalSold)',
                'Sort by totalSold descending',
              ]}
              expectedResponse={`[
  { "name": "Laptop", "currentStock": 5, "totalSold": 45 },
  { "name": "Mouse", "currentStock": 120, "totalSold": 32 },
  { "name": "Monitor", "currentStock": 8, "totalSold": 0 }
]`}
              hints={[
                'Use prisma.product.findMany()',
                'Include sales relation to calculate totals',
                'You might need _sum aggregation',
                'Consider using leftJoin or raw SQL for complex aggregations',
              ]}
            />

            <ChallengeCard
              number={4}
              difficulty="Expert (BONUS)"
              objective="Calculate lead conversion metrics."
              requirements={[
                'Create an API route: GET /api/challenges/conversion-metrics',
                'Return: totalLeads, convertedLeads, conversionRate (percentage), averageLeadScore',
              ]}
              expectedResponse={`{
  "totalLeads": 150,
  "convertedLeads": 32,
  "conversionRate": 21.33,
  "averageLeadScore": 65.5
}`}
              hints={[
                'Count leads with status Converted',
                'Calculate average of score field',
                'Round conversionRate to 2 decimal places',
              ]}
            />
          </section>

          {/* Submission Checklist */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Submission Checklist
            </h2>
            <ul className="mt-4 space-y-2 text-gray-700">
              {[
                'All API routes created and working',
                'No hardcoded data - all from database',
                'Proper TypeScript types used',
                'Error handling implemented',
                'Code is clean and well-commented',
                'Database queries are optimized (no N+1)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    readOnly
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Testing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Testing Your Solutions
            </h2>
            <p className="mt-4 text-gray-700">
              Your instructor will provide test scripts to verify your implementation:
            </p>
            <div className="mt-3 bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm space-y-1">
              <p># Test all challenges</p>
              <p className="text-green-400">npm run test:challenges</p>
              <br />
              <p># Test specific challenge</p>
              <p className="text-green-400">npm run test:challenge:1</p>
              <p className="text-green-400">npm run test:challenge:2</p>
              <p className="text-green-400">npm run test:challenge:3</p>
              <p className="text-green-400">npm run test:challenge:4</p>
            </div>
          </section>

          {/* Resources */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Resources
            </h2>
            <ul className="mt-4 space-y-1 text-blue-600">
              <li>
                <a href="https://www.prisma.io/docs" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Prisma Documentation
                </a>
              </li>
              <li>
                <a href="https://nextjs.org/docs/api-routes/introduction" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Next.js API Routes
                </a>
              </li>
              <li>
                <a href="https://www.prisma.io/docs/orm/prisma-client/queries/crud" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Prisma Query Methods
                </a>
              </li>
              <li>
                <a href="https://www.prisma.io/docs/orm/prisma-schema/relations" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Prisma Relations
                </a>
              </li>
            </ul>
          </section>
        </main>

        <footer className="border-t border-gray-200 bg-gray-50 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            Good luck! 🚀
          </div>
        </footer>
      </div>
    </>
  );
}

// Reusable card component – now matching the white/blue card style from the Home page
function ChallengeCard({
  number,
  difficulty,
  objective,
  requirements,
  expectedResponse,
  hints,
}: {
  number: number;
  difficulty: string;
  objective: string;
  requirements: string[];
  expectedResponse: string;
  hints: string[];
}) {
  const difficultyColor =
    difficulty.includes('Beginner')
      ? 'bg-green-100 text-green-800'
      : difficulty.includes('Intermediate')
      ? 'bg-yellow-100 text-yellow-800'
      : difficulty.includes('Advanced')
      ? 'bg-orange-100 text-orange-800'
      : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:border-blue-400 hover:shadow-md transition">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-gray-900">
          Challenge {number}: {objective.split(':')[0]}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColor}`}>
          {difficulty}
        </span>
      </div>

      <p className="mt-4 text-gray-700">
        <strong>Objective:</strong> {objective}
      </p>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-800">Requirements:</h4>
        <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
          {requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-800">Expected Response:</h4>
        <pre className="mt-2 bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto font-mono">
          <code>{expectedResponse}</code>
        </pre>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-800">Hints:</h4>
        <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
          {hints.map((hint, idx) => (
            <li key={idx}>{hint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}