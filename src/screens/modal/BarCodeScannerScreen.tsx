import { useState, useEffect, useContext } from "react"
import {
  Text,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native"
import {
  type BarCodeScannedCallback,
  BarCodeScanner,
} from "expo-barcode-scanner"
import { useTranslation } from "react-i18next"
import { TouchableOpacity } from "react-native-gesture-handler"

import Dimensions from "../../style/Dimensions"
import {
  scanHistory,
  fetchUrlPrefix,
} from "../../utils/localStorageConfig.json"
import BottomToolbar from "../../components/BottomToolbar"

import { borderStyle, clgWrapper } from "../../__test__/helper"

import { queryParamsRegex } from "../../lib/infoFetch"
import { type RootStackBarCodeScreenProps } from "../../type/navigation"
import { useAsyncMapStorage } from "../../utils/localStorage"
import RealmContext from "../../realm/RealmContext"
import { useUser } from "@realm/react"
import DataContext from "../../context/DataContext"
import { RouteNameMain } from "../../navigation/const"

const { scale } = Dimensions
const { useRealm } = RealmContext

type Url = string
type CameraPermission = null | boolean

export default function BarCodeScannerScreen({
  navigation,
  route,
}: RootStackBarCodeScreenProps) {
  const [hasPermission, setHasPermission] = useState<CameraPermission>(null)
  const [scanned, setIsScanned] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const realm = useRealm()
  const user = useUser()
  let scanData = useContext(DataContext)
  // TODO the user login check

  const imageHistoryStorage = useAsyncMapStorage(`${scanHistory}-${user?.id}`)
  const scanHistoryStorage = useAsyncMapStorage(`${scanHistory}-${user?.id}`)
  const { t } = useTranslation("barcode")
  const { height } = useWindowDimensions()
  // const tabHeight = getTabBarHeight()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    })
    ;(async () => {
      // Ask permission
      await askPermissionAsync()
      if (route.params !== undefined) {
        await scanFromImageURLAsync(route.params.uri)
      }
    })().catch((error) => {
      throw error
    })
    const unsubscribeFocus = navigation.addListener("focus", () => {
      console.log("App focused")
      setIsFocused(true)
    })
    const unsubscribeBlur = navigation.addListener("blur", () => {
      console.log("App unfocused")
      setIsScanned(false)
      setIsFocused(false)
    })
    return () => {
      console.log("Attention: event unSub")
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
      if (scanResult.length === 0) {
        Alert.alert("QRCode doesn't contain valid data", "Message", [
          {
            text: "Cancel",
            onPress: () => {
              Alert.alert("Cancel Pressed")
            },
            style: "cancel",
          },
        ])
      } else {
        console.log(
          "This is the data from image",
          JSON.stringify(scanResult[0].data),
        )
        await imageHistoryStorage.addItem(url, url)
        // If the data just a string, type is raw
        let dataResult
        let type = "raw"
        if (
          scanResult[0].data.startsWith(fetchUrlPrefix) &&
          scanResult[0].data.split("?").length > 1
        ) {
          const { arg1, arg2, arg3 } = getQueryParams(scanResult[0].data)
          const realmQueryResult = realm
            .objects(arg1)
            .filter((item) => item[arg2] === arg3)
          switch (realmQueryResult.length) {
            case 1:
              dataResult = realmQueryResult[0]
              type = arg1
              scanData = {
                ...scanData,
                dataItem: JSON.stringify(realmQueryResult[0]),
              }
              break
            case 0:
              dataResult = "Can not get valid data from url"
              type = "raw"
              break
            default:
              dataResult = realmQueryResult.at(0)
              scanData = {
                ...scanData,
                dataItem: JSON.stringify(realmQueryResult[0]),
              }
              type = arg1
          }
          // TODO the type we need
          type = arg1
          console.log(JSON.stringify(scanData))
        } else {
          dataResult = scanResult[0].data
          console.log(
            `BarcodeScannerScreen line 140 ${JSON.stringify(dataResult)}`,
          )
        }
        navigation.navigate(RouteNameMain.modalResult, {
          data: dataResult,
          type,
        })
      }
    } catch (error) {
      switch (error?.code) {
        case "ERR_IMAGE_RETRIEVAL":
          Alert.alert("This image can not be retrieve")
          break
        default:
          Alert.alert("Unknown or no error.code")
      }
      throw new Error(error)
    }
  }
  const getQueryParams = (url: Url) => {
    const params = Object.create({})
    const match = queryParamsRegex.exec(url)
    if (match !== null) {
      params[match[1]] = match[2]
    }
    return params
  }

  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type: qrcodeType,
    data,
  }) => {
    setIsScanned(true)
    clgWrapper(`Bar code data ${qrcodeType} ` + data)
    const currentTimeStamp = new Date().getTime()
    let dataResult: string | unknown = data
    let type = "raw"
    scanData = { ...scanData, type: "raw", dataItem: dataResult }
    // If this was a system fetch uri
    // TODO split length could be bigger?
    if (
      typeof data === "string" &&
      data.startsWith(fetchUrlPrefix + "/schemaname_filter") &&
      data.split("?").length > 1
    ) {
      const { arg1, arg2, arg3 } = getQueryParams(data)
      const matchResult = realm
        .objects(arg1 as string)
        .filter((item) => item[arg2] === arg3)
        .at(0)
      console.log(`Match result ${JSON.stringify(matchResult)}`)
      // TODO the type we need
      type = arg1
      dataResult = matchResult ?? dataResult
      // new URLSearchParams(data.split("?")[1]).get("arg1")
    }

    ;(async () => {
      await scanHistoryStorage.addItem(
        currentTimeStamp.toString(),
        JSON.stringify({
          content: dataResult,
          createdAt: new Date(),
          id: currentTimeStamp.toString(),
          type,
        }),
      )
    })().catch((error) => {
      throw error
    })
    console.log(`BarcodeScannerScreen 130 ${JSON.stringify(dataResult)}`)

    // navigation.navigate(RouteNameMain["modalResult"], { data: dataResult, type })
  }

  switch (hasPermission) {
    case null:
      return (
        <Text style={{ fontSize: 6 * scale }}>
          {t("Requesting for camera permission")}
        </Text>
      )
    case false:
      return (
        <Text style={{ fontSize: 6 * scale }}>{t("No access to camera")}</Text>
      )
    default:
      return isFocused ? (
        <View
          style={[
            styles.container,
            {
              borderColor: "red",
              borderWidth: 4,
              height: height - 20,
              marginTop: 0,
            },
          ]}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ ...StyleSheet.absoluteFillObject, ...borderStyle }}
          />
          {scanned ? (
            <TouchableOpacity
              style={styles.hintText}
              onPress={() => {
                setIsScanned(false)
              }}
            >
              <Text style={{ fontSize: scale * 10 }}>
                {t("Tap to Scan Again")}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.hintText, { fontSize: 10 * scale }]}>
              {t("Put image to scan", { ns: "hint" }) +
                JSON.stringify(scanData.dataItem)}
            </Text>
          )}
          <Text style={[styles.hintText, { fontSize: 10 * scale }]}>
            {JSON.stringify(scanData.dataItem)}
          </Text>
          <BottomToolbar
            afterPickCallBack={scanFromImageURLAsync}
            style={{
              height: 50 * scale,
            }}
          />
        </View>
      ) : (
        <Text style={{ fontSize: scale * 20 }}>
          {t("This screen is unfocused, you should not see this")}
        </Text>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  hintText: {
    position: "relative",
    top: 60,
    textAlign: "center",
  },
})
