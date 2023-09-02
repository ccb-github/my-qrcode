import { useTranslation } from "react-i18next"
import { Pressable, useColorScheme } from "react-native"
import { Divider, List, TextInput } from "react-native-paper"
import * as WebBrowser from "expo-web-browser"
import { AntDesignIconWrapper } from "../../components/Icon"
import { SafeAreaView } from "react-native-safe-area-context"
import type {
  RootStackResultScreenProps
} from "../../type/navigation"
import { RouteNameMain } from "../../navigation/const"

export default function ResultScreen ({
  navigation,
  route
}: RootStackResultScreenProps) {
  const { t } = useTranslation("home")
  const theme = useColorScheme()
  const { data, type } = route.params
  console.log(`Data result from resultscreen ${data}`)
  // TODO PADDING
  const isDarkTheme = theme === "dark"
  const openInBrowser = async () => {
    const result = WebBrowser.openBrowserAsync(data)
    console.log(result)
  }
  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        backgroundColor: isDarkTheme ? "black" : "white",
        paddingTop: 50
      }}
    >
      <TextInput
        multiline={true}
        numberOfLines={7}
        spellCheck={false}
        value={typeof data === "string" ? data : JSON.stringify(data)}
      />
      <Divider />
      <List.Item
        title={t("Open website")}
        right={() => (
          <Pressable
            onPress={ () => {
              try {
                void openInBrowser()
              } catch (error) {
                throw error
              }
            }}
          >
            <AntDesignIconWrapper name="arrowsalt" />
          </Pressable>
        )}
      />
      <List.Item
        title={t("Go to detail screen")}
        right={() => (
          <Pressable
            onPress={() => {
              navigation.navigate(RouteNameMain.modalDetail, {
                data,
                type
              })
            }}
          >
            <AntDesignIconWrapper name="arrowsalt" />
          </Pressable>
        )}
      ></List.Item>
    </SafeAreaView>
  )
}
