import { BSON } from "realm"

export type UserProfile = {
  _id: BSON.ObjectId
  _userId: string
  email: string
  name?: string
  isAdmin: boolean
  role: "globalAdmin" | "customer" | "enterprise" | "regulatory"
  emailVerified: boolean
}

export interface IExtendable {
  foo: number
}
