import { useCallback, useEffect, useRef, useState } from "react"
import { Alert, Text, View } from "react-native"
import { useTranslation } from "react-i18next"

import { type StackScreenProps } from "@react-navigation/stack"
import { RecordList } from "../../components/list/RecordList"
import { RouteNameMain } from "../../navigation/const"
import type { MainStackParamList } from "../../type/navigation"
import RealmContext from "../../realm/RealmContext"
import Dimensions from "../../style/Dimensions"
import {
  imageHistory as imageHistoryKey,
  scanHistory as scanRecordKey,
} from "../../utils/localStorageConfig.json"

import Photos from "../../components/list/Photos"
import { type ScanRecord } from "../../type/data"
import { useUser } from "@realm/react"
import { useAsyncMapStorage } from "../../utils/localStorage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import styled from "styled-components/native"

const { scale } = Dimensions

// interface EmptyIndicationProps {
//   pressAction: () => void
// }
const { useRealm } = RealmContext

/* interface PageSelectorProps {
  numberOfPages: number
  setPagenumber: (num: number) => void
} */

type RecordScreenStackProps = StackScreenProps<
  MainStackParamList,
  RouteNameMain.record
>
type TopTabBarButtonProps = {
  scale: number
  contentView: "list" | "image"
  currentView: "list" | "image"
}
const TopTabBarButton = styled.TouchableOpacity<TopTabBarButtonProps>`
  flex: 1;
  align-items: center;
  border-bottom-color: #000;
  padding-top: ${(props) => 10 * props.scale};
  padding-bottom: ${(props) => 10 * props.scale};
  border-bottom-width: ${(props) =>
    props.contentView === props.currentView ? 2 : 0};
`
const ButtonText = styled.Text<{ $scale: number }>`
  font-family: "SSRegular";
  font-size: ${(props) => 10 * props.$scale};
`
export default function RecordScreen({ navigation }: RecordScreenStackProps) {
  const [contentView, setContentView] = useState<"list" | "image">("list")
  const [loading, setLoading] = useState(true)
  const recordHistory = useRef<ScanRecord[]>([])
  const imageHistory = useRef([])

  const realm = useRealm()
  const user = useUser()
  const { t } = useTranslation()

  if (user === null) {
    return <Text>User is null</Text>
  }
  const recordHistoryStorage = useAsyncMapStorage(`${scanRecordKey}-${user.id}`)
  const imageHistoryStorage = useAsyncMapStorage(
    `${imageHistoryKey}-${user.id}`,
  )
  const FlexSafeAreaView = styled.SafeAreaView`
    flex: 1;
  `
  const ContentTouchableOpacity = styled.TouchableOpacity`
    flex: 1;
    padding-left: 0px;
    padding-right: 0px;
  `
  useEffect(() => {
    ;(async () => {
      try {
        await AsyncStorage.clear()
        // imageHistory.current = await imageHistoryStorage.getMapItem()
        recordHistory.current = (
          await recordHistoryStorage.getMapItem("object")
        ).map((item) => JSON.parse(item ?? "{}"))
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    })().catch((error) => {
      throw error
    })
    Alert.alert(`${realm.objects("Product").length}`)
  }, [loading])

  const handleToggleRecordStatus = useCallback(
    (record: ScanRecord): void => {
      console.log("Record")
    },
    [realm],
  )

  const handleDeleteRecord = useCallback(
    async (key: string): Promise<void> => {
      setLoading(true)
      await recordHistoryStorage.removeOneItem(key)
      setLoading(false)
    },
    [realm],
  )

  const handleDeleteImageHistory = useCallback(
    async (key: string): Promise<void> => {
      setLoading(true)

      await imageHistoryStorage.removeOneItem(key)
      setLoading(false)
    },
    [realm],
  )

  // TODO Type of the data
  const resultNavigate = (detailInfo: { data: unknown; type: string }) => {
    navigation.navigate(RouteNameMain.modalResult, detailInfo)
  }

  const scanNavigate = (scannedPhoto: string) => {
    navigation.navigate("Scanner", { uri: scannedPhoto })
  }
  return (
    <FlexSafeAreaView>
      <ContentTouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TopTabBarButton
            scale={scale}
            contentView={"list"}
            currentView={contentView}
            onPress={() => {
              setContentView("list")
            }}
          >
            <ButtonText $scale={scale}>{t("list")}</ButtonText>
          </TopTabBarButton>
          <TopTabBarButton
            scale={scale}
            contentView={"image"}
            currentView={contentView}
            onPress={() => {
              setContentView("image")
            }}
          >
            <ButtonText $scale={scale}>{t("Image")}</ButtonText>
          </TopTabBarButton>
        </View>

        {contentView === "list" ? (
          <RecordList
            records={recordHistory.current}
            onToggleRecordStatus={handleToggleRecordStatus}
            onDeleteRecord={handleDeleteRecord}
            detailNavigate={resultNavigate}
          />
        ) : (
          <Photos
            photos={imageHistory.current}
            navigateAction={scanNavigate}
            onDelete={handleDeleteImageHistory}
          />
        )}
      </ContentTouchableOpacity>
    </FlexSafeAreaView>
  )
}
