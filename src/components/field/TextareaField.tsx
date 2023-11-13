import { Text, View, TextInput } from "react-native"
import { type TextAreaFieldProps } from "../../type/props"

import Dimension from "../../style/Dimensions"
import { FieldStyles } from "../../style/components/field.style"
import { StyledFlexColumnView } from "../styled/view"

// TODO empty field
const { getFontSize } = Dimension

const TextAreaField = (props: TextAreaFieldProps) => {
  const { name, value, numberOfLines } = props
  return (
    <StyledFlexColumnView>
      <View style={FieldStyles.nameFieldView}>
        <Text style={{ fontSize: getFontSize(20) }}>{name}</Text>
      </View>
      <View style={FieldStyles.valueFieldView}>
        <TextInput
          placeholder={`jdflkdsjfdsklfjdsklfjdsklfdsjfifsd 
            fjsdlkfjdsklfdsjfkds 
            sdfldsfds`}
          editable={false}
          placeholderTextColor="#003f5c"
          defaultValue={value}
          numberOfLines={numberOfLines}
        />
      </View>
    </StyledFlexColumnView>
  )
}
export default TextAreaField
