import { View, TouchableOpacity, Text } from "react-native"
import { type LinkObjectFieldProps } from "../../type/props"
import { FieldStyles } from "../../style/components/field.style"
import fonts from "../../style/fonts"

export default function LinkObjectField<Value extends Exclude<object, null>>(
  props: LinkObjectFieldProps<Value>,
) {
  const { name, value, onPressAction, type } = props
  return (
    <View style={FieldStyles.container}>
      <View style={FieldStyles.nameFieldView}>
        <Text style={{ fontSize: fonts.nameText, fontWeight: "bold" }}>
          {name}
        </Text>
      </View>
      <View style={FieldStyles.valueFieldView}>
        <TouchableOpacity
          onPress={() => {
            onPressAction({ ...value, type })
          }}
        >
          <Text style={[{ fontSize: fonts.valueText }, { color: "blue" }]}>
            {value?.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
