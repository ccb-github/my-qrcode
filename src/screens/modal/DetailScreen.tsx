import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  useWindowDimensions
} from "react-native"
import { Chip, List, Divider } from "react-native-paper"
import { StringField, DateField, ImageField, LinkObjectField } from "../../components/field"
import { type OrderMain } from "../../realm/models/Customer/Order"
import Dimensions from "../../style/Dimensions"
import i18n from "../../lib/i18-next"
import { useTranslation } from "react-i18next"
import { type EnterpriseMain } from "../../realm/models/Producer/EnterPrise"
import { type Checker } from "../../realm/models/Regulatory/Checker"
import { hintTextBySize } from "../../style/common"
import type { Product } from "../../realm/models/Producer/Product"
import { RootStackDetailScreenProps } from "../../type/RootStackDetailScreenProps"
const { getFontSize } = Dimensions

// TODO intergrate data
//

// eslint-disable-next-line react/prop-types
const ProductDetail = ({ data, linkAction, scale }: {
  data: Product

}) => {
  console.log(`Data inside ProductDetail ${JSON.stringify(data)}`)

  return (
    <>
      {/* Main data section  {@id: productCard} */}
      <View style={{ backgroundColor: "white" }}>
        <StringField
          name={"Id"}
          value={data._id?.toHexString ? data._id.toHexString() : data._id}
        />
        <Divider />
        <StringField name={t("Name")} value={data?.name} />
        <Divider style={{ borderStyle: "dashed" }} />
        <StringField
          name={t("Shelflife")}
          value={`${data.shelfLife as number} ${t("days")}`}
        />
        <Divider />
        <DateField name={"produceDay"} value={data?.createdAt} />
      </View>
      <Divider style={{ height: 10 * scale }} />

      <View style={{ backgroundColor: "white" }}>
        <Text style={{ textAlign: "center" }}>Enterprise</Text>
        {data.producer
          ? (
          <LinkObjectField
            name={t("Producer")}
            type={"Enterprise"}
            value={data.producer}
            onPressAction={linkAction}
          />
            )
          : (
          <Text style={hintTextBySize({ size: 10 * scale })}>
            This area is empty yet
          </Text>
            )}
      </View>
      <Divider style={{ height: 10 * scale }} />

      <View style={{ backgroundColor: "white" }}>
        <Text style={{ textAlign: "center" }}>Check Record</Text>
        {data.producer !== undefined
          ? (
          <LinkObjectField
            name={t("Producer")}
            type={"Enterprise"}
            value={data.producer}
            onPressAction={linkAction}
          />
            )
          : (
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
      <StringField name={t("Check") + t("Id")} value={data._id}/>
      <StringField name={t("Check") + t("device")} value={"Random device"}/>
      <StringField name={t("Check") + t("time")} value={new Date().toISOString()}/>
      <List.Section style={ { width: "100%" }} title={t("product list") + data.products?.length}>{
        data.products?.map(
          (item, index) =>
            <List.Item title={item.name} key={index}/>
        )
      }</List.Section>
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
      <ImageField name={t("brand")} value={data?.tradeMark} />
      <StringField name={t("register place")} value={data?.registerPlace} />
    </>
  )
}

export default function DetailScreen ({ route }: RootStackDetailScreenProps) {
  const { t } = useTranslation(i18n.language)
  const { scale, height } = useWindowDimensions()

  const contentTabStackRef = useRef(new Set())
  const cacheDataRef = useRef({})
  const [type, setType] = useState(null)

  useEffect(() => {
    console.log("Detailscreen mounted")

    refreshData(route.params)
  }, [])

  /**
   *refresh the data in screen
   *
   */
  const refreshData = (newData) => {
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
          paddingHorizontal: 3 * scale
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
            {typeof tab}
          </Chip>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          paddingHorizontal: 5 * scale
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
                  linkAction={(newData) => {
                    refreshData(newData)
                  }}
                />
              )
            case "Checker":
              return (
                <CheckerDetail
                  data={cacheDataRef.current[type]}
                  linkAction={(newData) => {
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
                      textAlignVertical: "top"
                    }
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
    justifyContent: "center"
  },
  contentViewButton: {
    flex: 1,
    alignItems: "center",
    borderBottomColor: "#000"
  },
  contentViewButtonText: {
    fontFamily: "SSRegular",
    fontSize: 10
  },
  hintFontStyle: {
    textAlign: "center",
    marginTop: 40
  }
})
