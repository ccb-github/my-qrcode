import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView, useWindowDimensions } from "react-native";
import { Divider, List } from "react-native-paper";
import { useAsyncMapStorage } from "../../utils/localStorage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AsyncStorageInspect() {
  const recordStorage = useAsyncStorage("records")
  const records = useRef([])
  const [refreshTime, setRefreshTime] = useState(0)
  const { scale } = useWindowDimensions()
  const allItem = useRef<readonly any[]>([])

  useEffect(() => {
    (async () => {
      const allKeys = await AsyncStorage.getAllKeys()
      console.log("Allkeys in storage",allKeys)
      //await testHook.addItem(new Date().getTime().toString(), "file:///data/user/0/com.bioexpo.startwithmanaged/cache/ImagePicker/edfb4033-f6ab-4f28-8dc9-58f7e779310f.jpg");
      
      const allKeyValue = await AsyncStorage.multiGet(allKeys)
      
      allItem.current = allKeyValue
    })()
    recordStorage.getItem()
      .then(
        res => {
          res !== null || (records.current = JSON.parse(res))}
      )
  })
  return (
    <SafeAreaView>
      <ScrollView style={{ flexDirection: "column" }}>
        <View
          style={{
            alignItems: "center",
            padding: 10 * scale,
            width: "100%",
            backgroundColor: "blue",
          }}
        >
          <Pressable
            style={{ backgroundColor: "blue" }}
            onPress={() => {
              setRefreshTime(refreshTime + 1)
            }}
          >
            <Text>Refresh</Text>
          </Pressable>
        </View>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "red",
            padding: 10 * scale,
            height: 40,
            width: "100%",
          }}
        >
          <Pressable
            onPress={() => {
              AsyncStorage.clear()
                .then((res) => {
                  console.log(res)
                })
                .catch((error) => {
                  throw error
                })
            }}
          >
            <Text>Clear</Text>
          </Pressable>
        </View>
        <List.Section title={"All item in storage"}>
          {allItem.current?.map((item) => (
            <View key={item[0]} style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "red",
                  minWidth: scale * 10,
                }}
              >
                {item[0]}
              </Text>

              <Text style={{ overflow: "scroll", backgroundColor: "yellow" }}>
                {item[1]}
              </Text>
              <Divider style={{ height: 5 }} />
            </View>
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  )
}
