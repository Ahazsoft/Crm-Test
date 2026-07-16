'use client';

import { useState } from 'react';

interface ChallengeStatus {
  number: number;
  title: string;
  description: string;
  difficulty: string;
  endpoint: string;
  status: 'not-implemented' | 'working' | 'passed' | 'failed';
  response?: string;
}

export default function DashboardPage() {
  const [challenges, setChallenges] = useState<ChallengeStatus[]>([
    {
      number: 1,
      title: 'Customers Without Purchases',
      description: 'Find all customers who have never made a purchase',
      difficulty: '⭐ Beginner',
      endpoint: '/api/challenges/customers-no-purchases',
      status: 'not-implemented'
    },
    {
      number: 2,
      title: 'Duplicate Lead Emails',
      description: 'Find emails that appear multiple times in leads table',
      difficulty: '⭐⭐ Intermediate',
      endpoint: '/api/challenges/duplicate-leads',
      status: 'not-implemented'
    },
    {
      number: 3,
      title: 'Product Inventory Report',
      description: 'Generate product report with stock and sales data',
      difficulty: '⭐⭐⭐ Advanced',
      endpoint: '/api/challenges/product-report',
      status: 'not-implemented'
    },
    {
      number: 4,
      title: 'Lead Conversion Metrics',
      description: 'Calculate lead conversion statistics',
      difficulty: '⭐⭐⭐⭐ Expert',
      endpoint: '/api/challenges/conversion-metrics',
      status: 'not-implemented'
    }
  ]);

  const testChallenge = async (challenge: ChallengeStatus) => {
    try {
      setChallenges(prev =>
        prev.map(c =>
          c.number === challenge.number ? { ...c, status: 'working' } : c
        )
      );

      const response = await fetch(challenge.endpoint);
      const data = await response.json();

      const newStatus = response.status === 501
        ? 'not-implemented'
        : response.ok
        ? 'passed'
        : 'failed';

      setChallenges(prev =>
        prev.map(c =>
          c.number === challenge.number
            ? {
                ...c,
                status: newStatus as ChallengeStatus['status'],
                response: JSON.stringify(data, null, 2)
              }
            : c
        )
      );
    } catch (error) {
      setChallenges(prev =>
        prev.map(c =>
          c.number === challenge.number
            ? {
                ...c,
                status: 'failed',
                response: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
              }
            : c
        )
      );
    }
  };

  const getStatusColor = (status: ChallengeStatus['status']) => {
    switch (status) {
      case 'passed':
        return 'border-green-300 bg-green-50';
      case 'failed':
        return 'border-red-300 bg-red-50';
      case 'working':
        return 'border-yellow-300 bg-yellow-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getStatusIcon = (status: ChallengeStatus['status']) => {
    switch (status) {
      case 'passed':
        return '✅';
      case 'failed':
        return '❌';
      case 'working':
        return '⏳';
      default:
        return '⏭️';
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">🏢 CRM Challenge Dashboard</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏢 CRM Challenge Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Test your implementation of 4 Prisma challenges
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.number}
              className={`border-2 rounded-xl p-6 transition hover:shadow-md ${getStatusColor(challenge.status)}`}
            >
              {/* Challenge Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getStatusIcon(challenge.status)}</span>
                    <h2 className="text-xl font-bold text-gray-900">
                      Challenge {challenge.number}
                    </h2>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {challenge.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {challenge.difficulty}
                  </span>
                </div>
              </div>

              {/* Endpoint */}
              <div className="mb-4">
                <code className="text-xs bg-gray-900 text-green-400 p-2 rounded block overflow-x-auto">
                  GET {challenge.endpoint}
                </code>
              </div>

              {/* Response */}
              {challenge.response && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Response:</p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto max-h-40 overflow-y-auto">
                    {challenge.response}
                  </pre>
                </div>
              )}

              {/* Test Button */}
              <button
                onClick={() => testChallenge(challenge)}
                disabled={challenge.status === 'working'}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition ${
                  challenge.status === 'working'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {challenge.status === 'working' ? 'Testing...' : 'Test Endpoint'}
              </button>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📖 Instructions</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">1.</span>
              <span>Read the challenge description in <code className="bg-gray-100 px-2 py-1 rounded text-blue-600">CHALLENGES.md</code></span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">2.</span>
              <span>Implement the API endpoint in the corresponding route file</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3.</span>
              <span>Click "Test Endpoint" to verify your implementation</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4.</span>
              <span>See the response and fix any issues</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">5.</span>
              <span>Repeat for all 4 challenges</span>
            </li>
          </ol>
        </div>

        {/* Resources */}
        <div className="mt-8 bg-blue-600 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">🔗 Useful Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://www.prisma.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-white font-semibold transition"
            >
              → Prisma Documentation
            </a>
            <a
              href="https://nextjs.org/docs/api-routes/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-white font-semibold transition"
            >
              → Next.js API Routes
            </a>
            <a
              href="/CHALLENGES.md"
              className="text-blue-100 hover:text-white font-semibold transition"
            >
              → Challenge Descriptions
            </a>
            <a
              href="https://www.prisma.io/docs/orm/prisma-client/queries/crud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-white font-semibold transition"
            >
              → Prisma Query Methods
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}