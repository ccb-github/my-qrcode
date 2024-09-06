import { createStackNavigator } from "@react-navigation/stack"
import { useEffect } from "react"
import { Pressable, Text } from "react-native"

import BottomTabNavigator from "#/navigation/BottomTabNavigator"
import RegisterScreen from "#/screens/login/RegisterScreen"
import LoginScreen from "#/screens/login/LoginScreen"
import DetailScreen from "#/screens/modal/DetailScreen"
import BarCodeScannerScreen from "#/screens/modal/BarCodeScannerScreen"
import ResetPasswordScreen from "#/screens/login/ResetPasswordScreen"
import RecordScreen from "#/screens/modal/RecordScreen"
import ResultScreen from "#/screens/modal/ResultScreen"
import FigmaSampleScreen from "#/screens/FigmaSampleScreen"
import AsyncStorageInspect from "#/screens/__test__/AsyncStorageInspect"

import {
  imageHistory as imageHistoryKey,
  scanHistory as scanRecordKey,
} from "#/utils/localStorage.config.json"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { RouteNameLogin, RouteNameMain } from "#/navigation/const"

import { useTranslation } from "react-i18next"
import type { LoginStackParamList, MainStackParamList } from "#/type/navigation"
import { useUser } from "@realm/react"
import RealmContext from "#/realm/RealmContext"
import realmApp from "#/realm/app"

type LoginNavigationProps = {
  initialRouteName?: string
}


const MainStack = createStackNavigator<MainStackParamList>()
const LoginStack = createStackNavigator<LoginStackParamList>()

export function LoginStackNavigation(
  props: LoginNavigationProps = { initialRouteName: "Login" },
) {
  const { initialRouteName } = props
  console.log("LoginNavigation body")
  return (
    <LoginStack.Navigator initialRouteName={initialRouteName}>
      <LoginStack.Screen name={RouteNameLogin.login} component={LoginScreen} />
      <LoginStack.Screen
        name={RouteNameLogin.register}
        component={RegisterScreen}
      />
      <LoginStack.Screen
        name={RouteNameLogin.resetPassword}
        component={ResetPasswordScreen}
      />
    </LoginStack.Navigator>
  )
}

export function MainStackNavigation() {
  console.log("MainNavigation body")
  const user = useUser()
  const imageHistoryStorage = useAsyncStorage(
    `${imageHistoryKey}-${user?.id ?? "NULL-id"}`,
  )
  const recordHistoryStorage = useAsyncStorage(
    `${scanRecordKey}-${user?.id ?? "NULL-id"}`,
  )
  const { t } = useTranslation("title")

  useEffect(() => {
    ;(async () => {
    
      const imageHistorys = await imageHistoryStorage.getItem()
      const recordHistorys = await recordHistoryStorage.getItem()
      console.log(imageHistorys, recordHistorys)
      /**
       * @description Initialize the storage in app Navigation initialize
       * for avoid dealing with empty record later
       */
      if (imageHistorys === null) {
        await imageHistoryStorage.setItem("[]")
      }
      /**
       * @description Initialize the storage in app Navigation initialize
       * for avoid dealing with empty record later
       */
      if (recordHistorys === null) {
        await recordHistoryStorage.setItem("[]")
      }
    })().catch((error) => {
      throw error
    })
  }, [])
  return (
    <MainStack.Navigator initialRouteName={"Tab"}>
      <MainStack.Screen
        name={RouteNameMain.tab}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        options={{
          title: t("Records"),
        }}
        name={RouteNameMain.record}
        component={RecordScreen}
      />
      <MainStack.Group screenOptions={{ presentation: "modal" }}>
        <MainStack.Screen name={"FigmaTest"} component={FigmaSampleScreen} />
        <MainStack.Screen
          name={RouteNameMain.storageInspect}
          options={{
            title: t("Storage"),
          }}
          component={AsyncStorageInspect}
        />
      </MainStack.Group>
      {/**
       * A modal stack screen is often used for displaying modals on top of all other content.
       * https://reactnavigation.org/docs/modal  options={{headerShown: false}}
       */}
      <MainStack.Group screenOptions={{ presentation: "modal" }}>
        <MainStack.Screen
          name={RouteNameMain.modalDetail}
          component={DetailScreen}
        />

        <MainStack.Screen
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
        <MainStack.Screen
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
      </MainStack.Group>
    </MainStack.Navigator>
  )
}
