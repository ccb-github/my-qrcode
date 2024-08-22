import { Realm } from "@realm/react"
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { BSON } from "realm"

class MobileDetailAppearance extends Realm.Object {
  _id: BSON.ObjectId
  dataType: string
  titleColor: string
  subTitleColor: string

  static schema = {
    name: "MobileDetailAppearance",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      // This is the type of schemaKey
      dataType: "string",
      titleColor: "string",
      subTitleColor: "string",
    },
  }
}

export { MobileDetailAppearance }
