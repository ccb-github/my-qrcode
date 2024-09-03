import Realm from "realm"
export class Category extends Realm.Object {
  _id: Realm.BSON.ObjectId
  createdAt: Date
  description: string
  name: string

  static schema = {
    name: "Category",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      name: "string",

      createdAt: "date",
    },
  }

  static generate = (description: string) => {
    const seed = new Realm.BSON.ObjectId()
    return {
      _id: seed,
      description: description ?? `Enterprise ${seed.toHexString()}`,
      name: seed.toHexString(),
      createAt: new Date(),
    }
  }
}

export default Category
