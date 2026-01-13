import { prisma } from "@/lib/prisma";

export async function isSuperUser(
  userId: string | null | undefined
): Promise<boolean> {
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "superuser";
}import { prisma } from "./prisma"

export async function isSuperUser(userId: string | undefined | null) {
  if (!userId) return false
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })
  return (user as any)?.role === "superuser"
}
