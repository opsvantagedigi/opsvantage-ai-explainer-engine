import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

async function refreshAccessToken(token: any) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string,
      })

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    const refreshed = await res.json()

    if (!res.ok) throw refreshed

    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error('Error refreshing access token', error)
    return { ...token, error: 'RefreshAccessTokenError' as const }
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/youtube.upload',
            'https://www.googleapis.com/auth/youtube',
            'https://www.googleapis.com/auth/youtube.force-ssl',
          ].join(' '),
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    // preserve any other providers if present in the future
  ],

  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Date.now() + (account.expires_in ?? 0) * 1000,
        }
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      return refreshAccessToken(token)
    },

    async session({ session, token }: any) {
      ;(session as any).accessToken = token.accessToken
      ;(session as any).refreshToken = token.refreshToken
      ;(session as any).error = token.error
      return session
    },
  },

  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions as any)

export { handler as GET, handler as POST }
