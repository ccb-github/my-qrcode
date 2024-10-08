import Realm from "realm"
export default class Account extends Realm.Object {
  // Todo owerid
  static schema = {
    name: "Account",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      email: { type: "string", default: "empty@domain.com" },
      description: "string",
      isVerified: { type: "bool", default: false },
      createdAt: "date",
      owner_id: "string",
    },
  }

  static generate(description: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      isComplete: false,
      email: "",
      createdAt: new Date(),
      owner_id: "Temp id",
    }
  }
}
