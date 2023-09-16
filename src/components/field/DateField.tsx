import {
  Text,
  View,
  Alert,
  useWindowDimensions
} from "react-native"

import Dimension from "../../style/Dimensions"
import { FieldStyles, FieldTextStyles } from "../../style/components/field.style"

// TODO empty field
const { scale } = Dimension

const DateField = (props: { name: string, value: string | undefined }) => {
  const { name, value } = props
  const { scale: scaleHook } = useWindowDimensions()
  if (scale === scaleHook) {
    Alert.alert(`The scale ${scale} and scaleHook ${scaleHook} in urlfield`)
  }
  return (
    <View style={FieldStyles.container}>

      <View style={FieldStyles.nameFieldView}>
        <View style={{ backgroundColor: "blue", width: 30, borderRadius: 5, height: "100%" }}/>
        <Text style={FieldTextStyles.nameFieldText}>{name}</Text>
      </View>
      <View style={FieldStyles.valueFieldView}>
        <Text style={FieldTextStyles.valueFieldText}>{value}</Text>
      </View>
    </View>
  )
}

export default DateField
