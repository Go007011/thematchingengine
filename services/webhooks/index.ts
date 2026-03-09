export interface WebhookListenerConfig {
  secret: string
}

export async function handleWebhookEvent(
  _config: WebhookListenerConfig,
  _payload: unknown
): Promise<{ accepted: boolean }> {
  return { accepted: true }
}
