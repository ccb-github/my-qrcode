/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import type { StackScreenProps } from "@react-navigation/stack"
import type { ParamListBase } from "@react-navigation/routers"
import { type RouteNameMain } from "../navigation/const"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = StackScreenProps<
RootStackParamList,
Screen
>

export interface RootTabParamList {
  TabOne: { height: number }
  TabTwo: undefined
  TabThree: undefined
}

export const TabScreenNameList = ["TabOne", "TabTwo", "TabThree"]

export interface RootStackParamList extends ParamListBase {
  Home: undefined
  Detail: { data: any, type: string }
  Setting: undefined
  Result: { data: any, type: string }
  Scanner: { uri: string }
  Record: undefined
}

export type RootStackBarCodeScreenProps = StackScreenProps<
RootStackParamList,
RouteNameMain.modalScanner
>

export type RootStackResultScreenProps = StackScreenProps<
RootStackParamList,
RouteNameMain.modalResult
>

export type ResultScreenStackProps = StackScreenProps<RootStackParamList, RouteNameMain.modalResult>

enum TabOne {
  ToolBar = "What",
  TabBarIcon = "history",
}

enum TabTwo {
  ToolBar = "anchor",
  TabBarIcon = "anchor",
}

export const IconSetting = {
  TabOne,
  TabTwo
}
