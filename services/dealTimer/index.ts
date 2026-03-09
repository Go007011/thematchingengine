export interface DealTimerJob {
  dealId: string
  expiresAt: string
}

export async function scheduleDealTimer(_job: DealTimerJob): Promise<{ scheduled: boolean }> {
  return { scheduled: true }
}
