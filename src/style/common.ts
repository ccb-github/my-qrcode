import type { ViewStyle, TextStyle } from "react-native"
import colors from "#/style/colors"
type StyleFunction = (
  option: Record<string, string>
) => ViewStyle | TextStyle

const screenStyleByTheme: StyleFunction = ({
  colorTheme,
}: {
  colorTheme: "light" | "dark"
}) => ({
  flex: 1,
  backgroundColor: colorTheme === "dark" ? colors.black : colors.white,
})

export type ScaleStyledProps = {
  scale: number
}

export { screenStyleByTheme }
