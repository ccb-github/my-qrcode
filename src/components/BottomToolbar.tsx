import {
  Platform,
  useWindowDimensions,
  Alert,
  type ViewStyle,
  type GestureResponderEvent,
} from "react-native"

import Dimensions from "../style/Dimensions"
import { type FontAwesome } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { type FloatToolbarProps } from "../type/props"
import { FontAwesomeIconWrapper } from "./Icon"
import { useTranslation } from "react-i18next"
import { type PropsWithChildren, useEffect } from "react"
import styled from "styled-components/native"

const { scale } = Dimensions

const BottomToolbarView = styled.View`
  background-color: "white";
  position: absolute;
  padding: ${5 * scale}px;
  width: 100%;
  bottom: 0;
  flex-direction: "row";
`
const ToolbarIconView = styled.Pressable`
  flex: 1;
  align-items: center;
`
const ToolbarIcon = ({
  scale,
  iconName,
  style,
  onPress,
}: PropsWithChildren<{
  scale: number
  iconName: React.ComponentProps<typeof FontAwesome>["name"]
  onPress?: (event: GestureResponderEvent) => void
  style?: ViewStyle
}>) => (
  <ToolbarIconView
    style={{ flex: 1, alignItems: "center", ...style }}
    onPress={onPress}
  >
    <FontAwesomeIconWrapper name={iconName} size={20 * scale} />
  </ToolbarIconView>
)

export default function BottomToolbar({
  style,
  afterPickCallBack: afterPickCallBackProp,
}: FloatToolbarProps) {
  useWindowDimensions()
  const { t } = useTranslation()
  const afterPickCallBack = afterPickCallBackProp ?? (() => {})
  const pickImage = () => {
    if (Platform.OS === "web") {
      Alert.alert(
        "Error",
        t("Web platform doesn't support image pick function"),
      )
      return
    }
    ;(async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })
      if (result.canceled) return "Cancelled"
      else {
        console.log("Result from image pick", result)
        if (result.assets.length === 0) {
          alert("Image pick result empty")
          throw new Error("Image pick result empty")
        }
        console.log(
          `The image pick assets result ${JSON.stringify(result.assets)}`,
        )
        afterPickCallBack(result.assets[0].uri)
      }
    })().catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    console.log("This view rendered")
  }, [])
  return (
    <BottomToolbarView>
      <ToolbarIcon scale={scale} iconName="xing" />
      <ToolbarIcon scale={scale} iconName={"youtube-play"} />
      <ToolbarIcon scale={scale} iconName={"image"} onPress={pickImage} />
    </BottomToolbarView>
  )
}
