function Certificate (){}

Certificate.schema = {
  name: "Certificate",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    description: "string",
    producer: "Enterprise",
    
  },
} 

const CertificateSchema = [Certificate]
export default CertificateSchema 