const Seller = () => {}
Seller.schema = {
  name: "Seller",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    description: "string",
    records: "Record[]",
    location: `{}`,
    embedLocation: "Location",
    ownerId: "string",
  },
}
Seller.generate = (description?: string) => {
  const seed = new Realm.BSON.ObjectId()
  return {
    _id: seed,
    description: `Regulatory ${seed.toHexString()}`,
    creditCode: "fakeCode",
    email: `${Math.random().toFixed(3)}@domain.com`,
    createdAt: new Date(),
    ownerId: "string",
  }
}
const SellerSchemaList = [Seller]
export { SellerSchemaList }
