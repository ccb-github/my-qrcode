import { Alert } from "react-native"

export const queryParamsRegex = /[?&]([^=#]+)=([^&#]*)/g

export const fetchFromEndpoint = async (endpointUrl: string) => {
  const endpointResult = await fetch(endpointUrl, {
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
  })
    .then(async (res) => {
      console.log("The middle result")
      if (res.ok) {
        return await res.json()
      }
      // TODO specific this error like res.text ? res.text
      else {
        return `Fetch failed with status ${res.status}`
      }
    })
    .then((finalRes) => {
      console.log("Final", finalRes)
      return finalRes
      // navigation.navigate(RouteNameMain["modalDetail"], finalRes);
    })
    .catch((error) => {
      Alert.alert(
        typeof error.message === "string"
          ? error.message
          : "No specific error message provided",
      )
      console.log(
        typeof error.message === "string"
          ? error.message
          : "No specific error message provided",
      )
    })
  return endpointResult
}
