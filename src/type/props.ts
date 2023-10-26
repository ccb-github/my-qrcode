import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { type CompositeScreenProps } from "@react-navigation/native"
import { type StackScreenProps } from "@react-navigation/stack"
import { type TextStyle, type ViewStyle } from "react-native/types"
import { type RootTabParamList, type MainStackParamList } from "./navigation"
import { type FontAwesome, type AntDesign } from "@expo/vector-icons"
import { type RouteNameMain } from "../navigation/const"

// TODO move all props type to this file
export type RootTabScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, RouteNameMain.tab>,
  StackScreenProps<MainStackParamList>
>

export type RootStackDetailScreenProps = StackScreenProps<
  MainStackParamList,
  RouteNameMain.modalDetail
>

export type DetailScreenProps<DetailDataType> = {
  data: DetailDataType
}

export type FloatToolbarProps = {
  style?: ViewStyle
  afterPickCallBack?: (imageUri: string) => any
}
export type DetailViewProps<DataType> = {
  data: DataType
  linkAction: (linkedData: unknown) => void
  scale: number
}

/**
 * Icon props
 */
export type AntDesignIconWrapperProps = {
  name: React.ComponentProps<typeof AntDesign>["name"]
  style?: TextStyle
}

export type FontAwesomeIconWrapperProps = {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  style?: TextStyle
}

/** FieldView */
export type BaseFieldProps = {
  name: string
  value: string | undefined
  style?: ViewStyle
  textStyle?: TextStyle
}

export type TextAreaFieldProps = {
  numberOfLines: number
} & BaseFieldProps

export type LinkObjectFieldProps<Value = string> = {
  name: string
  value: Value
  valueNameKey: string
  type: string
  onPressAction: (routeData: any) => void
} & BaseFieldProps
