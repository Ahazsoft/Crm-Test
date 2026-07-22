import {prisma} from "@/lib/prisma";

export const getMetrics = async () => {
    const totalLeads = await prisma.lead.count();
    const convertedLeads = await prisma.lead.count({
        where: {status: 'Converted'}
    });
    const aggregateResult = await prisma.lead.aggregate({
        _avg: {
            score: true
        }
    });
    const averageLeadScore = aggregateResult._avg.score ?? 0;
    const conversionRate = totalLeads > 0
        ? Number(((convertedLeads / totalLeads) * 100).toFixed(2))
        : 0;

    return {
        totalLeads,
        convertedLeads,
        conversionRate,
        averageLeadScore
    }
}