export interface MonoDirectPayRequestDto {
  amount: number,
  type: string,
  description: string,
  reference: string,
  account?: string,
  redirectUrl?: string,
  meta?: object
}