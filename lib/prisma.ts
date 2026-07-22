import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@prisma/client";

export function createPrismaClient() {
    const connectionString = process.env.NEXT_DATABASE_URL;

    if (!connectionString) {
        throw new Error("DB url not found");
    }

    const adapter = new PrismaPg({
        connectionString
    });

    const prisma = new PrismaClient({
        adapter
    });

    return prisma;
}

export const prisma = createPrismaClient()