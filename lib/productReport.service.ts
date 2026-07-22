import {prisma} from "@/lib/prisma";

export const getProductReport = async () => {
    return prisma.product.findMany({
            select: {
                name: true,
                stockQuantity: true,
                _count: {
                    select: {
                        sales: true
                    },
                },
            },
        }
    )
}