'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">🏢 CRM Challenge</div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Dashboard →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-blue-600">
            Junior Developer Challenge
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Master Prisma ORM, Next.js APIs, and Database Design
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition"
            >
              Start Challenges →
            </Link>
            <a
              href="#setup"
              className="px-8 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold text-lg transition border border-blue-200"
            >
              Setup Guide ↓
            </a>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: '📚', title: '4 Challenges', desc: 'Progressive difficulty' },
            { icon: '🗄️', title: 'Prisma ORM', desc: 'Master database queries' },
            { icon: '🔌', title: 'Next.js APIs', desc: 'Build REST endpoints' },
            { icon: '🎯', title: 'Real-world', desc: 'Production patterns' }
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{card.title}</h3>
              <p className="text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Setup Section */}
        <div id="setup" className="bg-white border border-gray-200 rounded-2xl p-8 mb-16 shadow-sm">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">🚀 Quick Setup</h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Get Database Credentials</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Ask your instructor for the{' '}
                <code className="bg-gray-100 px-2 py-1 rounded text-blue-600 font-mono text-sm">.env</code> file with{' '}
                <code className="bg-gray-100 px-2 py-1 rounded text-blue-600 font-mono text-sm">DATABASE_URL</code>
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Install Dependencies</h3>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg mb-3">
                <code className="text-green-400 text-sm font-mono">pnpm install</code>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Sync Prisma Schema</h3>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg mb-3">
                <code className="text-green-400 text-sm font-mono">pnpx prisma db pull</code>
              </div>
              <p className="text-gray-500 text-sm">once you are done:</p>
              <div className="bg-gray-900 p-4 rounded-lg mt-2">
                <code className="text-green-400 text-sm font-mono">pnpx prisma generate</code>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Start Development Server</h3>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg mb-3">
                <code className="text-green-400 text-sm font-mono">pnpm dev</code>
              </div>
              <p className="text-gray-500 text-sm">
                Server runs at{' '}
                <code className="bg-gray-100 px-2 py-1 rounded text-blue-600 font-mono text-sm">
                  http://localhost:3000
                </code>
              </p>
            </div>

            {/* Step 5 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Go to Dashboard</h3>
              </div>
              <Link
                href="/dashboard"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Open Dashboard →
              </Link>
            </div>
          </div>
        </div>

        {/* Challenges Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">⭐ 4 Challenges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: 1,
                title: 'Customers Without Purchases',
                diff: '⭐ Beginner',
                desc: 'Find customers with no sales using Prisma filtering'
              },
              {
                num: 2,
                title: 'Duplicate Lead Emails',
                diff: '⭐⭐ Intermediate',
                desc: 'Group leads by email and find duplicates with aggregation'
              },
              {
                num: 3,
                title: 'Product Inventory Report',
                diff: '⭐⭐⭐ Advanced',
                desc: 'Generate report with stock levels and total sales per product'
              },
              {
                num: 4,
                title: 'Conversion Metrics',
                diff: '⭐⭐⭐⭐ Expert',
                desc: 'Calculate lead conversion rate and average score'
              }
            ].map((challenge, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">{challenge.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                    Challenge {challenge.num}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{challenge.desc}</p>
                <span className="text-sm text-gray-400">{challenge.diff}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prisma Schema Preview */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-16 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Database Schema</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Customers', fields: ['id', 'name', 'email', 'phone', 'createdAt'] },
              { name: 'Leads', fields: ['id', 'name', 'email', 'status', 'score', 'createdAt'] },
              { name: 'Products', fields: ['id', 'name', 'stockQuantity', 'price'] },
              { name: 'Sales', fields: ['id', 'customerId', 'productId', 'quantity', 'saleDate'] }
            ].map((table, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="font-bold mb-3 text-blue-600">{table.name}</h3>
                <ul className="space-y-1">
                  {table.fields.map((field, j) => (
                    <li key={j} className="text-gray-600 text-sm">
                      • {field}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-blue-600 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">📚 Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Prisma Docs',
                link: 'https://www.prisma.io/docs',
                desc: 'Official Prisma ORM documentation'
              },
              {
                title: 'Next.js API Routes',
                link: 'https://nextjs.org/docs/api-routes/introduction',
                desc: 'Learn how to build API endpoints'
              },
              {
                title: 'Challenge Guide',
                link: '/CHALLENGES.md',
                desc: 'Detailed challenge descriptions and hints'
              },
              {
                title: 'SQL Concepts',
                link: 'https://www.w3schools.com/sql',
                desc: 'Brush up on SQL fundamentals'
              }
            ].map((resource, i) => (
              <a
                key={i}
                href={resource.link}
                target={resource.link.startsWith('http') ? '_blank' : undefined}
                rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block bg-blue-500 hover:bg-blue-400 p-4 rounded-lg transition"
              >
                <h3 className="font-bold mb-2 text-white">{resource.title}</h3>
                <p className="text-blue-100 text-sm">{resource.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>CRM Mini Challenge • Test your Full-Stack Development Skills</p>
          <p className="text-sm mt-2">Made for Junior Developers • 2026</p>
        </div>
      </footer>
    </div>
  );
}