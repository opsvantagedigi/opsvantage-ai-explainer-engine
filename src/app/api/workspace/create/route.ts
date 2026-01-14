import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

/**
 * Workspace create route — tolerant dev bypass + manual JWT decode fallback.
 */

function sanitizeToken(raw?: string) {
  if (!raw) return "";
  return String(raw).trim().replace(/^['"]|['"]$/g, "").replace(/\r|\n/g, "");
}

function parseCookieValue(cookieHeader: string, name = "next-auth.session-token") {
  if (!cookieHeader) return "";
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const c of cookies) {
    if (c.startsWith(name + "=")) return c.slice((name + "=").length);
  }
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const debugMode = url.searchParams.get("debug") === "true";

    const json = await req.json().catch(() => ({}));
    const name = String(json?.name ?? "").trim();
    if (!name) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    let session: any = null;
    try {
      session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    } catch (e) {
      console.warn("[workspace-create] getToken error (non-fatal):", String(e));
      session = null;
    }

    const cookieHeader = req.headers.get("cookie") ?? "";
    const cookieValue = parseCookieValue(cookieHeader, "next-auth.session-token");
    let manualDecoded: any = null;
    if (cookieValue && process.env.NEXTAUTH_SECRET) {
      try {
        manualDecoded = jwt.verify(cookieValue, process.env.NEXTAUTH_SECRET as string);
      } catch (e) {
        manualDecoded = null;
      }
    }

    const providedHeader = sanitizeToken(req.headers.get("x-dev-service-token") ?? "");
    const expectedEnv = sanitizeToken(process.env.TEST_SERVICE_TOKEN);
    const allowDev = String(process.env.ALLOW_DEV_SESSION ?? "false").toLowerCase() === "true";

    console.info("[workspace-create] auth debug", {
      hasSession: !!session,
      manualDecoded: manualDecoded ? { sub: manualDecoded.sub, email: manualDecoded.email } : null,
      providedHeaderLength: providedHeader.length,
      expectedEnvLength: expectedEnv.length,
      allowDev,
    });

    let email: string | null = null;
    if (session?.email) email = session.email;
    else if (session?.user?.email) email = session.user.email;
    else if (manualDecoded?.email) email = manualDecoded.email;

    if (!email) {
      if (allowDev && providedHeader && providedHeader === expectedEnv) {
        email = "dev-bypass@opsvantage.local";
        console.info("[workspace-create] dev bypass accepted");
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const workspaceId = `ws_${Math.random().toString(36).slice(2, 10)}`;

    const payload = {
      ok: true,
      workspaceId,
      createdBy: email,
      debug: debugMode ? { session, manualDecoded } : undefined,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    console.error("[workspace-create] unexpected error:", String(err));
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
