import React, { useEffect } from "react"
import {
  View,
  Pressable,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  Alert,
} from "react-native"
import Dimensions from "../style/Dimensions"
import * as ImagePicker from "expo-image-picker"
import { FloatToolbarProps } from "../type/props"
import { FontAwesomeIconWrapper } from "./Icon"
import { useTranslation } from "react-i18next"

const { getHeight, scale } = Dimensions
const styles = StyleSheet.create({
  floatToolBarContainer: {
    paddingHorizontal: "5%",
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
export default function BottomFloatToolbar({
  style,
  afterPickCallBack,
}: FloatToolbarProps) {
  const { scale: scaleHook, fontScale } = useWindowDimensions()
  const { t } = useTranslation()

  useEffect(() => {
    //alert(`Scale inside toolbar ${fontScale}`)
  }, [])
  const pickImage = async () => {
    if (Platform.OS === "web") {
      Alert.alert(
        "Error",
        t("Web platform doesn't support image pick function"),
      )
      return
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })
      if (result.canceled) return
      else {
        console.log("Result from image pick", result)
        if (result.assets.length === 0) {
          alert("Image pick result empty")
          throw new Error("Image pick result empty")
        }
        console.log(
          `The image pick assets result ${JSON.stringify(result.assets)}`,
        )
        //@ts-ignore
        afterPickCallBack(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    }
    console.log("The result is out")
  }
  return (
    <View
      style={[
        {
          backgroundColor: "white",
          padding: getHeight(5),
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
        },
        style,
      ]}
    >
      <Pressable style={{ flex: 1, alignItems: "center" }}>
        <FontAwesomeIconWrapper name="xing" size={20 * scale} />
      </Pressable>
      <Pressable style={{ flex: 1, alignItems: "center" }}>
        <FontAwesomeIconWrapper name="youtube-play" size={20 * scale} />
      </Pressable>
      <Pressable style={{ flex: 1, alignItems: "center" }} onPress={pickImage}>
        <FontAwesomeIconWrapper name="image" size={20 * scale} />
      </Pressable>
    </View>
  )
}
