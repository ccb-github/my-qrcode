/* eslint-disable no-useless-catch */
import AsyncStorageStatic, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage"
import { useCallback, useEffect } from "react"

const useAsyncMapStorage = (key: string) => {
  const storageHook = useAsyncStorage(key)
  let storageMapKeys: string[]

  // const getItem = storage.getItem
  const getMapKeys = useCallback(async () => {
    try {
      const result = await storageHook.getItem()
      if (result === null) {
        throw new Error("Unexpected error mapkey null")
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
      if (storageMapKeys === undefined) {
        beforeKey = await getMapKeys()
      } else {
        beforeKey = storageMapKeys
      }
      storageMapKeys = [...beforeKey, key]
      await storageHook.setItem(JSON.stringify(storageMapKeys))
    } catch (error) {
      throw error
    }
  }
  const getMapItem = async (valueType: "string" | "object" = "string") => {
    // TODO determine array
    try {
      storageMapKeys = storageMapKeys ?? (await getMapKeys())
      console.log(`getMapitem for key ${JSON.stringify(storageMapKeys)}`)
      const storageMapKeyValuePair =
        await AsyncStorageStatic.multiGet(storageMapKeys)
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
      if (storageMapKeys === undefined) beforeKeyList = await getMapKeys()
      else beforeKeyList = storageMapKeys
      storageMapKeys = beforeKeyList.filter((beforeKey) => key !== beforeKey)
      await storageHook.setItem(JSON.stringify(storageMapKeys))
    } catch (error) {
      throw error
    }
  }
  useEffect(() => {
    try {
      ;(async () => {
        const currentItem = await storageHook.getItem()
        // TODO critical determine json parseable
        if (currentItem === null) {
          storageMapKeys = []
          await storageHook.setItem("[]")
        } else {
          storageMapKeys = JSON.parse(currentItem)
        }

        // else if(typeof storageItem.length === 'number')
        //   {
        //   console.log('This is executed', storageItem)
        //   storageItem = JSON.parse(storageItem)}
      })().catch((error) => {
        // TODO catch json parse error
        throw new Error(error)
      })
    } catch (error) {
      throw new Error(error)
    }
  }, [])
  return {
    storageMapKeys,
    getMapKey: getMapKeys,
    addItem,
    removeOneItem,
    getMapItem,
  }
}

export { useAsyncMapStorage }
