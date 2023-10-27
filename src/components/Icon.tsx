import { FontAwesome, AntDesign } from "@expo/vector-icons"
import { type TextStyle } from "react-native"

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function FontAwesomeIconWrapper(props: {
  size: number
  name: React.ComponentProps<typeof FontAwesome>["name"]
  style?: TextStyle
}) {
  const { style, size, name, ...otherProps } = props
  return (
    <FontAwesome
      name={name}
      size={size}
      style={{ ...props.style }}
      {...otherProps}
    />
  )
}

export function AntDesignIconWrapper(props: {
  name: React.ComponentProps<typeof AntDesign>["name"]
}) {
  return <AntDesign size={30} {...props} />
}
