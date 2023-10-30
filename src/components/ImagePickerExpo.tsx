import { useEffect, useState } from "react"
import { Platform, StyleSheet, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
type ImagePickerExpoProps = {
  style: any
  afterPick?: (result: string) => any
  uri?: string
}
export function ImagePickerExpo(props: ImagePickerExpoProps) {
  const { style, afterPick, uri } = props
  const [image, setImage] = useState(uri ?? null)
  useEffect(() => {
    console.log("The uri", uri)
  }, [])

  const pickImage = async () => {
    if (Platform.OS === "web") {
      alert("Web platform does not have camera")
      return
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })
      if (result.canceled) {
        return
      } else {
        console.log("URI from image", result)
        setImage(result.uri)
        if (typeof afterPick === "function") afterPick(result.uri)
      }
    } catch (error) {
      console.log(error)
    }
    console.log("The result is out")
  }

  return (
    <Image
      source={{
        uri: image ?? undefined,
      }}
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    // Default image picker background color black
    backgroundColor: "red",
  },
})
