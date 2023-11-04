import styled from "styled-components/native"

export const FlexItemView = styled.View`
  flex: 1;
  align-items: center;
`
export const StyledSafeAreaView = styled.SafeAreaView<{
  backgroundColor?: string
  height?: number
}>`
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor ?? "white"};
  height: ${(props) => props.height}px;
`
export const StyledFlexColumnView = styled.View<{
  flex?: string | number
}>`
  flex-direction: column;
  /* flex: ${(props) => props.flex ?? 1}; */
  align-items: center;
  justify-content: center;
`
export const StyledFlexRowView = styled.View<{ flex?: string | number }>`
  flex-direction: row;
  flex: ${(props) => props.flex ?? 1};
  align-items: center;
  justify-content: center;
`

export const StyledFlexRowTouchableOpacity = styled.TouchableOpacity<{
  flex?: string | number
}>`
  flex-direction: row;
  flex: ${(props) => props.flex ?? 1};
  align-items: center;
  justify-content: center;
`
