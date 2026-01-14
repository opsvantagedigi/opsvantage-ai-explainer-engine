import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const rawEnv = String(process.env.TEST_SERVICE_TOKEN ?? "");
    const envTrim = rawEnv.trim();
    const cookieHeader = req.headers.get("cookie") ?? "";
    const cookiePreview = cookieHeader.slice(0, 200);

    let tokenInfo: any = null;
    try {
      tokenInfo = await getToken({ req, secret: String(process.env.NEXTAUTH_SECRET ?? "") });
    } catch (e) {
      tokenInfo = { error: String(e) };
    }

    return NextResponse.json({
      env: { rawLength: rawEnv.length, trimmedLength: envTrim.length, preview: envTrim.slice(0, 16) },
      cookie: { present: !!cookieHeader, preview: cookiePreview, length: cookieHeader.length },
      tokenInfo,
      now: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
