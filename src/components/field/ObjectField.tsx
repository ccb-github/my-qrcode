import { useState, useEffect } from "react"
import { StyleSheet, Pressable, useWindowDimensions } from "react-native"

import StringField from "./StringField"
import { type ObjectFieldProps } from "../../type/props"
import styled from "styled-components/native"
import { StyledFlexRowView } from "../styled/view"
import { StyledTextByAbsoluteSize } from "../styled/text"

const getFontSize = (n: number) => n
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
  const StyledView = styled.View((props) => ({
    borderWidth: "1px",
    borderColor: "black",
    borderRadius: "5px",
  }))
  useEffect(() => {
    console.group()
    console.log("******Start for in loop ObjectField******")
    for (const prop in value) {
      console.log(value[prop])
    }
    console.log("****************End**********************")
  }, [])
  return (
    <StyledView
      style={style}
    >
      <FirstRowView key={"field"}>
        <NameFieldView scale={scale}>
          <NameFieldText size={20 * scale}>{name}</NameFieldText>
        </NameFieldView>
        <Pressable
          onPress={() => {
            setExpanded(!expanded)
          }}
          style={ObjectFieldStyles.status}
        >
          <NameFieldExpandIcon size={getFontSize(20)}>
            {expanded ? "v" : ">"}
          </NameFieldExpandIcon>
        </Pressable>
      </FirstRowView>
      <ValueFieldRowView scale={scale} key={"value"}>
        {expanded
          ? Object.keys(value).map((key) => {
              switch (typeof value[key]) {
                case "string":
                  return <StringField key={key} name={key} value={value[key]} />
                case "object":
                  return (
                    <ObjectField
                      name={key}
                      key={key}
                      value={value[key]}
                      style={{ width: "100%" }}
                    />
                  )
                default:
                  return <StringField name={key} value={value[key]} />
              }
            })
          : null}
      </ValueFieldRowView>
    </StyledView>
  )
}

const ObjectFieldStyles = StyleSheet.create({
  status: {
    justifyContent: "center",
    backgroundColor: "purple",
    aspectRatio: 1,
  },
})

export default ObjectField
