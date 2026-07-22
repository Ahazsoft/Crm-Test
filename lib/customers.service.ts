import {prisma} from "@/lib/prisma";

export const getCustomerWithoutPurchase = async () => {
    return await prisma.customer.findMany({
        where: {
            sales: {
                none: {}
            }
        },
    })

}