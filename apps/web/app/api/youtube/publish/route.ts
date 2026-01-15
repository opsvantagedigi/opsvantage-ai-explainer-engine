import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
// ...existing code...
import { orchestrateVideoCreation } from '@repo/automation'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { topic, targetAudience, language, stylePreset, title, description, tags, visibility } =
    await req.json()
  const videoId = uuidv4()

  const result = await orchestrateVideoCreation({
    videoId,
    topic,
    targetAudience,
    language,
    stylePreset,
    title,
    description,
    tags,
    visibility,
  })

  return NextResponse.json({ ...result })
}
