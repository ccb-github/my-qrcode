import { type OpaqueColorValue } from "react-native"
import styled from "styled-components/native"

export const FlexItemView = styled.View`
  flex: 1;
  align-items: center;
`
export const StyledSafeAreaView = styled.SafeAreaView<{
  backgroundColor?: OpaqueColorValue
  height?: CSSStyleValue
}>`
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor || "white"};
  height: ${(props) => props.height};
`
export const StyledFlexColumnView = styled.View<{
  flex?: string | number
}>`
  flex-direction: column;
  flex: ${(props) => props.flex ?? 1};
  align-items: "center";
  justify-content: "center";
`
export const StyledFlexRowView = styled.View<{ flex?: string | number }>`
  flex-direction: row;
  flex: ${(props) => props.flex ?? 1};
  align-items: "center";
  justify-content: "center";
`

export const StyledFlexRowTouchableOpacity = styled.TouchableOpacity<{ flex?: string | number }>`
  flex-direction: row;
  flex: ${(props) => props.flex ?? 1};
  align-items: "center";
  justify-content: "center";
`

export const StyledBigTextWithScale = styled.Text<{ scale: number }>`
  font-size: ${({ scale }) => scale * 20}px;
`
export const StyledTextByAbsoluteSize = styled.Text<{
  size: number
}>`
  font-size: ${({ size }) => size}px;
`
