import { Alert } from "react-native";
import { RouteNameMain } from "../navigation/const";


export const  queryParamsregex = /[?&]([^=#]+)=([^&#]*)/g




export const fetchFromEndpoint = async (endpointUrl: string) => {
    
    const endpointResult = await fetch(
      endpointUrl,
      {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   collectionName: "Product",
        //   fieldName: "name",
        //   fieldValue: "Product a",
        // }),
      }
    )
      .then((res) => {
        console.log("The middle result");
        if (res.ok) {
          return res ? res.json() : res;
        }
        //TODO specific this errorres.text ? res.text
        else{
          
          return (`Fetch failed with status ${res.status}`);
        }
      })
      .then((finalRes) => {
        console.log("Final", finalRes);
        return finalRes
        //navigation.navigate(RouteNameMain["modalDetail"], finalRes);
      })
      .catch((error) => {
        Alert.alert(error.message ? error.message : "No specific error message provided")
        console.log(error.message ? error.message : "No specific message")
      });
      return endpointResult
  }