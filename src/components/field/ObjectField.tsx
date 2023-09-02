
import { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ViewStyle
} from "react-native";

import Dimension from "../../style/Dimensions";

import StringField from "./StringField";

//TODO empty field 
const {getFontSize, getWidth, getHeight, scale} = Dimension


/**
 * 
 * Example usage 
 * <ObjectField
 *  value={{
          id: data.createdAt,
          "register time": "2022-04-19",
          location: {
            foo: "aa",
            bar: "bar"
          }
        }}
    
    style={{ 
      //Normally you will want the fieldview to take over the width
      width: "100%" }}
    //Other not essential prop
  />
 * 
 *  
 */  
const ObjectField = (props: { name: any; value: any; style: ViewStyle }) => {
  const { name, value, style } = props;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    console.group()
    console.log("******Start for in loop ObjectField******");
    for (let prop in value) {
      console.log(value[prop]);
    }
    console.log("****************End**********************");
  }, []);
  return (
    <View style={[style, {borderWidth: 1, borderColor: "black", borderRadius: 5}]}>
      <View
        key={"field"}
        style={[ObjectFieldStyles.firstRow]}
      >
        <View style={ObjectFieldStyles.nameFieldView}>
          <Text style={ObjectFieldStyles.nameFieldText}>{name}</Text>
        </View>
        <Pressable
          onPress={() => {
            setExpanded(!expanded);
          }}
          style={[ObjectFieldStyles.status]}
        >
          <Text
            style={[ObjectFieldStyles.textExpandIcon, ObjectFieldStyles.valueFieldText]}
          >
            {expanded ? "v" : ">"}
          </Text>
        </Pressable>
      </View>
      <View
        key={"value"}
        style={[
          ObjectFieldStyles.fieldRow,
          { marginLeft: getWidth(10), height: 10 * scale },
        ]}
      >
        {expanded
          ? Object.keys(value).map((key) => {
              console.log("Strong sign", typeof value[key]);
              switch (typeof value[key]) {
                case "string":
                  console.log(`String branch`);
                  return (
                    <StringField key={key} name={key} value={value[key]} />
                  );
                case "object":
                  console.log(`Object branch`);
                  return (
                    <ObjectField
                      name={key}
                      key={key}
                      value={value[key]}
                      style={{ width: "100%" }}
                    />
                  );
                default:
                  console.log(`Default branch`);
                  return (
                    <StringField name={key} value={value[key]} />
                  );
              }
            })
          : null}
      </View>
    </View>
  );
};



const ObjectFieldStyles = StyleSheet.create({
	container: {
		flexDirection: "column",
    margin: 5 * scale
	},
	nameFieldView: {
		flex: 2,
		fontWeight:"bold"
	},
	valueFieldView: {
		
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
	},
	textExpandIcon: {
		color: "white",
		textAlign: 'center',
		fontWeight: 'bold',
	},

  /*This style is for object field */
  firstRow: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		borderBottomWidth: 1,
	},
	fieldRow:{
		flex: 1,
		flexDirection: "column",	
	},
	expandWidget: {
		flexDirection: "column",
	},
})

  

export default ObjectField