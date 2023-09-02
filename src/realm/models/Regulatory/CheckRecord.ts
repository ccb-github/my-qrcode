import  { BSON } from "realm"

export default class CheckRecord extends Realm.Object{
  _id!: BSON.ObjectId
	name!: string
	device!: string
	method!: string
	result: string
	
	static schema = {
		name: "CheckRecord",
		primaryKey: "_id",
		properties: {
			_id: "objectId",
			name: "string",
			device: "string",
			method: "string?",
			result: "string",
			operator: "Checker?"
		},
	}
	static generate(description?: string) {
		const seed = new Realm.BSON.ObjectId();
		return {
			_id: seed,
			name: "string",
			device: "1333",
			method: "A",
			result: "Pass",
			
			
		};
	}
}


