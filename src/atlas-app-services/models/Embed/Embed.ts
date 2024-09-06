class Location {
  longitude: number
  latitude: number
  static schema = {
    name: "Location",
    embedded: true,
    properties: {
      longitude: "float",
      latitude: "float",
    },
  }
}
class Qrcode {
  value: string
  static schema = {
    name: "Qrcode",
    embedded: true,
    properties: {
      value: "string",
    },
  }
}
const EmbedTypeList = [Qrcode, Location]

export default EmbedTypeList
