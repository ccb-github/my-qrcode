import type { Checker } from "./Checker"
import type { Product } from "../Producer/Product"

export default class CheckRecord extends Realm.Object {
  _id!: Realm.BSON.ObjectId
  device!: string
  method?: string
  name!: string
  operator?: Checker
  result!: string
  target?: Product

  static schema = {
    name: "CheckRecord",
    properties: {
      _id: "objectId",
      device: "string",
      method: "string?",
      name: "string",
      operator: "Checker",
      result: "string",
      target: "Product",
    },
    primaryKey: "_id",
  }

  static generate(description?: string) {
    const seed = new Realm.BSON.ObjectId()
    return {
      _id: seed,
      name: "string",
      device: "1333",
      method: "A",
      result: "Pass",
    }
  }
}

export const CheckRecordSchema = {
  name: "CheckRecord",
  properties: {
    _id: "objectId",
    device: "string",
    method: "string?",
    name: "string",
    operator: "Checker",
    result: "string",
    target: "Product",
  },
  primaryKey: "_id",
}
