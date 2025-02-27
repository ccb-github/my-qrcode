import { TextStyle, ViewStyle } from "react-native";

export function optionalStylePropToCssStyle (styleName: keyof ViewStyle | TextStyle, styleValue?: string | number){
  return styleValue === undefined ? "":`${styleName}: ${styleValue}`
}