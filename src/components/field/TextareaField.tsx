import {
  Text,
  View,
  TextInput} from "react-native";
import { TextAreaFieldProps } from "../../type/props";

import Dimension from "../../style/Dimensions";
import { FieldStyles } from "../../style/components/field.style";


//TODO empty field 
const {getFontSize, scale} = Dimension

const TextAreaField = (props: TextAreaFieldProps) => {
	const {name, value, numberOfLines} = props
	return (
	  <View style={[{flexDirection: "column"}]}>
      <View style={FieldStyles.nameFieldView}>
        <Text style={{fontSize: getFontSize(20)}}>
        {name}
        </Text>
      </View>
      <View style={FieldStyles.valueFieldView}>
        <TextInput    
          placeholder={"jdflkdsjfdsklfjdsklfjdsklfdsjfifsd fjsdlkfjdsklfdsjfkds\n sdfldsfds"}
          editable={false}
          placeholderTextColor="#003f5c"
          defaultValue={value}
          numberOfLines={numberOfLines}
        />
      </View>
	  </View>
	)
}
export default TextAreaField

