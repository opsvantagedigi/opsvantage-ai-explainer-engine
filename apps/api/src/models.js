/**
 * Simple JS models used by the mocked API (runtime only).
 */

// JobStatus: 'created' | 'processing' | 'rendered' | 'uploaded' | 'failed'

export function createVideoJobPlaceholder(id, prompt) {
  return { id, status: 'created', prompt, createdAt: new Date().toISOString() };
}
