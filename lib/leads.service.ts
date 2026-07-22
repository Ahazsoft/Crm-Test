import {prisma} from "@/lib/prisma";

export const getDuplicateLeads = async () => {
    const leads = await prisma.lead.findMany({
        where: {
            email: {not: null}
        },
        select: {
            id: true,
            email: true
        }
    });

    const emailGroups = {};
    for (let lead of leads) {
        if (lead.email) {
            if (!emailGroups[lead.email]) {
                emailGroups[lead.email] = [];
            }
            emailGroups[lead.email].push(lead.id);
        }
    }


    return emailGroups
}