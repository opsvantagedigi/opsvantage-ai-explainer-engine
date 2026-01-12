import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const protectedPaths = ["/app", "/dashboard", "/admin"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = protectedPaths.some((base) => pathname === base || pathname.startsWith(`${base}/`))

  if (!isProtected) return NextResponse.next()

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const userId = token?.sub

  if (!userId) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // Superuser bypass if role present in token
  if ((token as any)?.role === "superuser") {
    return NextResponse.next()
  }

  // Keep middleware lightweight; subscription enforcement happens in server routes/pages.
  return NextResponse.next()
}

export const config = {
  matcher: ["/app/:path*", "/dashboard/:path*", "/admin/:path*"],
}
