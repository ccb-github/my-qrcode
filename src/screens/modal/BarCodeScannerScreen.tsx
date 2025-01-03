import React, { useState, useEffect, useContext } from "react"
import { Text, StyleSheet, Alert, useWindowDimensions } from "react-native"
import {
  type BarCodeScannedCallback,

} from "expo-barcode-scanner"
import { useTranslation } from "react-i18next"

import Dimensions from "#/style/Dimensions"
import {
  scanHistory,
  fetchUrlPrefix,
} from "#/utils/localStorage.config.json"
import { clgWrapper } from "#/__test__/helper"

import { queryParamsRegex } from "#/lib/infoFetch"
import { useAsyncMapStorage } from "#/utils/localStorage"
import RealmContext from "#/atlas-app-services/RealmContext"
import { useUser } from "@realm/react"
import DataContext from "#/context/DataContext"
import { RouteNameMain } from "#/navigation/const"
import styled from "styled-components/native"
import { StyledTextByAbsoluteSize } from "#/components/styled/text"
import { StyledFlexRowView } from "#/components/styled/view"
import BottomToolbar from "#/components/BottomToolbar"
import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import { MainStackScreenPropsBase } from "#/type/navigation"

const { scale } = Dimensions
const { useRealm } = RealmContext

type Url = string
type CameraPermission = null | boolean

const ScanAgainButton = styled.TouchableOpacity``
const UnFocusedText = styled(StyledTextByAbsoluteSize)``
const ContainerView = styled(StyledFlexRowView)<{ height: number }>`
  height: ${(props) => props.height - 20}px;
  margin-top: 0px;
`
const HintText = styled(StyledTextByAbsoluteSize)`
  position: relative;
  top: 60px;
  text-align: center;
`

export default function BarCodeScannerScreen({
  navigation,
  route,
}: MainStackScreenPropsBase<RouteNameMain.modalScanner>) {
  const [permission, requestPermission] = useCameraPermissions()
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

  

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    })
    ;(async () => {
      // Ask permission
      requestPermission
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



  const scanFromImageURLAsync = async (url: string) => {
    try {
      console.log("url provide by image" + url)
      const scanResult = await Camera.scanFromURLAsync(url)
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
      if (hasCertainProp<{ code: unknown }>(error, "code")) {
        switch (error?.code) {
          case "ERR_IMAGE_RETRIEVAL":
            Alert.alert("This image can not be retrieve")
            break
          default:
            Alert.alert("Unknown or no error.code")
        }
      }
      
      
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

  const handleBarcodeScanned: BarCodeScannedCallback = ({
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

  switch (permission) {
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
        <ContainerView height={height}>
          {/*<BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
            style={StyleSheet.absoluteFillObject}
             />*/
            }
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={StyleSheet.absoluteFillObject}
          /> 
          {scanned ? (
            <ScanAgainButton
              onPress={() => {
                setIsScanned(false)
              }}
            >
              <StyledTextByAbsoluteSize size={10 * scale}>
                {t("Tap to Scan Again")}
              </StyledTextByAbsoluteSize>
            </ScanAgainButton>
          ) : (
            <HintText size={10 * scale}>
              {t("Put image to scan", { ns: "hint" }) +
                JSON.stringify(scanData.dataItem)}
            </HintText>
          )}
          <BottomToolbar
            afterPickCallBack={scanFromImageURLAsync}
            style={{
              height: 50 * scale,
            }}
          />
        </ContainerView>
      ) : (
        <UnFocusedText size={scale * 20}>
          {t("This screen is unfocused, you should not see this")}
        </UnFocusedText>
      )
  }
}
