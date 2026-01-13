import { prisma } from "@/lib/prisma";
export async function isAdminOrSuperuser(userId) {
    if (!userId)
        return false;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
    });
    return user?.role === "admin" || user?.role === "superuser";
}
