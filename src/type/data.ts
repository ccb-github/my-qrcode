export type EnterpriseData = {
  _id: "objectId"
  description: "string"
  creditCode: "string"
  email: string
  name: string
  registerPlace: string
  createdAt: "date"
  tradeMark?: string
}
// The type of history scanning record(using camera)
export type ScanRecord = {
  id: string
  createdAt: Date
  content: string
  type: string
}
