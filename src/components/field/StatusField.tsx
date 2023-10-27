import { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Touchable,
  TouchableOpacity,
  ViewStyle,
  TextInput,
  Alert,
  useWindowDimensions,
} from "react-native"
import { Button, Card, Divider } from "react-native-paper"
import { BaseFieldProps } from "../../type/props"

import Dimension from "../../style/Dimensions"
import { getTabBarHeight } from "@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar"
import {
  FieldStyles,
  FieldTextStyles,
} from "../../style/components/field.style"
import StringField from "./StringField"

const StatusField = (props: BaseFieldProps) => {
  return <StringField {...props} />
}
export default StatusField
