import { StyleSheet } from "react-native"
import { Button as ButtonOri, type Props } from "react-native-paper"
type ButtonProps = {
  children: React.ReactNode
} & Props

export default function Button({ style, children, onPress }: ButtonProps) {
  return (
    <ButtonOri style={[style, buttonStyle.button]} onPress={onPress}>
      {children}
    </ButtonOri>
  )
}

const buttonStyle = StyleSheet.create({
  button: {},
})
