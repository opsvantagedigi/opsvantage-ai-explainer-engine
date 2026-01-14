// src/app/api/dev-session/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * Dev-only session mint endpoint (hardened).
 * - Trims env and provided token to avoid newline/quote issues.
 * - Logs expected/provided lengths for easy debugging in Vercel logs.
 * - Can be disabled in production by setting ALLOW_DEV_SESSION=false.
 *
 * IMPORTANT: Remove or disable this route before GA.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const providedRaw = String(body?.serviceToken ?? "");
    const provided = providedRaw.trim();
    const expectedRaw = String(process.env.TEST_SERVICE_TOKEN ?? "");
    const expected = expectedRaw.trim();
    const allowDev = String(process.env.ALLOW_DEV_SESSION ?? "false").toLowerCase() === "true";

    // Loud failure if token missing in environment
    if (!expected) {
      console.error("[dev-session] TEST_SERVICE_TOKEN is not set in environment");
      return NextResponse.json(
        { error: "Server misconfiguration: TEST_SERVICE_TOKEN missing" },
        { status: 500 }
      );
    }

    // Gate in production unless explicitly allowed
    if (process.env.NODE_ENV === "production" && !allowDev) {
      console.warn("[dev-session] Dev session endpoint disabled in production (ALLOW_DEV_SESSION not true)");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Log lengths to help debug mismatches (will appear in Vercel logs)
    console.info("[dev-session] token lengths", {
      providedLength: provided.length,
      expectedLength: expected.length,
      providedPreview: provided.slice(0, 8) + (provided.length > 8 ? "…" : ""),
      expectedPreview: expected.slice(0, 8) + (expected.length > 8 ? "…" : ""),
    });

    // Token mismatch -> explicit 403
    if (!provided || provided !== expected) {
      console.warn("[dev-session] Invalid serviceToken provided");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // TODO: Replace with your real session minting logic (create user, set cookie, etc.)
    const payload = {
      ok: true,
      message: "Dev session minted (test mode)",
      timestamp: new Date().toISOString(),
    };

    const res = NextResponse.json(payload, { status: 200 });
    // Example cookie (uncomment and adjust if you need to set a cookie)
    // res.cookies.set("next-auth.session-token", "smoke-session-placeholder", { httpOnly: true, secure: true, path: "/" });

    console.info("[dev-session] Dev session minted successfully");
    return res;
  } catch (err) {
    console.error("[dev-session] Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
