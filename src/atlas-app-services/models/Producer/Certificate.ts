import type { BSON } from "realm"
import type { EnterpriseMain } from "./EnterPrise"
import { Realm } from "@realm/react"


class Certificate extends Realm.Object {
  _id!: BSON.ObjectId
  description!: string
  producer!: EnterpriseMain
  static schema = {
    name: "Certificate",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      producer: "Enterprise",
    },
  }
}
const CertificateSchema = [Certificate]
export default CertificateSchema
