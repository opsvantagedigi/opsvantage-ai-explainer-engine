import { prisma } from "@/lib/prisma";
export async function getLatestSubscriptionForUser(userId) {
    return prisma.subscription.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
}
export function mapStatus(status) {
    switch (status) {
        case "active":
            return "active";
        case "pending":
            return "pending";
        case "failed":
        case "cancelled":
            return "failed";
        default:
            return "none";
    }
}
