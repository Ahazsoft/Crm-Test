import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface DuplicateLeadResult {
  email: string;
  leadIds: string;
}

/**
 * Challenge 2: Find Duplicate Lead Emails
 *
 * TODO: Implement this endpoint to find emails that appear multiple times in the leads table.
 *
 * Requirements:
 * - Find emails that appear 2 or more times
 * - For each duplicate email, list all the lead IDs (comma-separated)
 * - Return format: { email, leadIds: "1,2,3" }
 * - Handle edge cases (no duplicates, null emails)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement your solution here
    // Step 1: Group leads by email
    // Step 3: Filter for emails with count >= 2
    // Step 4: Collect the lead IDs for each email
    // Step 5: Return formatted response
    const duplicateEmails = await prisma.lead.groupBy({
      by: ["email"],
      where: { email: { not: null } },
      _count: { email: true },
      having: { email: { _count: { gte: 2 } } },
    });

    if (duplicateEmails.length === 0) {
      return NextResponse.json([]);
    }

    const leads = await prisma.lead.findMany({
      where: { email: { in: duplicateEmails.map((d) => d.email as string) } },
      select: { id: true, email: true },
      orderBy: { email: "asc" },
    });

    const result: DuplicateLeadResult[] = duplicateEmails.map((dup) => ({
      email: dup.email as string,
      leadIds: leads
        .filter((lead) => lead.email === dup.email)
        .map((lead) => lead.id)
        .join(","),
    }));

    // Hint: You might want to use:
    // - prisma.lead.groupBy()
    // - prisma.lead.findMany()
    // - Or raw SQL via prisma.$queryRaw

    // Remove this and implement:
    return NextResponse.json(result);
  } catch (error) {
    console.error("Challenge 2 Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
