import { useState, useEffect } from "react"
import { useWindowDimensions } from "react-native"

import StringField from "#/components/field/StringField"
import { type ObjectFieldProps } from "#/type/props"
import styled from "styled-components/native"
import { StyledFlexRowView } from "#/components/styled/view"
import { StyledTextByAbsoluteSize } from "#/components/styled/text"

const getFontSize = (n: number) => n
const FirstRowView = styled(StyledFlexRowView)`
  width: 100%;
  border-bottom: 1px;
`
const NameFieldView = styled(StyledFlexRowView)<{ scale: number }>`
  margin-left: ${({ scale }) => 10 * scale};
  height: ${({ scale }) => 10 * scale};
`
const NameFieldText = styled(StyledTextByAbsoluteSize)<{ size: number }>``
const NameFieldExpandIcon = styled(StyledTextByAbsoluteSize)<{
  size: number
}>`
  color: white;
  text-align: center;
  font-weight: bold;
`
const ValueFieldRowView = styled(StyledFlexRowView)<{ scale: number }>`
  margin-left: ${({ scale }) => 10 * scale};
  height: ${({ scale }) => 10 * scale};
`
// Use style objects
const StyledView = styled.View((props) => ({
  borderWidth: "1px",
  borderColor: "black",
  borderRadius: "5px",
}))
const NameFieldExpandArea = styled.Pressable`
  justify-content: center;
  background-color: purple;
  aspect-ratio: 1;
`
/**
 * @todo display empty field
 * @example &lt;caption>Example usage of ObjectField component.&lt;/caption> 
 * // Simplest
 * <ObjectField
 *  value={{
          id: data.createdAt;
          "register time": "2022-04-19";
          location: {
            foo: "aa";
            bar: "bar"
          }
        }}
    
    style={{ 
      //Normally you will want the fieldView to take over the width
      width: "100%" }}
    //Other not essential prop
  />
   ``` }
 * 
 *  
 */
const ObjectField = (props: ObjectFieldProps) => {
  const { name, value, style } = props
  const [expanded, setExpanded] = useState(false)
  const { scale } = useWindowDimensions()

  /**
   * Develop purpose
   */
  useEffect(() => {
    console.group()
    console.log("******Start for in loop ObjectField******")
    for (const prop in value) {
      console.log(value[prop as keyof typeof value])
    }
    console.log("****************End**********************")
  }, [])
  return (
    <StyledView style={style}>
      <FirstRowView key={"field"}>
        <NameFieldView scale={scale}>
          <NameFieldText size={20 * scale}>{name}</NameFieldText>
        </NameFieldView>
        <NameFieldExpandArea
          onPress={() => {
            setExpanded(!expanded)
          }}
        >
          <NameFieldExpandIcon size={getFontSize(20)}>
            {expanded ? "v" : ">"}
          </NameFieldExpandIcon>
        </NameFieldExpandArea>
      </FirstRowView>
      <ValueFieldRowView scale={scale} key={"value"}>
        {expanded
          ? Object.entries(value).map(([key, val]) => {
              switch (typeof val) {
                case "string":
                  return <StringField key={key} name={key} value={val} />
                case "object":
                  return (
                    <ObjectField
                      name={key}
                      key={key}
                      value={val ? val : {}}
                      style={{ width: "100%" }}
                    />
                  )
                default:
                  return <StringField name={key} value={val} />
              }
            })
          : null}
      </ValueFieldRowView>
    </StyledView>
  )
}

export default ObjectField
