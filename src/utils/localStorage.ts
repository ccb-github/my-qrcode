/* eslint-disable no-useless-catch */
import  AsyncStorageStatic,{ useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';


const useAsyncMapStorage = (key: string) => {
  const storageHook = useAsyncStorage(key)
  const [result, setResult] = useState("")
  let storageMapKey: string[] | undefined
 
  // const getItem = storage.getItem
  const getMapKey = useCallback(async () => {
    try {
      const result = await storageHook.getItem();
      return JSON.parse(result);
    } catch (error) {
      throw error
    }
  }, [])
  const addItem = async (key: string, value: string) => {
    try {
      await AsyncStorageStatic.setItem(key, value)
      let beforeKey
      if(storageMapKey === undefined)
        beforeKey = await getMapKey()
      else
        beforeKey = storageMapKey
      storageMapKey = [...beforeKey, key]
      storageHook.setItem(JSON.stringify(storageMapKey))
    } catch (error) {
      
    }
  }
  const getMapItem = async (valueType: "string" | "object" = "string") => {
    // TODO determine array
    try {
      storageMapKey = storageMapKey || (await getMapKey())
      console.log(`getMapitem ${storageMapKey}`)
      const storageMapKeyValuePair = await AsyncStorageStatic.multiGet(
        storageMapKey
      )
      return storageMapKeyValuePair.map((keyValue) =>
        valueType === "string" ? keyValue[1] : JSON.parse(keyValue[1])
      )
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
      //TODO Critical remove the related key storageItem
      let beforeKeyList: string[]
      if (storageMapKey === undefined)
        beforeKeyList = await getMapKey()
      else
        beforeKeyList = storageMapKey
      storageMapKey = beforeKeyList.filter( beforeKey => key !== beforeKey)
      return await storageHook.setItem(JSON.stringify(storageMapKey))
    } catch (error) {
      throw error
    }
  }
  useEffect(() => {
    try {
      (async () => {
        const currentItem = await storageHook.getItem()
        // TODO critical determine json parseable
        if(currentItem === null){
          storageMapKey = []
          await storageHook.setItem("[]") 
        }
        else {
          storageMapKey = JSON.parse(currentItem)
        }

        // else if(typeof storageItem.length === 'number')
        //   {
        //   console.log('This is executed', storageItem)
        //   storageItem = JSON.parse(storageItem)}
      })()
    } catch (error) {
      throw new Error(error) 
    }
  }, [])
  return {
    storageMapKey,
    getMapKey,
    addItem,
    removeOneItem,
    getMapItem
  }
}

export {
  useAsyncMapStorage
}

