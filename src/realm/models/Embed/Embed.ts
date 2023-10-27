const LocationType = {
  name: "Location",
  embedded: true,
  properties: {
    longitude: "float",
    latitude: "float",
  },
}

const QrcodeType = {
  name: "Qrcode",
  embedded: true,
  properties: {
    value: "string",
  },
}

const EmbedTypeList = [QrcodeType, LocationType]

export default EmbedTypeList
