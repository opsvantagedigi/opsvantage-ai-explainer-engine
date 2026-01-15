// NextAuth was removed from the codebase. Keep a minimal no-op handler here
// so builds do not fail due to a missing API route while preserving the
// route shape for any external callers. This intentionally avoids importing
// `next-auth` or any auth providers.

export async function GET() {
  return new Response('not found', { status: 404 })
}

export async function POST() {
  return new Response('not found', { status: 404 })
}
