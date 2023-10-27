import type { BSON } from "realm"
import realmApp from "../../app"
import { Realm } from "@realm/react"
import type { Product } from "../Producer/Product"
const { UUID } = Realm.BSON

class OrderMain extends Realm.Object {
  _id: BSON.ObjectId
  customerId: string
  paymentMethod: "phone" | "unioncard"
  transitionId: BSON.ObjectId
  products?: Product[]
  orderTime: Date
  static schema = {
    name: "Order",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      customerId: "string",
      paymentMethod: "string",
      transitionId: "objectId",
      products: "Product[]",
      orderTime: "date",
    },
  }

  generate = (description: string) => {
    return {
      _id: new UUID(),
      customerId: realmApp.currentUser?.id || "system",
      orderTime: new Date(),
    }
  }
}

const OrderSchemaList = [OrderMain]

export default OrderSchemaList
export { OrderMain }
