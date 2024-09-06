import { Text, View, useWindowDimensions } from "react-native"

import { FieldTextStyles } from "#/style/components/field.style"
import {
  StyledFlexItemView,
  StyledFlexColumnView,
  StyledFlexRowView,
} from "#/components/styled/view"
import styled from "styled-components/native"

const NameFieldView = styled(StyledFlexRowView)<{ scale: number }>`
  margin-left: ${({ scale }) => 10 * scale};
  height: ${({ scale }) => 10 * scale};
`
const ValueFieldView = styled(StyledFlexItemView)``

export default function DateField(props: {
  name: string
  value: string | undefined
}) {
  const { name, value } = props
  const { scale } = useWindowDimensions()
  return (
    <StyledFlexColumnView>
      <NameFieldView scale={scale}>
        <View
          style={{
            backgroundColor: "blue",
            width: 30,
            borderRadius: 5,
            height: "100%",
          }}
        />
        <Text style={FieldTextStyles.nameFieldText}>{name}</Text>
      </NameFieldView>
      <ValueFieldView>
        <Text style={FieldTextStyles.valueFieldText}>{value}</Text>
      </ValueFieldView>
    </StyledFlexColumnView>
  )
}
