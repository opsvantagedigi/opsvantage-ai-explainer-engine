import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { add } from "date-fns";
import { prisma } from "@/lib/prisma";

/**
 * Dev-only DB session mint endpoint (App Router)
 * - Creates a NextAuth-compatible session row (Prisma)
 * - Sets `next-auth.session-token` cookie to the session token string
 * - Use only for smoke tests; disable in GA
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const provided = String(body?.serviceToken ?? "").trim();
    const expected = String(process.env.TEST_SERVICE_TOKEN ?? "").trim();
    const allowDev = String(process.env.ALLOW_DEV_SESSION ?? "false").toLowerCase() === "true";

    if (!expected) {
      console.error("[dev-session] TEST_SERVICE_TOKEN missing");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    if (process.env.NODE_ENV === "production" && !allowDev) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!provided || provided !== expected) {
      console.warn("[dev-session] Invalid service token");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const email = String(body?.email ?? "smoke+test@opsvantage.io");
    const name = String(body?.name ?? "Smoke Tester");
    const userId = String(body?.userId ?? `dev-${Math.random().toString(36).slice(2, 9)}`);

    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name },
    });

    const sessionToken = randomUUID();
    const expires = add(new Date(), { hours: 4 });

    await prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires,
      },
    });

    const res = NextResponse.json({ success: true }, { status: 200 });
    res.cookies.set("next-auth.session-token", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires,
    });

    console.info("[dev-session] DB session created and cookie set");
    return res;
  } catch (err) {
    console.error("[dev-session] Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
