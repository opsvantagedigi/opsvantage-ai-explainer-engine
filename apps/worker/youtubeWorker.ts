import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'
import { Worker } from 'bullmq'
import { connection } from '../../packages/queue'

async function uploadToYouTube(job: any) {
  const { accessToken, refreshToken, title, description, filePath } = job.data

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    'postmessage'
  )

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  })

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client })

  const resolvedPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath)
  if (!fs.existsSync(resolvedPath)) throw new Error('File not found: ' + resolvedPath)

  const res = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: { title, description },
      status: { privacyStatus: 'public' },
    },
    media: {
      body: fs.createReadStream(resolvedPath) as any,
    },
  })

  return res.data
}

new Worker(
  'youtube-publish',
  async (job) => {
    return await uploadToYouTube(job)
  },
  { connection: connection as any }
)

console.log('YouTube Worker is running...')
