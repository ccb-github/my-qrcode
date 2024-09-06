import { useWindowDimensions } from "react-native"
import { Card } from "react-native-paper"
import { type BaseFieldProps } from "#/type/props"

import styled from "styled-components/native"
import {
  StyledFlexColumnView,
  StyledFlexItemView,
  StyledFlexRowView,
} from "#/components/styled/view"
import type { ScaleStyledProps } from "#/style/common"
import { StyledTextByAbsoluteSize } from "#/components/styled/text"
import { useTranslation } from "react-i18next"

const ImageFieldContainer = styled(StyledFlexColumnView)<ScaleStyledProps>`
  width: 100%;
  margin: ${({ scale }) => 10 * scale}px;
`
const NameFieldView = styled(StyledFlexRowView)<{ scale: number }>`
  margin-left: ${({ scale }) => 10 * scale}px;
  height: ${({ scale }) => 10 * scale}px;
`
const ValueFieldView = styled(StyledFlexItemView)`
  background-color: #f00;
`

export default function ImageField(props: BaseFieldProps) {
  const { name, value } = props
  const { scale } = useWindowDimensions()
  const { t } = useTranslation()
  return (
    <ImageFieldContainer scale={scale}>
      <NameFieldView scale={scale}>
        <StyledTextByAbsoluteSize size={20 * scale}>
          {t(name)}
        </StyledTextByAbsoluteSize>
      </NameFieldView>
      <ValueFieldView>
        <Card>
          <Card.Cover style={{ aspectRatio: 1 }} source={{ uri: value }} />
        </Card>
      </ValueFieldView>
    </ImageFieldContainer>
  )
}
