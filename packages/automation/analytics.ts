export interface JobEvent {
  id: string
  queue: string
  type: 'enqueued' | 'started' | 'completed' | 'failed'
  timestamp: string
  payload?: any
  error?: string
}

const jobHistory: JobEvent[] = []

export function recordJobEvent(event: JobEvent) {
  jobHistory.push(event)
  console.log('[job-analytics]', event)
}

export function getJobHistory(videoId: string) {
  return jobHistory.filter((e) => e.payload?.videoId === videoId)
}
