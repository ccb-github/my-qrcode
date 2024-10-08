import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage"
import { useEffect, useRef, useState } from "react"
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native"
import { Divider, List } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

export default function AsyncStorageInspect() {
  const recordStorage = useAsyncStorage("records")
  const records = useRef([])
  const [refreshTime, setRefreshTime] = useState(0)
  const { scale } = useWindowDimensions()
  const allItem = useRef<readonly any[]>([])

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const allKeys = await AsyncStorage.getAllKeys()
      console.log("All keys in storage", allKeys)
      // await testHook.addItem(new Date().getTime().toString(), "file:///data/user/0/com.bioexpo.startwithmanaged/cache/ImagePicker/edfb4033-f6ab-4f28-8dc9-58f7e779310f.jpg");

      const allKeyValue = await AsyncStorage.multiGet(allKeys)

      allItem.current = allKeyValue
    })().catch((error) => {
      console.error(error)
    })
    recordStorage
      .getItem()
      .then((res) => {
        res !== null && (records.current = JSON.parse(res))
      })
      .catch((error) => {
        console.error(error)
      })
  })
  return (
    <SafeAreaView>
      <ScrollView style={{ flexDirection: "column" }}>
        <View
          style={{
            alignItems: "center",
            padding: 10 * scale,
            width: "100%",
          }}
        >
          <TouchableHighlight
            style={{ backgroundColor: "blue", borderRadius: 5, padding: 10 }}
            onPress={() => {
              setRefreshTime(refreshTime + 1)
            }}
          >
            <Text>Refresh</Text>
          </TouchableHighlight>
        </View>
        <View
          style={{
            alignItems: "center",
            padding: 10 * scale,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{ backgroundColor: "blue", borderRadius: 5, padding: 10 }}
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
          </TouchableOpacity>
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
