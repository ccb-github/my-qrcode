import { createStackNavigator } from "@react-navigation/stack"
import { Pressable, Text } from "react-native"
import BottomTabNavigator from "./BottomTabNavigator"
import RegisterScreen from "../screens/login/RegisterScreen"
import LoginScreen from "../screens/login/LoginScreen"
import DetailScreen from "../screens/modal/DetailScreen"
import BarCodeScannerScreen from "../screens/modal/BarCodeScannerScreen"
import ResetPasswordScreen from "../screens/login/ResetPasswordScreen"
import RecordScreen from "../screens/modal/RecordScreen"
import ResultScreen from "../screens/modal/ResultScreen"
import { useEffect } from "react"
import {
  imageHistory as imageHistoryKey,
  scanHistory as scanRecordKey,
} from "../utils/localStorageConfig.json"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { RouteNameLogin, RouteNameMain } from "./const"
import RealmContext from "../realm/RealmContext"
import FigmaSampleScreen from "../screens/FigmaSampleScreen"
import AsyncStorageInspect from "../screens/__test__/AsyncStorageInspect"
import { useTranslation } from "react-i18next"
import { useUser } from "@realm/react"
const { useRealm } = RealmContext

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal  options={{headerShown: false}}
 */
type LoginNavigationProps = {
  initialRouteName?: string
}
const Stack = createStackNavigator()
export function LoginNavigation(
  props: LoginNavigationProps = { initialRouteName: "Login" },
) {
  const { initialRouteName } = props
  console.log("LoginNavigation body")
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name={RouteNameLogin.login} component={LoginScreen} />
      <Stack.Screen name={RouteNameLogin.register} component={RegisterScreen} />
      <Stack.Screen
        name={RouteNameLogin.resetPassword}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  )
}

export function MainNavigation() {
  console.log("MainNavigation body")
  const user = useUser()
  const imageHistoryStorage = useAsyncStorage(
    `${imageHistoryKey}-${user?.id ?? "NULL-id"}`,
  )
  const recordHistoryStorage = useAsyncStorage(
    `${scanRecordKey}-${user?.id ?? "NULL-id"}`,
  )
  const { t } = useTranslation("title")
  const realm = useRealm()
  useEffect(() => {
    console.log(realm.path)
    ;(async () => {
      const imageHistory = await imageHistoryStorage.getItem()
      const recordHistory = await recordHistoryStorage.getItem()
      console.log("Index navigation", { imageHistory }, { recordHistory })
      // 初始化记录方便使用 Initialize the storage content if haven't
      if (imageHistory === null) {
        await imageHistoryStorage.setItem("[]")
      }
      if (recordHistory === null) {
        await recordHistoryStorage.setItem("[]")
      }
    })().catch((error) => {
      throw error
    })
  }, [])
  return (
    <Stack.Navigator initialRouteName={"Tab"}>
      <Stack.Screen
        name={RouteNameMain.tab}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          title: t("Records"),
        }}
        name={"Record"}
        component={RecordScreen}
      />
      <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
        <Stack.Screen name={"FigmaTest"} component={FigmaSampleScreen} />
        <Stack.Screen
          name={RouteNameMain.storageInspect}
          component={AsyncStorageInspect}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name={RouteNameMain.modalDetail}
          component={DetailScreen}
        />

        <Stack.Screen
          name={RouteNameMain.modalScanner}
          component={BarCodeScannerScreen}
          options={({ navigation }) => ({
            headerRight: () => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate(RouteNameMain.record)
                  }}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <Text>History</Text>
                </Pressable>
              )
            },
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name={RouteNameMain.modalResult}
          component={ResultScreen}
          options={({ navigation }) => ({
            headerRight: () => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("Tab")
                  }}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <Text>History</Text>
                </Pressable>
              )
            },
            headerTransparent: true,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
