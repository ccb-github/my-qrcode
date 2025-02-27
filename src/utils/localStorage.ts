/* eslint-disable no-useless-catch */
import AsyncStorageStatic, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage"
import { useCallback, useEffect } from "react"


/**
 * 
 * @param key 
 * @returns 
 * @description directKey => [key1, key2, key3]  
 *                             |     |      |   
 *                v     v      v  
 * value1 value2 value3       
*/       
const useAsyncMapStorage = (key: string) => {
  const middleKeyStorage = useAsyncStorage(key)
  let middleKeys: string[] = []

  // const getItem = storage.getItem
  const getMapKeys = useCallback<() => Promise<string[]>>(async () => {
    try {
      const result = await middleKeyStorage.getItem()
      if (result === null) {
        throw new Error("Unexpected error map key null")
      }
      return JSON.parse(result) 
    } catch (error) {
      throw error
    }
  }, [])
  const addItem = async (key: string, value: string) => {
    try {
      await AsyncStorageStatic.setItem(key, value)
      let beforeKey
      if (middleKeys === undefined) {
        beforeKey = await getMapKeys()
      } else {
        beforeKey = middleKeys
      }
      middleKeys = [...beforeKey, key]
      await middleKeyStorage.setItem(JSON.stringify(middleKeys))
    } catch (error) {
      throw error
    }
  }
  const getMapItem = async (valueType: "string" | "object" = "string") => {
    // TODO determine array
    try {
      middleKeys = middleKeys ?? (await getMapKeys())
      console.log(`getMapItem for key ${JSON.stringify(middleKeys)}`)
      const storageMapKeyValuePair =
        await AsyncStorageStatic.multiGet(middleKeys)
      return storageMapKeyValuePair.map((keyValue) => keyValue[1])
    } catch (error) {
      throw error
    }
  }
  /**
   * Remove one item in the storage map
   *
   */
  const removeOneItem = async (key: string) => {
    try {
      await AsyncStorageStatic.removeItem(key)
      // TODO Critical remove the related key storageItem
      let beforeKeyList: string[]
      if (middleKeys === undefined) beforeKeyList = await getMapKeys()
      else beforeKeyList = middleKeys
      middleKeys = beforeKeyList.filter((beforeKey) => key !== beforeKey)
      await middleKeyStorage.setItem(JSON.stringify(middleKeys))
    } catch (error) {
      throw error
    }
  }
  useEffect(() => {
    try {
      ;(async () => {
        const currentItem = await middleKeyStorage.getItem()
        // TODO critical determine json parsable
        if (currentItem === null) {
          await middleKeyStorage.setItem("[]")
        } else {
          middleKeys = JSON.parse(currentItem)
        }
      })().catch((error) => {
        // TODO catch json parse error
        throw new Error(error)
      })
    } catch (error) {
      if(hasMessageProp(error)) {
        throw new Error(error.message)
      }
    }
  }, [])
  return {
    getMapKeys,
    addItem,
    removeOneItem,
    getMapItem,
  }
}

export { useAsyncMapStorage }
