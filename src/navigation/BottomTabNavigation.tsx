import React, { useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Pressable, Text} from "react-native";
import { AntDesign } from "@expo/vector-icons"
import { useTranslation } from "react-i18next";

import { RootTabParamList,  IconSetting } from "../type/navigation";


import { Avatar } from "react-native-paper";
import { FontAwesomeIconWrapper } from "../components/Icon";
import Dimension from "../style/Dimensions";

import SettingScreen from "../screens/tab/SettingScreen";
import ProfileScreen from "../screens/tab/ProfileScreen";
import HomeScreen    from "../screens/tab/HomeScreen";
import { RouteNameMain } from "./const";
import RecordScreen from "../screens/modal/RecordScreen";
const { getFontSize, getWidth } = Dimension

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to 
 * switch screens.https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
//@ts-ignore
export default function BottomTabNavigator({route}) {
  const {t}= useTranslation("title")
  const {initialRouteName} = route.params || { initialRouteName: undefined}
  
  
  return (
    <BottomTab.Navigator
      initialRouteName={initialRouteName ? initialRouteName: "TabOne"}
      screenOptions={{
        tabBarActiveTintColor: "yellow",
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        //@ts-ignore
        options={({ navigation }) => ({
          
          title: t("Homee"),
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesomeIconWrapper
              name={IconSetting["TabOne"].TabBarIcon}
              size={getWidth(10)}
              style={
                {color: color
              }}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate(RouteNameMain["modalScanner"]);
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesomeIconWrapper 
                name="camera-retro" 
                size={getWidth(10)}
              />
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
            <AntDesign 
              name="setting" 
              size={getWidth(10)} 
              color={color} 
            />
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
            <AntDesign 
              name="setting"  
              size={getWidth(10)} 
              color={color} 
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
  


  