import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { type CompositeScreenProps } from "@react-navigation/native"
import { type StackScreenProps } from "@react-navigation/stack"
import { type TextStyle, type ViewStyle } from "react-native/types"

import { type FontAwesome, type AntDesign } from "@expo/vector-icons"
import { type RouteNameMain } from "#/navigation/const"
import { MainStackParamList, RootTabParamList, } from "#/type/navigation"

// TODO move all props type to this file
export type RootTabSettingScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, "TabThree">,
  StackScreenProps<MainStackParamList>
>
export type RootTabHomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, "TabOne">,
  StackScreenProps<MainStackParamList>
>

export type RootTabProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, "TabTwo">,
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
  afterPickCallBack?: (imageUri: string) => void
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
export type BaseFieldProps<ValueType = string> = {
  name: string
  value: ValueType
  style?: ViewStyle
  textStyle?: TextStyle
}

export type TextAreaFieldProps = {
  numberOfLines: number
} & BaseFieldProps

export type ObjectFieldProps = {
  name: string
  value: Record<string, unknown>
  style: ViewStyle
}
export type LinkObjectFieldProps<
  ValueType,
  DisplayKey extends keyof ValueType,
> = {
  name: string
  valueAccessor: DisplayKey
  type: string
  onPressAction: (routeData: any) => void
} & BaseFieldProps<ValueType>

/**
 * End of the props for fieldView
 */
