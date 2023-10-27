import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  useWindowDimensions,
} from "react-native"
import { Chip, Divider } from "react-native-paper"
import {
  StringField,
  DateField,
  ImageField,
  LinkObjectField,
} from "../../components/field"
import Dimensions from "../../style/Dimensions"
import i18n from "../../lib/i18-next"
import { useTranslation } from "react-i18next"
import { type EnterpriseMain } from "../../realm/models/Producer/EnterPrise"
import { type Checker } from "../../realm/models/Regulatory/Checker"
import { hintTextBySize } from "../../style/common"
import type { Product } from "../../realm/models/Producer/Product"
import { type RootStackDetailScreenProps } from "../../type/RootStackDetailScreenProps"
import { type DetailViewProps } from "../../type/props"
import { type ObjectId } from "bson"
const { getFontSize } = Dimensions

// TODO integrate data

const ProductDetail = ({
  data,
  linkAction,
  scale,
}: DetailViewProps<Product>) => {
  console.log(`Data inside ProductDetail ${JSON.stringify(data)}`)
  const { t } = useTranslation("product")
  const dataIdInterpret = (value: ObjectId | string | unknown) => {
    if (typeof value.toHexString === "function") {
      return value.toHexString()
    } else if (typeof value === "string") {
      return value
    } else {
      return "This value does not appear to be string or ObjectId, check"
    }
  }
  return (
    <>
      {/* Main data section  {@id: productCard} */}
      <View style={{ backgroundColor: "white" }}>
        <StringField name={t("Id")} value={dataIdInterpret(data._id)} />
        <Divider />
        <StringField name={t("Name")} value={data.name} />
        <Divider style={{ borderStyle: "dashed" }} />
        <StringField
          name={t("ShelfLife")}
          value={`${data.shelfLife} ${t("days")}`}
        />
        <Divider />
        <DateField
          name={t("Produce Day")}
          value={
            typeof data.produceDay === "string"
              ? data.produceDay
              : data.produceDay.toDateString()
          }
        />
      </View>
      <Divider style={{ height: 10 * scale }} />

      <View style={{ backgroundColor: "white" }}>
        <Text style={{ textAlign: "center" }}>Enterprise</Text>
        {typeof data.producer === "object" ? (
          <LinkObjectField<EnterpriseMain>
            valueNameKey={"name"}
            name={t("Producer")}
            type={"Enterprise"}
            value={data.producer}
            onPressAction={linkAction}
          />
        ) : (
          <Text style={hintTextBySize({ size: 10 * scale })}>
            This area is empty yet
          </Text>
        )}
      </View>
      <Divider style={{ height: 10 * scale }} />

      <View style={{ backgroundColor: "white" }}>
        <Text style={{ textAlign: "center" }}>{"Enterprise"}</Text>
        {data.producer != null ? (
          <LinkObjectField<EnterpriseMain>
            name={t("Producer")}
            type={"Enterprise"}
            valueNameKey=""
            value={data.producer}
            onPressAction={linkAction}
          />
        ) : (
          <Text style={hintTextBySize({ size: 10 * scale })}>
            This area is empty yet
          </Text>
        )}
      </View>
    </>
  )
}

const CheckerDetail = ({ data }: { data: Checker }) => {
  console.log(`Data inside CheckerDetail ${JSON.stringify(data)}`)
  const { t } = useTranslation("checker")
  return (
    <>
      <StringField name={t("Check") + t("Id")} value={data._id.toHexString()} />
      <StringField name={t("Check") + t("device")} value={"Random device"} />
      <StringField
        name={t("Check") + t("time")}
        value={new Date().toISOString()}
      />
    </>
  )
}

/**
 * Description
 * @param {EnterpriseMain} {data}:{data:EnterpriseMain}
 * @returns {any}
 */
const EnterpriseDetail = ({ data }: { data: EnterpriseMain }) => {
  console.log(`Data inside EnterpriseDetail ${JSON.stringify(data)}`)
  const { t } = useTranslation("enterprise")
  return (
    <>
      <DateField name={t("createAt")} value={data.createdAt.toDateString()} />
      <StringField name={t("name")} value={data.name} />
      <StringField name={t("email")} value={data.email} />
      <ImageField name={t("brand")} value={data.tradeMark ?? "Empty"} />
      <StringField name={t("register place")} value={data.registerPlace} />
    </>
  )
}

export default function DetailScreen({ route }: RootStackDetailScreenProps) {
  const { t } = useTranslation(i18n.language)
  const { scale, height } = useWindowDimensions()

  const contentTabStackRef = useRef<Set<string>>(new Set())
  const cacheDataRef = useRef({})
  const [type, setType] = useState<string | null>(null)

  useEffect(() => {
    console.log("DetailScreen mounted")

    refreshData(route.params)
  }, [])

  /**
   *refresh the data in screen
   *
   */
  const refreshData = (newData: { type: string; data: unknown }) => {
    console.log("Refresh function", JSON.stringify(newData))
    // debugger
    console.log("This is the data now", newData.data)
    cacheDataRef.current[newData.type] = newData.data
    contentTabStackRef.current.add(newData.type)
    setType(newData.type)
  }

  return (
    <View style={[styles.container, { height }]}>
      <StatusBar style="auto" />
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 3 * scale,
        }}
      >
        {[...contentTabStackRef.current].map((tab, index) => (
          <Chip
            selected={type === tab}
            onPress={() => {
              setType(tab)
            }}
            key={index}
            closeIcon="close"
            closeIconAccessibilityLabel="Custom Close icon accessibility label"
          >
            {tab}
          </Chip>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          paddingHorizontal: 5 * scale,
        }}
      >
        {((type) => {
          switch (type) {
            case "Product":
              return (
                <ProductDetail
                  scale={scale}
                  data={cacheDataRef.current[type]}
                  linkAction={(newData) => {
                    refreshData(newData)
                  }}
                />
              )
            case "Enterprise":
              return (
                <EnterpriseDetail
                  data={cacheDataRef.current[type]}
                  linkAction={(newData: any) => {
                    refreshData(newData)
                  }}
                />
              )
            case "Checker":
              return (
                <CheckerDetail
                  data={cacheDataRef.current[type]}
                  linkAction={(newData: any) => {
                    refreshData(newData)
                  }}
                />
              )
            case "Order":
              return <Text>Order detail not implement</Text>
            case null:
              return (
                <Text style={{ fontSize: getFontSize(10) }}>Loading...</Text>
              )
            default:
              return (
                <Text
                  style={[
                    styles.hintFontStyle,
                    {
                      fontSize: 20,

                      backgroundColor: "red",
                      fontWeight: "bold",
                      textAlignVertical: "top",
                    },
                  ]}
                >
                  {t("No valid data found in qrcode url")}
                </Text>
              )
          }
        })(type)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: "column",
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  hintFontStyle: {
    textAlign: "center",
    marginTop: 40,
  },
})
