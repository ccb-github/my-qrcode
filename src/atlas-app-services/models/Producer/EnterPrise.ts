export class EnterpriseMain extends Realm.Object {
  _id: Realm.BSON.ObjectId
  description: string
  creditCode: string
  email: string
  name: string
  registerPlace: string
  createdAt: Date
  tradeMark?: string
  ownerId: string

  static schema = {
    name: "Enterprise",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      creditCode: "string",
      email: "string?",
      name: "string?",
      registerPlace: "string",
      createdAt: "date",
      tradeMark: "string?",
      address: "string?",
      ownerId: "string",
    },
  }

  static generate = (description: string) => {
    const seed = new Realm.BSON.ObjectId()
    return {
      _id: seed,
      description: description ?? `Enterprise ${seed.toHexString()}`,
      creditCode: "fakeCode",
      email: `${Math.random().toFixed(3)}@domain.com`,
      name: `Enterprise ${Math.random().toFixed(3)}}`,
      registerPlace: `Place ${Math.random().toFixed(3)}`,
      createdAt: new Date(),
      tradeMark: `https://picsum.photos/200/300?random=${
        seed.generationTime % 100
      };`,
      // This means is generated by system
      ownerId: "system",
    }
  }
}

const EnterpriseSchemaList = [EnterpriseMain]

export default EnterpriseSchemaList
