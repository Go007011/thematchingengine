export interface AzureFunctionConfig {
  endpoint: string
}

export async function invokeAzureFunction(_config: AzureFunctionConfig, _payload?: unknown): Promise<unknown> {
  return null
}
