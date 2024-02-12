/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import type { StackScreenProps } from "@react-navigation/stack"
import type { ParamListBase } from "@react-navigation/routers"
import { type RouteNameLogin, type RouteNameMain } from "../navigation/const"
import { type NavigatorScreenParams } from "@react-navigation/native"

declare global {
  namespace ReactNavigation {
    /** This is because we can not use declaration merge with 'type alias' */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface RootParamList extends MainStackParamList {}
  }
}



export const TabScreenNameList = ["TabOne", "TabTwo", "TabThree"] as const
export type RootTabParamList = {
  TabOne: undefined | Record<string, unknown>
  TabTwo: undefined
  TabThree: undefined
} & ParamListBase &
  Record<(typeof TabScreenNameList)[number], unknown>

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MainStackParamList = {
  Home: undefined
  Detail: { data: unknown; type: string }
  Setting: undefined
  Result: { data: unknown; type: string }
  Scanner: { uri: string } | undefined
  Record: undefined
  Tab: NavigatorScreenParams<RootTabParamList>
} & ParamListBase

export type LoginStackParamList = {
  Login: undefined
  SignUp: undefined
  Reset: { email: string } | undefined
} & ParamListBase

export type RootStackBarCodeScreenProps = StackScreenProps<
  MainStackParamList,
  RouteNameMain.modalScanner
>

export type RootStackResultScreenProps = StackScreenProps<
  MainStackParamList,
  RouteNameMain.modalResult
>

export type LoginStackLoginScreenProps = StackScreenProps<
  LoginStackParamList,
  RouteNameLogin.login
>

export type MainStackResultProps = StackScreenProps<
  MainStackParamList,
  RouteNameMain.modalResult
>

export type MainStackTabNavigatorProps = StackScreenProps<
  MainStackParamList,
  RouteNameMain.tab
>

export type LoginStackRegisterScreenProps = StackScreenProps<
  LoginStackParamList,
  RouteNameLogin.register
>

export type LoginStackResetPasswordScreenProps = StackScreenProps<
  LoginStackParamList,
  RouteNameLogin.resetPassword
>
