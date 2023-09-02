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
import ImageField from "./ImageField";
import { FieldStyles, FieldTextStyles } from "../../style/components/field.style";

//TODO empty field 
const {scale} = Dimension

const DateField = (props: { name: string; value: string | undefined }) => {
  const { name, value } = props;
  const { scale: scaleHook } = useWindowDimensions()
  if(scale === scaleHook) {
		Alert.alert(`The scale ${scale} and scaleHook ${scaleHook} in urlfield`)
	}
  return (
    <View style={FieldStyles.container}>
      
      <View style={FieldStyles.nameFieldView}>
        <View style={{backgroundColor:"blue", width: 30, borderRadius: 5, height : "100%"}}/>
        <Text style={FieldTextStyles.nameFieldText}>{name}</Text>
      </View>
      <View style={FieldStyles.valueFieldView}>
        <Text style={FieldTextStyles.valueFieldText}>{"Date value"}</Text>
      </View>
    </View>
  );
};

export default DateField

