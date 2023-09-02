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
  useWindowDimensions
} from "react-native";
import { Button, Card, Divider } from "react-native-paper";
import { BaseFieldProps } from "../../type/props";

import Dimension from "../../style/Dimensions";
import { getTabBarHeight } from "@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar";
import { FieldStyles, FieldTextStyles } from "../../style/components/field.style";



//TODO empty field 
const {getFontSize, getWidth, getHeight, scale} = Dimension

const StringField = (props: BaseFieldProps) => {
	const { name, value, style } = props
  const { scale: scaleHook } = useWindowDimensions()
  if(scale !== scaleHook) {
		Alert.alert(`The scale ${scale} and scaleHook ${scaleHook} in urlfield`)
	}
  useEffect(() => {
    
  })
  return (
	  <View style={{ ...FieldStyles.container, ...style}}>
      <View style={[FieldStyles.nameFieldView, { height: 20 * scale}]}>
				<View style={{backgroundColor:"blue", width: 30, borderRadius: 5, height : "100%"}}/>
        <Text style={[FieldTextStyles.nameFieldText]}>
          {name}
        </Text>
      </View>
      <View>
        <Text style={[FieldTextStyles.valueFieldText]}>
          {value || null}
        </Text>
      </View>
      
	  </View>
	)
}
export default StringField


