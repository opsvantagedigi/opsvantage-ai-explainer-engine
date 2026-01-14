type RedisConnection = {
  host?: string
  port?: number
  password?: string
}

export const connection: RedisConnection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
}

let _youtubePublishQueue: any = null

export function getYoutubePublishQueue() {
  if (_youtubePublishQueue) return _youtubePublishQueue
  // Require bullmq at runtime to avoid bundling Node-only deps into Next.js build
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Queue } = require('bullmq')
  _youtubePublishQueue = new Queue('youtube-publish', { connection })
  return _youtubePublishQueue
}

export { }
