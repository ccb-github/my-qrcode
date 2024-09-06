import { useTranslation } from "react-i18next"
import { Pressable, useColorScheme, Text } from "react-native"
import { Divider, List, TextInput } from "react-native-paper"
import * as WebBrowser from "expo-web-browser"
import { AntDesignIconWrapper } from "#/components/Icon"
import { SafeAreaView } from "react-native-safe-area-context"
import type { MainStackScreenPropsBase } from "#/type/navigation"
import { RouteNameMain } from "#/navigation/const"
import { useContext } from "react"
import DataContext from "#/context/DataContext"

export default function ResultScreen({
  navigation,
  route,
}: MainStackScreenPropsBase<RouteNameMain.modalResult>) {
  const { t } = useTranslation("result")
  const theme = useColorScheme()
  const { data, type } = route.params
  const resultData = useContext(DataContext)
  console.log(resultData)
  console.log(`Data result from resultScreen ${JSON.stringify(data)}`)
  // TODO PADDING
  const isDarkTheme = theme === "dark"
  const openInBrowser = async (url: string) => {
    const result = await WebBrowser.openBrowserAsync(url)
    console.log(result)
  }
  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        backgroundColor: isDarkTheme ? "black" : "white",
        paddingTop: 50,
      }}
    >
      <TextInput
        multiline={true}
        numberOfLines={7}
        spellCheck={false}
        value={typeof data === "string" ? data : JSON.stringify(data)}
      />
      <Text>
        {typeof resultData.dataItem === "string"
          ? resultData.dataItem
          : JSON.stringify(resultData.dataItem)}
      </Text>
      <Divider />
      <List.Item
        title={t("Open website")}
        right={() => (
          <Pressable
            disabled={typeof data === "string"}
            onPress={() => {
              ;(async () => {
                await openInBrowser(resultData.url!)
              })().catch((error) => {
                throw error
              })
            }}
          >
            <AntDesignIconWrapper name="chrome" />
          </Pressable>
        )}
      />
      <List.Item
        title={t("Go to detail screen")}
        right={() => (
          <Pressable
            onPress={() => {
              if (Array.isArray(data) ?? data)
                navigation.navigate(RouteNameMain.modalDetail, {
                  data,
                  type,
                })
            }}
          >
            <AntDesignIconWrapper name="arrowright" />
          </Pressable>
        )}
      ></List.Item>
    </SafeAreaView>
  )
}
