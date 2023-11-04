import styled from "styled-components/native";

export const StyledBigTextWithScale = styled.Text<{ scale: number }>`
  font-size: ${({ scale }) => scale * 20}px;
`
export const StyledTextByAbsoluteSize = styled.Text<{
  size: number
}>`
  font-size: ${({ size }) => size}px;
`
