import Realm from "realm"
class Producer extends Realm.Object {
  static schema = {
    name: "Producer",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      location: "Location?",
      ownerId: "string",
    },
  }
}
const ProducerSchemaList = [Producer]
export default ProducerSchemaList
