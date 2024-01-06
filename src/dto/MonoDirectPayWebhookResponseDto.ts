
export interface MonoDirectPayWebhookResponseDto {
  id: string,
  event: string,
  status: string,
  type: string,
  amount: number,
  fee: number,
  currency: string,
  liveMode: boolean,
  account?: any,
  customer?: string,
  meta?: any,
  description: string,
  reference: string,
  createdAt: string,
  updatedAt: object
}