import { Text, View, useWindowDimensions } from "react-native"
import { type BaseFieldProps } from "#/type/props"

import Dimension from "#/style/Dimensions"
import { FieldStyles } from "#/style/components/field.style"

// TODO empty field
const { getFontSize } = Dimension

const UrlField = (props: BaseFieldProps) => {
  const { name, value } = props
  const { scale } = useWindowDimensions()

  return (
    <View style={[FieldStyles.container, { height: 10 * scale }]}>
      <View style={FieldStyles.nameFieldView}>
        <Text style={{ fontSize: getFontSize(20) }}>{name}</Text>
      </View>
      <View style={FieldStyles.valueFieldView}>
        <Text style={{ fontSize: getFontSize(20) }}>{value}</Text>
      </View>
    </View>
  )
}
export default UrlField
