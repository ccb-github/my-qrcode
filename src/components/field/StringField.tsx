import { useEffect } from "react"
import { Text, View, useWindowDimensions } from "react-native"
import { type BaseFieldProps } from "#/type/props"

import {
  FieldStyles,
  FieldTextStyles,
} from "#/style/components/field.style"
import { StyledFlexColumnView } from "#/components/styled/view"

const StringField = (props: BaseFieldProps) => {
  const { name, value, style } = props
  const { scale } = useWindowDimensions()

  useEffect(() => {})
  return (
    <StyledFlexColumnView style={style}>
      <View style={[FieldStyles.nameFieldView, { height: 20 * scale }]}>
        <View
          style={{
            backgroundColor: "blue",
            width: 30,
            borderRadius: 5,
            height: "100%",
          }}
        />
        <Text style={FieldTextStyles.nameFieldText}>{name}</Text>
      </View>
      <View>
        <Text style={FieldTextStyles.valueFieldText}>{value}</Text>
      </View>
    </StyledFlexColumnView>
  )
}
export default StringField
