import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { accessToken, title, description } = await req.json()

    if (!accessToken) return NextResponse.json({ error: 'missing accessToken' }, { status: 400 })

    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({ access_token: accessToken })

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client })

    // Expect a multipart/form-data upload with a file stream; for simplicity this endpoint supports a remote URL or base64 payload.
    // Here we expect a `fileUrl` pointing to a temporary upload accessible to the server.
    const { fileUrl } = await req.json()

    if (!fileUrl) return NextResponse.json({ error: 'missing fileUrl' }, { status: 400 })

    // Fetch the file as a stream
    const res = await fetch(fileUrl)
    const body = res.body

    const result = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: { title, description },
        status: { privacyStatus: 'private' },
      },
      media: {
        body: body as any,
      },
    })

    return NextResponse.json({ success: true, data: result.data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
