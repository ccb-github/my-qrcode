import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { Card } from "react-native-paper";
import { BaseFieldProps } from "../../type/props";

import Dimension from "../../style/Dimensions";


//TODO empty field 
const {getFontSize, getWidth, getHeight, scale} = Dimension
const ImageField = (props: BaseFieldProps) => {
	const {name, value} = props
	return (
    <View style={{ width: "100%", ...FieldStyles.container }}>
      <View style={FieldStyles.nameFieldView}>
        <Text style={FieldStyles.nameFieldText}>{name}</Text>
      </View>
      <View style={FieldStyles.valueFieldView}>
        <Card>
          <Card.Cover style={{aspectRatio: 1}}source={{ uri: value }} />
        </Card>
      </View>
    </View>
  );
}

export default ImageField

const FieldStyles = StyleSheet.create({
	container: {
		flexDirection: "column",
    margin: 5 * scale
	},

	nameFieldView: {
		flex: 2,
		fontWeight:"bold"
	},
	valueFieldView: {
		minHeight: getHeight(15)
	},
  nameFieldText: {
    fontSize: getFontSize(20)
  },
  valueFieldText: {
    fontSize: getFontSize(20)
  },
	status: {	
	  justifyContent: 'center',
		backgroundColor: "purple",
		aspectRatio: 1,
	}
})