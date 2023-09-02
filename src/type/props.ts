import { type BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { type CompositeScreenProps } from "@react-navigation/native";
import { type StackScreenProps } from "@react-navigation/stack";
import { type TextStyle, type ViewStyle } from "react-native/types"
import { type RootTabParamList, type RootStackParamList } from "./navigation";
import { type FontAwesome, type AntDesign } from "@expo/vector-icons"

// TODO move all props type to this file
export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  StackScreenProps<RootStackParamList>
  >

export interface DetailScreenProps<DetailDataType> {
  data: DetailDataType
}

export interface FloatToolbarProps {
  style?: ViewStyle
  afterPickCallBack?: (imageUri: string) => any
}

/**
 * Icon props
 */
export interface AntDesignIconWrapperProps {
  name: React.ComponentProps<typeof AntDesign>["name"]
  style?: TextStyle
}

export interface FontAwesomeIconWrapperProps {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  style?: TextStyle
}

/** FieldView */
export interface BaseFieldProps {
  name: string
  value: string | undefined
  style?: ViewStyle
  textStyle?: TextStyle
}

export interface TextAreaFieldProps extends BaseFieldProps {
  numberOfLines: number
}

export interface LinkObjectFieldProps extends BaseFieldProps {
  name: string
  value: any
  valueNameKey: string
  type: string
  onPressAction: (routeData: any) => void
}
