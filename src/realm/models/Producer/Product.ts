import { type BSON } from "realm"
import { type EnterpriseMain } from "./EnterPrise"
import { type Checker } from "../Regulatory/Checker"
import type CheckRecord from "../Regulatory/CheckRecord"

class Product extends Realm.Object {
  _id: BSON.ObjectId
  name: string
  category: string
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
        default: new Realm.BSON.ObjectID()
      },
      name: "string",
      category: "string",
      produceDay: "date",
      status: "string",
      shelfLife: "int",
      description: "string",
      standard: "string",
      assemblePlace: "string?",
      producer: "Enterprise?",
      checker: "Checker?",
      checkRecord: "CheckRecord?",
      ownerId: "string"
    }
  }

  generateDummyData = (userid?: string, description?: string) => {
    const seed = new Realm.BSON.ObjectID()
    return {
      name: seed.toHexString(),
      produceDay: new Date(),
      shelfLife: 365,
      description: description || `Product ${seed.toHexString()}`,
      standard: `${Math.random().toFixed(7).slice(1)}@domain.com`,
      assemlePlace: "China",
      ownerId: userid || "system",
      category: "System default"
    }
  }
}

const ProductSchemaList = [Product]
export { Product }
export default ProductSchemaList
