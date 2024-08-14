import realmApp from "../app"
import { type BSON } from "realm"

const RecordMainSchema = {
  name: "Record",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    description: "string",
    isVerified: { type: "bool", default: false },
    createdAt: "date",
    location: "Location",
    url: { type: "string", default: "www.dummyurl.com" },
    code: { type: "Qrcode?" },
    ownerId: "string",
  },
  /*  generate: (description: string)  => {
      return {
          _id: new Realm.BSON.ObjectId(),
          description: description,
          createdAt: new Date(),
          ownerId: realmApp.currentUser.id,
          location: {
            longitude: 50, 
            latitude: 50
          },
      };
    } */
}

class Record extends Realm.Object {
  _id: BSON.ObjectId
  description: string
  isVerified: boolean
  createdAt: Date

  ownerId: string
  static schema = {
    name: "Record",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      isVerified: { type: "bool", default: false },
      createdAt: "date",
      location: "Location",
      url: { type: "string", default: "www.dummyurl.com" },
      code: { type: "Qrcode?" },
      ownerId: "string",
    },
  }

  generate(description: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      location: {
        longitude: 50,
        latitude: 50,
      },

      createdAt: new Date(),
      ownerId: realmApp.currentUser.id,
    }
  }
}
// RecordMain.generate = (description: string)  => {
//   return {
//       _id: new Realm.BSON.ObjectId(),
//       description: description,
//       location: {
//         longitude: 50,
//         latitude: 50
//       },

//       createdAt: new Date(),
//       ownerId: realmApp.currentUser.id
//   };
// }
const RecordSchemaList = [Record]
export { Record, RecordMainSchema }
export default RecordSchemaList
