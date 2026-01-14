import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AccountClientWrapper from '@/components/AccountClientWrapper'

export default async function AccountPage() {
  const session = await getServerSession(authOptions as any)
  return <AccountClientWrapper session={session} />
}
