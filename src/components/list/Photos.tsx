import { useEffect } from "react";
import { Alert, TouchableOpacity, Image} from "react-native";
import Dimensions from "../../style/Dimensions";
import { useTranslation } from "react-i18next";

const {scale} = Dimensions

export default function Photos(
    props: {
    photos: Array<string>;
    parentNavi: (url: string) => void;
    onDelete: (uri: string) => Promise<void>
  }) {
    const imgWidth = Dimensions.get("screen").width * 0.33333;
    const { photos, parentNavi, onDelete } = props;
    const {} = useTranslation()
    useEffect(() => {
      console.log(scale)
      console.log("Photos inside RecordScreen", photos);
    });
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          paddingTop: 5 * scale,
        }}
      >
        {photos?.map((photoUri, index) => (
          <TouchableOpacity
            key={index}
            style={{
              borderWidth: 1,
              borderColor: "black",

              width: imgWidth,
              aspectRatio: 1,
            }}
            onLongPress={() => {
              Alert.alert("Delete this image history", "Are you sure", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Operation cenceled"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    onDelete(photoUri)
                  },
                  style: "destructive",
                },
              ]);
            }}
            onPress={() => {
              console.log(photoUri);
              parentNavi(photoUri);
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
          </TouchableOpacity>
        ))}
      </TouchableOpacity>
    );
  }