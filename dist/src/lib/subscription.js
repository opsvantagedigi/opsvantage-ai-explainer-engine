import { prisma } from "@/lib/prisma";
export async function getUserSubscriptionStatus(userId) {
    if (!userId)
        return "none";
    const sub = await prisma.subscription.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
    if (!sub)
        return "none";
    switch (sub.status) {
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
// ...existing code...
