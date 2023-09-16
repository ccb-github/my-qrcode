import { useState, useEffect } from "react"
import { Text, View, StyleSheet, Alert } from "react-native"
import { type BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner"
import { useTranslation } from "react-i18next"
import { TouchableOpacity } from "react-native-gesture-handler"

import Dimensions from "../../style/Dimensions"
import { scanHistory, imageHistory, fetchUrlPrefix } from "../../utils/localStorageConfig.json"
import BottomFloatToolbar from "../../components/FloatToolbar"

import { borderStyle, clgWrapper } from "../../__test__/helper"

import { queryParamsregex } from "../../lib/infoFetch"
import { type RootStackBarCodeScreenProps } from "../../type/navigation"
import { useAsyncMapStorage } from "../../utils/localStorage"
import RealmContext from "../../realm/RealmContext"
import { useUser } from "@realm/react"

const { scale } = Dimensions
const { useRealm } = RealmContext

type Url = string
type CameraPermission = null | boolean

export default function BarCodeScannerScreen ({ navigation, route }: RootStackBarCodeScreenProps) {
  const [hasPermission, setHasPermission] = useState<CameraPermission>(null)
  const [scanned, setScanned] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const realm = useRealm()
  const user = useUser()
  // TODO the user login check
  const imageHistoryStorage = useAsyncMapStorage(`${scanHistory}-${user?.id}`)
  const scanHistoryStorage = useAsyncMapStorage(`${scanHistory}-${user?.id}`)
  const { t } = useTranslation("barcode")
  // const tabHeight = getTabBarHeight()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true
    });
    (async () => {
      // Ask permission
      await askPermissionAsync()
      if (route.params !== undefined) {
        await scanFromImageURLAsync(route.params.uri)
      }
    })().catch(error => {
      throw error
    })
    const unsubscribeFocus = navigation.addListener(
      "focus",
      () => {
        console.log("App focused")
        setIsFocused(true)
      }
    )
    const unsubscribeBlur = navigation.addListener(
      "blur",
      () => {
        console.log("App unfocused")
        setIsFocused(false)
      }
    )

    // For test purpose handleBarCodeScanned({
    //   type: "qrcode",
    //   data: "https://data.mongodb-api.com/app/application-qrcode-ukplu/endpoint/product?arg1=Product&arg2=assemblePlace&arg3=China"

    // })
    return () => {
      console.log("Attention: event unsub")
      unsubscribeBlur()
      unsubscribeFocus()
    }
  }, [])

  const askPermissionAsync = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    setHasPermission(status === "granted")
  }

  const scanFromImageURLAsync = async (url: string) => {
    try {
      console.log("url provide by image" + url)
      const scanResult = await BarCodeScanner.scanFromURLAsync(url)
      // scanResult.push({
      //   data: "https://data.mongodb-api.com/app/application-qrcode-ukplu/endpoint/product/?arg1=Product&arg2=name&arg3=Alpha",
      //   type: "",
      //   bounds: {
      //     origin: {
      //       x: 0,
      //       y: 0
      //     },
      //     size: {
      //       height: 0,
      //       width: 0
      //     }
      //   },
      //   cornerPoints: []
      // })
      if (scanResult.length === 0) {
        Alert.alert("QRCode doesn't contain valid data", "Message", [
          {
            text: "Cancel",
            onPress: () => { Alert.alert("Cancel Pressed") },
            style: "cancel"
          }
        ])
      } else {
        console.log("This is the data from image", JSON.stringify(scanResult[0].data))
        await imageHistoryStorage.addItem(url, url)
        // If the data just a string, type is raw
        let dataResult; let type = "raw"
        if (
          scanResult[0].data.startsWith(fetchUrlPrefix) &&
          scanResult[0].data.split("?").length > 1
        ) {
          const { arg1, arg2, arg3 } = getQueryParams(scanResult[0].data)
          const realmQueryResult = realm.objects(arg1).filter(item => item[arg2] === arg3)
          switch(realmQueryResult.length) {
            case 1:
              dataResult = realmQueryResult[0]
              type = arg1
              break
            case 0:
              dataResult = "Can not get valid data from url"
              type = "raw"
            default:
              dataResult = realmQueryResult
              type = arg1
          }
          // TODO the type we need
          type = arg1
        } else {
          dataResult = scanResult[0].data
          console.log(`BarcodescannerScreen 140 ${JSON.stringify(dataResult)}`)
        }
        navigation.navigate("Result", { data: dataResult, type })
      }
    } catch (error) {
      switch (error?.code) {
        case "ERR_IMAGE_RETRIEVAL":
          Alert.alert("This image can not be retrieve")
          break
        default:
          Alert.alert("Unkown or no error.code")
      }
      throw new Error(error)
    }
  }
  const getQueryParams = (url: Url) => {
    const params = Object.create({})
    let match
    while ((match = queryParamsregex.exec(url))) {
      params[match[1]] = match[2]
    }
    return params
  }

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setScanned(true)
    clgWrapper(`Bar code data ${type} ` + data)
    const currentTimeStamp = new Date().getTime()
    const dataResult = data
    // If this was a system fetch uri
    // TODO split length could be bigger?
    if (typeof data === "string" &&
        data.startsWith(fetchUrlPrefix + "/schemaname_filter") &&
        data.split("?").length > 1
    ) {
      const { arg1 } = getQueryParams(data)
      // const matchResult = realm.objects(arg1).filter( item => item["assemblePlace"] === arg3).at(0)
      // TODO the type we need
      type = arg1
      // new URLSearchParams(data.split("?")[1]).get("arg1")
    }

    (async () => {
      await scanHistoryStorage.addItem(currentTimeStamp.toString(), JSON.stringify({
        content: dataResult,
        createdAt: new Date(),
        id: currentTimeStamp.toString(),
        type
      }))
    })().catch(error => {
      throw error
    })
    console.log(`BarcodescannerScreen 130 ${dataResult}`)

    navigation.navigate("Detail", { data: dataResult, type })
  }
  switch (hasPermission) {
    case null:
      return <Text style={{ fontSize: 6 * scale }}>{t("Requesting for camera permission")}</Text>
    case false:
      return <Text style={{ fontSize: 6 * scale }}>{t("No access to camera")}</Text>
    default:
      return isFocused
        ? (
        <View style={[styles.container, { marginTop: 20 * scale }]}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ ...StyleSheet.absoluteFillObject, ...borderStyle }}
          />
          {scanned
            ? (
            <TouchableOpacity
              style={styles.hintText}
              onPress={() => { setScanned(false) }}
            >
              <Text style={{ fontSize: scale * 10 }}>
                {t("Tap to Scan Again")}
              </Text>
            </TouchableOpacity>
              )
            : (
            <Text style={[styles.hintText, { fontSize: 10 * scale }]}>{t("Put image to scan", { ns: "hint" })}</Text>
              )}
          <BottomFloatToolbar
            afterPickCallBack={scanFromImageURLAsync}
            style={{ ...styles.bottomToolBar, height: 30 * scale }}
          />
        </View>
          )
        : (
        <Text style={{ fontSize: scale * 20 }}>
          {t("This screen is unfocused, you should not see this")}
        </Text>
          )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  cameraContainer: {
    flex: 1
  },
  bottomToolBar: {
    width: "100%",
  },
  hintText: {
    position: "relative",
    top: 40,

    textAlign: "center"
  }
})
