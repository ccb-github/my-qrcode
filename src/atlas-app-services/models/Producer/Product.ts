import { type BSON } from "realm"
import { type EnterpriseMain } from "./EnterPrise"
import { type Checker } from "../Regulatory/Checker"
import type CheckRecord from "../Regulatory/CheckRecord"
import type Category from "../Seller/Category"

class Product extends Realm.Object {
  _id: BSON.ObjectId
  name: string
  category?: Category
  produceDay: Date
  status: string
  shelfLife: number
  description: string
  standard: string
  assemblePlace?: string
  producer?: EnterpriseMain
  checker?: Checker
  checkRecord: CheckRecord
  ownerId: string

  static schema = {
    name: "Product",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "objectId",
        default: new Realm.BSON.ObjectID(),
      },
      name: "string",
      category: "Category?",
      produceDay: "date",
      status: "string",
      shelfLife: "int",
      description: "string",
      standard: "string",
      assemblePlace: "string?",
      producer: "Enterprise?",
      checker: "Checker?",
      checkRecord: "CheckRecord?",
      ownerId: "string",
    },
  }

  generateDummyData = (dummyData: {
    userId?: string
    description?: string
  }) => {
    const { userId, description } = dummyData
    const seed = new Realm.BSON.ObjectID()
    return {
      name: seed.toHexString(),
      produceDay: new Date(),
      shelfLife: 365,
      description: description ?? `Product ${seed.toHexString()}`,
      standard: `${Math.random().toFixed(7).slice(1)}@domain.com`,
      assemlePlace: "China",
      ownerId: userId ?? "system",
      category: "System default",
    }
  }
}

const ProductSchemaList = [Product]
export { Product }
export default ProductSchemaList
