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
import { FieldStyles } from "../../style/components/field.style";


//TODO empty field 
const {getFontSize, getWidth, getHeight, scale} = Dimension

const UrlField = (props: BaseFieldProps) => {
	const {name, value} = props
	const { scale: scaleHook } = useWindowDimensions()
	if(scale === scaleHook) {
		Alert.alert(`The scale ${scale} and scaleHook ${scaleHook} in urlfield`)
	}
	return (
	  <View style={[FieldStyles.container, {height: 10 * scale}]}>
			<View style={FieldStyles.nameFieldView}>
				<Text style={{fontSize: getFontSize(20)}}>
				{name}
				</Text>
			</View>
			<View style={FieldStyles.valueFieldView}>
				<Text style={{fontSize: getFontSize(20)}}>
					{value}
				</Text>
			</View>
	  </View>
	)
}
export default UrlField

