export interface IAuditLogs {
  userId: number,
  method: string,
  path: string,
  payload: any,
  createdAt: Date,
}