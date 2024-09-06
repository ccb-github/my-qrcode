import { type BSON } from "realm"
import realmApp from "../app"
export class Traceability extends Realm.Object {
  _id!: BSON.ObjectId
  name!: string

  static schema = {
    name: "Traceability",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      product: "Product",
      device: "string",
      method: "string?",
      result: "string",
      operator: "Checker?",
    },
  }

  static generate(description?: string) {
    const seed = new Realm.BSON.ObjectId()
    return {
      _id: seed,
      description: `Traceability ${seed.toHexString()}`,
      creditCode: "fakeCode",
      email: `${Math.random().toFixed(3)}@domain.com`,
      createdAt: new Date(),
      ownerId: realmApp.currentUser?.id ?? "system",
    }
  }
}
