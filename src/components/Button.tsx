import { TextStyle, ViewStyle, StyleSheet } from "react-native";
import { Button as ButtonOri, Text } from "react-native-paper";

export default function Button(
 {
  style,
  textStyle,
  onPress,
  children
 }:{ 
  textStyle?: TextStyle
  style?: ViewStyle
  onPress: (url: any) => any
  children: React.ReactNode
}) {
  return(
    <ButtonOri style={[style, buttonStyle.button]}>
      {children}
    </ButtonOri>
  )
}

const buttonStyle = StyleSheet.create({
  button: {
    
  }

})