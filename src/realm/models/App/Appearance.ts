import realmApp from "../../app"
import { Realm } from "@realm/react"
import { BSON } from "realm"

//TODO the type of css color
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
      //This is the type of schemaKey
      dataType: "string",
      titleColor: "string",
      subTitleColor: "string",
    },
  }
}

export { MobileDetailAppearance }
