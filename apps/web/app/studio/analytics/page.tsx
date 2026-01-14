import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AnalyticsClientWrapper from '@/components/AnalyticsClientWrapper'

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions as any)
  return <AnalyticsClientWrapper session={session} />
}
