// Hardened pages API dev-session handler (single implementation)
const jsonwebtoken = require("jsonwebtoken");

export default async function handler(req: any, res: any) {
  const sanitizeToken = (raw?: string) => {
    if (!raw) return "";
    return String(raw).trim().replace(/^['"]|['"]$/g, "").replace(/\r|\n/g, "");
  };

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const providedRaw = sanitizeToken(body.serviceToken);
  const expectedRaw = sanitizeToken(process.env.TEST_SERVICE_TOKEN);
  const allowDev = String(process.env.ALLOW_DEV_SESSION ?? "false").toLowerCase() === "true";

  if (!expectedRaw) {
    console.error("[dev-session] Server misconfiguration: TEST_SERVICE_TOKEN missing");
    return res.status(500).json({ error: "Server misconfiguration: TEST_SERVICE_TOKEN missing" });
  }

  if (process.env.NODE_ENV === "production" && !allowDev) {
    console.warn("[dev-session] Dev session disabled in production (ALLOW_DEV_SESSION not true)");
    return res.status(403).json({ error: "Forbidden" });
  }

  if (!providedRaw || providedRaw !== expectedRaw) {
    console.warn("[dev-session] Invalid service token provided", {
      providedLength: providedRaw.length,
      expectedLength: expectedRaw.length,
      providedPreview: providedRaw.slice(0, 8),
    });
    return res.status(403).json({ error: "Forbidden" });
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: Record<string, any> = {
    sub: String(body.userId ?? `dev-${Math.random().toString(36).slice(2, 9)}`),
    email: body.email ?? "smoke+test@opsvantage.io",
    name: body.name ?? "Smoke Tester",
    globalRole: body.globalRole ?? "ADMIN",
    iat: now,
    exp: now + 60 * 60 * 4,
    jti: Math.random().toString(36).slice(2, 12),
  };

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    console.error("[dev-session] Server misconfiguration: NEXTAUTH_SECRET missing");
    return res.status(500).json({ error: "Server misconfiguration: NEXTAUTH_SECRET missing" });
  }

  let token: string;
  try {
    token = jsonwebtoken.sign(payload, secret, { algorithm: "HS256" });
  } catch (err) {
    console.error("[dev-session] JWT sign error:", String(err));
    return res.status(500).json({ error: "Internal Server Error" });
  }

  const maxAge = 60 * 60 * 4;
  const cookieValue = `next-auth.session-token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
  res.setHeader("Set-Cookie", cookieValue);
  console.info("[dev-session] Dev session minted; cookie set; token jti:", payload.jti);
  return res.status(200).json({ success: true });
}
import * as jsonwebtoken from "jsonwebtoken";

export default async function handler(req: any, res: any) {
  const sanitizeToken = (raw?: string) => {
    if (!raw) return "";
    return String(raw).trim().replace(/^['"]|['"]$/g, "").replace(/\r|\n/g, "");
  };

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const providedRaw = sanitizeToken(body.serviceToken);
  const expectedRaw = sanitizeToken(process.env.TEST_SERVICE_TOKEN);
  const allowDev = String(process.env.ALLOW_DEV_SESSION ?? "false").toLowerCase() === "true";

  if (!expectedRaw) {
    console.error("[dev-session] Server misconfiguration: TEST_SERVICE_TOKEN missing");
    return res.status(500).json({ error: "Server misconfiguration: TEST_SERVICE_TOKEN missing" });
  }

  if (process.env.NODE_ENV === "production" && !allowDev) {
    console.warn("[dev-session] Dev session disabled in production (ALLOW_DEV_SESSION not true)");
    return res.status(403).json({ error: "Forbidden" });
  }

  if (!providedRaw || providedRaw !== expectedRaw) {
    console.warn("[dev-session] Invalid service token provided", {
      providedLength: providedRaw.length,
      expectedLength: expectedRaw.length,
      providedPreview: providedRaw.slice(0, 8),
    });
    return res.status(403).json({ error: "Forbidden" });
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: Record<string, any> = {
    sub: String(body.userId ?? `dev-${Math.random().toString(36).slice(2, 9)}`),
    email: body.email ?? "smoke+test@opsvantage.io",
    name: body.name ?? "Smoke Tester",
    globalRole: body.globalRole ?? "ADMIN",
    iat: now,
    exp: now + 60 * 60 * 4,
    jti: Math.random().toString(36).slice(2, 12),
  };

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    console.error("[dev-session] Server misconfiguration: NEXTAUTH_SECRET missing");
    return res.status(500).json({ error: "Server misconfiguration: NEXTAUTH_SECRET missing" });
  }

  let token: string;
  try {
    token = (jsonwebtoken as any).sign(payload, secret, { algorithm: "HS256" });
  } catch (err) {
    console.error("[dev-session] JWT sign error:", String(err));
    return res.status(500).json({ error: "Internal Server Error" });
  }

  const maxAge = 60 * 60 * 4;
  const cookieValue = `next-auth.session-token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
  res.setHeader("Set-Cookie", cookieValue);
  console.info("[dev-session] Dev session minted; cookie set; token jti:", payload.jti);
  return res.status(200).json({ success: true });
}
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

/**
 * Dev-only session mint endpoint (hardened).
 * - Trims env and provided token to avoid newline/quote issues.
 * - Uses NEXTAUTH_SECRET to sign a JWT compatible with NextAuth (JWT session strategy).
 * - Sets cookie `next-auth.session-token` with attributes NextAuth expects.
 * - Uses concise logging (info/warn) and avoids duplicate error spam.
 *
 * IMPORTANT: This endpoint is for smoke tests/dev only. Disable or remove before GA.
 */

type DevBody = {
  serviceToken?: string;
  userId?: string;
  email?: string;
  name?: string;
  globalRole?: string;
};

function sanitizeToken(raw?: string) {
  if (!raw) return "";
  let t = String(raw);
  // Remove surrounding quotes and whitespace and CR/LF
  t = t.trim().replace(/^['"]|['"]$/g, "").replace(/\r|\n/g, "");
  return t;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = (req.body || {}) as DevBody;
  const providedRaw = sanitizeToken(body.serviceToken);
  const expectedRaw = sanitizeToken(process.env.TEST_SERVICE_TOKEN);
  const allowDev = String(process.env.ALLOW_DEV_SESSION ?? "false").toLowerCase() === "true";

  // Minimal validation
  if (!expectedRaw) {
    console.error("[dev-session] Server misconfiguration: TEST_SERVICE_TOKEN missing");
    return res.status(500).json({ error: "Server misconfiguration: TEST_SERVICE_TOKEN missing" });
  }

  // Gate in production unless explicitly allowed
  if (process.env.NODE_ENV === "production" && !allowDev) {
    console.warn("[dev-session] Dev session disabled in production (ALLOW_DEV_SESSION not true)");
    return res.status(403).json({ error: "Forbidden" });
  }

  // Compare trimmed tokens
  if (!providedRaw || providedRaw !== expectedRaw) {
    console.warn("[dev-session] Invalid service token provided", {
      providedLength: providedRaw.length,
      expectedLength: expectedRaw.length,
      providedPreview: providedRaw.slice(0, 8),
    });
    return res.status(403).json({ error: "Forbidden" });


  if (!serviceToken || serviceToken !== SERVICE_TOKEN) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  if (!NEXTAUTH_SECRET) {
    console.error('NEXTAUTH_SECRET not configured')
    return res.status(500).json({ error: 'Server misconfiguration' })
  }

  if (!userId || !email) {
    return res.status(400).json({ error: 'Missing required fields: userId, email' })
  }

  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 4 // 4 hours

  const header = { alg: 'HS256', typ: 'JWT' }
  const payload: Record<string, any> = {
    sub: userId,
    email,
    name: name ?? null,
    globalRole: globalRole ?? 'MEMBER',
    activeOrgId: activeOrgId ?? null,
    activeWorkspaceId: activeWorkspaceId ?? null,
    jti: crypto.randomBytes(8).toString('hex'),
    iat,
    exp,
  }

  const encodedHeader = base64url(JSON.stringify(header))
  const encodedPayload = base64url(JSON.stringify(payload))
  const signingInput = `${encodedHeader}.${encodedPayload}`
  const signature = signHS256(signingInput, NEXTAUTH_SECRET as string)
  const token = `${signingInput}.${signature}`

  const maxAge = 60 * 60 * 4
  const cookie = `next-auth.session-token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`

  res.setHeader('Set-Cookie', cookie)
  res.status(200).json({ success: true })
}
