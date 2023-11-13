import { View, Text, useWindowDimensions } from "react-native"
import { Entypo } from "@expo/vector-icons"

export default function InfoItem({
  name,
  value,
}: {
  name: string
  value: string
}) {
  const { scale } = useWindowDimensions()
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Entypo name="email" size={30 * scale} style={{ padding: 10 }} />
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Text>name</Text>
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize: 10 * scale }}>{"Data"}</Text>
      </View>
    </View>
  )
}
