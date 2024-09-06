import styled from "styled-components/native"
import { type ScaleStyledProps } from "#/style/common"

export const StyledBigTextWithScale = styled.Text<{ scale: number }>`
  font-size: ${({ scale }) => scale * 20}px;
`
export const StyledTextByAbsoluteSize = styled.Text<{
  size: number
}>`
  font-size: ${({ size }) => size}px;
`

export const HintText = styled(StyledTextByAbsoluteSize)<ScaleStyledProps>`
  font-weight: bold;
  font-size: ${({ size }) => size}px;
  text-align: center;
`
