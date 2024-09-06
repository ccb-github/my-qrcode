import { FontAwesome, AntDesign } from "@expo/vector-icons"
import { type TextStyle } from "react-native"

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const FontAwesomeIconWrapper: React.FC<{
  iconSize: number
  name: React.ComponentProps<typeof FontAwesome>["name"]
  style?: TextStyle
}> = (props) => {
  const { style, iconSize, name, ...otherProps } = props
  return (
    <FontAwesome
      name={name}
      size={iconSize}
      style={{ ...props.style }}
      {...otherProps}
    />
  )
}


const AntDesignIconWrapper: React.FC = (props: {
  name: React.ComponentProps<typeof AntDesign>["name"]
  iconSize: number
  style?: TextStyle
}) => {
  return <AntDesign size={props.iconSize} style={{ ...props.style }}{...props} />
}

export { FontAwesomeIconWrapper, AntDesignIconWrapper}