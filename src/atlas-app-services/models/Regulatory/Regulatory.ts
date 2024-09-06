import Realm from "realm"
export default class Regulatory extends Realm.Object {
  static schema = {
    name: "Regulatory",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      creditCode: "string",
      name: "string",
      address: "string?",
      ownerId: "string",
    },
    
  }

  static generate = (description?: string) => {
    const seed = new Realm.BSON.ObjectId()
    return {
      _id: seed,
      name: `${seed.toHexString()} Name`,
      description: `Regulatory ${seed.toHexString()}`,
      creditCode: "fakeCode",
      email: `${Math.random().toFixed(3)}@domain.com`,
      createdAt: new Date(),
      ownerId: "string",
    }
  }
}
