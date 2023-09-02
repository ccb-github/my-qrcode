const RegulatoryMainSchema = {
	name: "Regulatory",
	primaryKey: "_id",
	properties: {
		_id: "objectId",
		description: "string",
		creditCode: "string",
		name: "string?",
		address: "string?",
		ownerId: "string",
	},
	generate: (description?: string) => {
		const seed = new Realm.BSON.ObjectId();
		return {
			_id: seed,
			description: `Regulatory ${seed.toHexString()}`,
			creditCode: "fakeCode",
			email: `${Math.random().toFixed(3)}@domain.com`,
			createdAt: new Date(),
			ownerId: "string",
		};
	}
}
const RegulatorySchemaList = [RegulatoryMainSchema]

export default RegulatorySchemaList 