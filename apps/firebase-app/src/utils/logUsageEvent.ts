import { UsageEventStore } from '../../models/UsageEvent';

export async function logUsageEvent(
  userId: string,
  type: string,
  amount = 1,
  metadata = {},
) {
  const timestamp = new Date().toISOString();
  UsageEventStore.push({
    id: `${userId}-${Date.now()}`,
    userId,
    type,
    amount,
    metadata,
    timestamp,
  });
}
