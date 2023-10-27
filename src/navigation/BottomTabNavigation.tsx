import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Pressable } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"

import {
  type MainStackTabNavigatorProps,
  type RootTabParamList,
} from "../type/navigation"

import { Avatar } from "react-native-paper"
import { FontAwesomeIconWrapper } from "../components/Icon"
import Dimension from "../style/Dimensions"

import SettingScreen from "../screens/tab/SettingScreen"
import ProfileScreen from "../screens/tab/ProfileScreen"
import HomeScreen from "../screens/tab/HomeScreen"
import { IconSetting, RouteNameMain, TabNavigationScreenOptions } from "./const"

const { getWidth } = Dimension

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to
 * switch screens.https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

export default function BottomTabNavigator({
  route,
}: MainStackTabNavigatorProps) {
  const { t } = useTranslation("title")
  // const { initialRouteName } = route.params
  const initialRouteName = "TabOne"
  return (
    <BottomTab.Navigator
      initialRouteName={initialRouteName || "TabOne"}
      screenOptions={TabNavigationScreenOptions}
    >
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: t("Home"),
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIconWrapper
              name={IconSetting.TabOne.TabBarIcon}
              size={getWidth(10)}
              style={{ color }}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate(RouteNameMain.modalScanner)
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesomeIconWrapper name="camera-retro" size={getWidth(10)} />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={ProfileScreen}
        options={{
          title: t("profile"),
          headerRight: () => (
            <Pressable
              onPress={() => {}}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Avatar.Text size={getWidth(10)} label="XD" />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={getWidth(10)} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={SettingScreen}
        options={{
          title: t("Setting"),
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => {}}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}
          //   >
          //     <Text>History</Text>
          //   </Pressable>
          // ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={getWidth(10)} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
