import { createWorker } from '@repo/queue'
import { YoutubePublishJob } from '@repo/automation/jobs.js'
import { recordJobEvent } from '@repo/automation/analytics.js'

const worker = createWorker('youtube-publish', async (job) => {
  const data = job.data as YoutubePublishJob
  recordJobEvent({
    id: job.id as string,
    queue: 'youtube-publish',
    type: 'started',
    timestamp: new Date().toISOString(),
    payload: data,
  })
  // Simulate publishing
  console.log('[youtube-publish-worker] Processing job', data)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('[youtube-publish-worker] Completed job', job.id)
  return { status: 'success', publishedAt: new Date().toISOString() }
})

worker.on('completed', (job) => {
  recordJobEvent({
    id: job.id as string,
    queue: 'youtube-publish',
    type: 'completed',
    timestamp: new Date().toISOString(),
    payload: job.data,
  })
  console.log('[youtube-publish-worker] Job completed', job.id)
})

worker.on('failed', (job, err) => {
  recordJobEvent({
    id: job?.id as string,
    queue: 'youtube-publish',
    type: 'failed',
    timestamp: new Date().toISOString(),
    payload: job?.data,
    error: err?.message,
  })
  console.error('[youtube-publish-worker] Job failed', job?.id, err)
})
