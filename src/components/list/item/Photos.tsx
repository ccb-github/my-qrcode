import { useEffect } from "react"
import { Alert, Image, useWindowDimensions } from "react-native"
import styled from "styled-components/native"

const PhotoView = styled.TouchableOpacity<{ width: number }>`
  border-width: 1;
  border-color: #000;
  width: ${(props) => props.width}px;
`
const TouchablePhotoContainer = styled.TouchableOpacity<{ scale: number }>`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding-top: ${({ scale }) => 5 * scale}px;
`

export default function Photos(props: {
  photos: string[]
  navigateAction: (url: string) => void
  onDelete: (uri: string) => Promise<void>
}) {
  const { width, scale } = useWindowDimensions()
  const imgWidth = width * 0.33333
  const { photos, navigateAction, onDelete } = props
  useEffect(() => {
    console.log("Photos inside RecordScreen", photos)
  })
  return (
    <TouchablePhotoContainer scale={scale}>
      {photos?.map((photoUri, index) => (
        <PhotoView
          key={index}
          width={imgWidth}
          style={{
            aspectRatio: 1,
          }}
          onLongPress={() => {
            Alert.alert("Delete this image history", "Are you sure", [
              {
                text: "Cancel",
                onPress: () => {
                  console.log("Operation canceled")
                },
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  onDelete(photoUri).catch((error) => {
                    throw error
                  })
                },
                style: "destructive",
              },
            ])
          }}
          onPress={() => {
            console.log(photoUri)
            navigateAction(photoUri)
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{
              uri: photoUri,
            }}
          />
        </PhotoView>
      ))}
    </TouchablePhotoContainer>
  )
}
