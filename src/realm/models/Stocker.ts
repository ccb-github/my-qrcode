const StockName = () => {}
StockName.schema = {
  name: "StockName",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    location: { type: "bool" },
    createdAt: { type: "date", default: new Date() },
    ownerId: "string",
    owner: "StockManager?",
  },
}
StockName.generate = (description: string) => {
  const seed = new Realm.BSON.ObjectId()
  return {
    _id: seed,
    name: seed.toHexString(),

    creditCode: "fakeCode",

    email: `${Math.random().toFixed(3)}@domain.com`,
    createdAt: new Date(),
  }
}

const StockManager = {
  name: "StockManager",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    enterAt: "date",
    ownerId: "string",
  },
}

const StockerSchemaList = [StockManager, StockName]

export { StockerSchemaList }
