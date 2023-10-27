import { type BSON } from "realm"
import type Regulatory from "./Regulatory"

export class Checker extends Realm.Object {
  _id: BSON.ObjectId
  email: string
  name?: string
  address?: string
  belong?: Regulatory
  ownerId: string
  major?: string
  static schema = {
    name: "Checker",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      email: "string",
      name: "string?",
      address: "string?",
      belong: "Regulatory?",
      ownerId: "string",
      major: "string?",
    },
  }

  static generate(description?: string) {
    const seed = new Realm.BSON.ObjectId()
    return {
      _id: seed,
      description: `Regulatory ${seed.toHexString()}`,
      creditCode: "fakeCode",
      email: `${Math.random().toFixed(3)}@domain.com`,
      createdAt: new Date(),
      ownerId: "string",
    }
  }
}
const CheckerSchemaList = [Checker]

export default CheckerSchemaList
