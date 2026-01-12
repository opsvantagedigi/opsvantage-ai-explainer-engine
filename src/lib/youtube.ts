import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';

// YouTube OAuth2 setup
// Place your credentials in .env and read via process.env
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

export function getAuthUrl(workspaceId: string): string {
  const scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly',
  ];
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: workspaceId,
  });
}

export async function handleOAuthCallback(code: string, workspaceId: string): Promise<void> {
  const { tokens } = await oauth2Client.getToken(code);
  // Store tokens in DB (encrypted or env-backed)
  // Upsert by finding existing config first (workspaceId is not declared unique in schema)
  const existing = await prisma.youTubeChannelConfig.findFirst({ where: { workspaceId } });
  if (existing) {
    await prisma.youTubeChannelConfig.update({
      where: { id: existing.id },
      data: {
        youtubeAccessToken: tokens.access_token!,
        youtubeRefreshToken: tokens.refresh_token!,
        tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : new Date(),
      },
    });
  } else {
    await prisma.youTubeChannelConfig.create({
      data: {
        workspaceId,
        channelName: 'Unknown',
        youtubeAccessToken: tokens.access_token!,
        youtubeRefreshToken: tokens.refresh_token!,
        tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : new Date(),
      },
    });
  }
}

export async function uploadShort(workspaceId: string, shortVideoId: string): Promise<string> {
  // Find ShortVideo and YouTube config
  const short = await prisma.shortVideo.findUnique({ where: { id: shortVideoId } });
  const config = await prisma.youTubeChannelConfig.findFirst({ where: { workspaceId } });
  if (!short || !config) throw new Error('Missing video or config');

  oauth2Client.setCredentials({
    access_token: config.youtubeAccessToken,
    refresh_token: config.youtubeRefreshToken,
  });
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  // TODO: Replace with real video file upload logic
  // For now, mock upload and return a fake YouTube URL
  const youtubeVideoId = `mocked-${shortVideoId}`;
  const youtubeUrl = `https://youtube.com/shorts/${youtubeVideoId}`;

  await prisma.shortVideo.update({
    where: { id: shortVideoId },
    data: {
      youtubeVideoId,
      youtubeUrl,
      status: 'uploaded',
      uploadedAt: new Date(),
    },
  });
  return youtubeUrl;
}

// See docs/youtube_setup.md for credential setup and OAuth flow instructions
