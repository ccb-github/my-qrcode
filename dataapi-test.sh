curl -s https://data.mongodb-api.com/app/application-qrcode-ukplu/endpoint/data/v1/action/insertOne \
  -X POST \
  -H "Content-Type: application/ejson" \
  -H "Accept: application/json" \
  -H "apiKey: TpqAKQgvhZE4r6AOzpVydJ9a3tB1BLMrgDzLlBLbihKNDzSJWTAHMVbsMoIOpnM6" \
  -d '{
    "dataSource": "mongodb-atlas",
    "database": "learn-data-api",
    "collection": "hello",
    "document": {
      "text": "Hello, world!"
    }
  }'

  curl -s "https://data.mongodb-api.com/app/application-qrcode-ukplu/endpoint/search" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  --data '{
     "collectionName": "Product",
     "fieldName": "name", 
     "fieldValue": "Product a"
  }'

  curl -s "https://data.mongodb-api.com/app/application-qrcode-ukplu/endpoint/product/?arg1=Order&arg2=catgory&arg3=other" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  --data '{
     "collectionName": "Product",
     "fieldName": "name", 
     "fieldValue": "Product a"
  }'