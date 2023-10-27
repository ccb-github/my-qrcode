import { useCallback, useEffect, useRef, useState } from "react"
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
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
import { type Record } from "../../realm/models/Record"

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

export default function RecordScreen({ navigation }: RecordScreenStackProps) {
  const [contentView, setContentView] = useState("list")
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

  useEffect(() => {
    ;(async () => {
      try {
        await AsyncStorage.clear()
        // imageHistory.current = await imageHistoryStorage.getMapItem()
        recordHistory.current = (
          await recordHistoryStorage.getMapItem("object")
        ).map((item) => JSON.parse(item ?? "{}"))

        // let rawRecords = await recordHistoryStorage.getMapItem();

        // rawRecords = rawRecords.map((item) => ({
        //   id: new BSON.ObjectId().toHexString(),
        //   content: item,
        //   createdAt: new Date(),
        // }));
        // recordHistorysStorage.setItem(JSON.stringify(rawRecords));
        // recordHistorys.current = rawRecords.map( record => JSON.parse(record[1]))

        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    })().catch((error) => {
      throw error
    })
    Alert.alert(`${realm.objects("Product").length}`)
    // realm.write( () => {
    //   for( const product of realm.objects(Product)) {
    //     product.category ?? (product.category = "Other")
    //   }

    // })
  }, [loading])

  const handleToggleRecordStatus = useCallback(
    (record: Record): void => {
      realm.write(() => {
        record.isVerified = !record.isVerified
      })
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
  const resultNavigate = (detailInfo: { data: any; type: string }) => {
    navigation.navigate(RouteNameMain.modalResult, detailInfo)
  }

  const scanNavigate = (scannedPhoto: string) => {
    navigation.navigate("Scanner", { uri: scannedPhoto })
  }

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity style={styles.content}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.contentViewButton,
              {
                paddingVertical: 5 * scale,
                borderBottomWidth: contentView === "list" ? 2 : 0,
              },
            ]}
            onPress={() => {
              setContentView("list")
            }}
          >
            <Text
              style={[
                styles.contentViewButtonText,
                {
                  fontSize: 10 * scale,
                },
              ]}
            >
              {t("List")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setContentView("image")
            }}
            style={{
              ...styles.contentViewButton,
              paddingVertical: 5 * scale,
              borderBottomWidth: contentView === "image" ? 2 : 0,
            }}
          >
            <Text
              style={[
                styles.contentViewButtonText,
                {
                  fontSize: 10 * scale,
                },
              ]}
            >
              {t("Image")}
            </Text>
          </TouchableOpacity>
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
            parentNavi={scanNavigate}
            onDelete={handleDeleteImageHistory}
          />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
  contentViewButton: {
    flex: 1,
    alignItems: "center",
    borderBottomColor: "#000",
  },
  contentViewButtonText: {
    fontFamily: "SSRegular",
  },
})

// TODO how to type realm result
/*  await realm.subscriptions.update( mutableSubs => {
          mutableSubs.add(realm.objects("Regulatory"), {
            name: "regulatorySubscription",
            throwOnUpdate: true,
          });
          mutableSubs.add(realm.objects("Order"), {
            name: "orderSubscription",
            throwOnUpdate: true,
          });
          mutableSubs.add(realm.objects("Enterprise"), {
            name: "enterpriseSubscription",
            throwOnUpdate: true,
          });
          mutableSubs.add(realm.objects("Producer"), {
            name: "producerSubscription",
            throwOnUpdate: true,
          });
          mutableSubs.add(realm.objects("Product"), {
            name: "productSubscription",
            throwOnUpdate: true,
          });
          mutableSubs.add(realm.objects("Checker"), {
            name: "checkerMainSubscription",
            throwOnUpdate: true,
          });
        }); */

// realm.write( () => {
//   realm.create("Checker", CheckerSchemaList[0].generate())
//   realm.create("Enterprise", EnterpriseSchema[0].generate("A 公司"))
//   realm.create("Order", OrderMainSchema.generate("Order one"))
//   realm.create("Product", ProductMainSchema.generate("Product a") )
//   realm.create("Regulatory", RegulatorySchemaList[0].generate(`Regulatory ${Math.random()}`))
// })
