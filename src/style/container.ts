import { ViewStyle } from "react-native/types"

export function CenterFlexContainer(direction: ViewStyle["flexDirection"]) {
  return {
    flexDirection: direction,
    alignItems: "center",
    justifyContent: "center",
  };
}