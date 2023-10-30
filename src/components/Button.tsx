import {
  Button as ButtonOri,
  type ButtonProps as PaperButtonProps,
} from "react-native-paper"
import styled from "styled-components/native"

type ButtonProps = {
  children: React.ReactNode
} & PaperButtonProps

// export default function Button({ style, children, onPress }: ButtonProps) {
//   return (
//     <ButtonOri style={[style, buttonStyle.button]} onPress={onPress}>
//       {children}
//     </ButtonOri>
//   )
// }

const Button = styled(ButtonOri)<ButtonProps>`
  color: #00ff00;
`

export default Button
