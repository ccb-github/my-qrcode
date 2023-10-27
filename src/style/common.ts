import type { ViewStyle, TextStyle } from "react-native"
import colors from "./colors"
type StyleFunction = (
  option: Record<string, string | boolean | number | undefined | null>,
) => ViewStyle | TextStyle
// type StyleFuncObject = {
// 	[key: string]: StyleFunction
// }
// const commonStyles = StyleSheet.create({
// 	//Style for one whole screen
// 	screen: {
// 		flex: 1,
// 	}
// })

const screenStyleByTheme: StyleFunction = ({
  colorTheme,
}: {
  colorTheme: "light" | "dark"
}) => ({
  flex: 1,
  backgroundColor: colorTheme === "dark" ? colors.black : colors.white,
})

const hintTextBySize: StyleFunction = ({ size }: { size: number }) => ({
  fontWeight: "bold",
  fontSize: size,
  textAlign: "center",
})

export { screenStyleByTheme, hintTextBySize }
