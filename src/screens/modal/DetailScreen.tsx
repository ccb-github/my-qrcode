import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import { ScrollView, Text, useWindowDimensions } from "react-native"
import { Chip } from "react-native-paper"
import i18n from "../../lib/i18-next"
import { useTranslation } from "react-i18next"
import { CheckerDetail } from "../../components/detail/CheckerDetail"
import styled from "styled-components/native"
import { StyledFlexRowView } from "../../components/styled/view"
import { type Checker } from "../../realm/models/Regulatory/Checker"
import { EnterpriseDetail } from "../../components/detail/EnterpriseDetail"
import { ProductDetail } from "../../components/detail/ProductDetail"
import { StyledTextByAbsoluteSize } from "../../components/styled/text"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RouteNameMain } from "../../navigation/const"
import type { MainStackParamList } from "../../type/navigation"

export type RootStackDetailScreenProps = StackScreenProps<
  MainStackParamList,
  RouteNameMain.modalDetail
>

export default function DetailScreen({ route }: RootStackDetailScreenProps) {
  const { t } = useTranslation(i18n.language)
  const { scale } = useWindowDimensions()

  const contentTabStackRef = useRef<Set<string>>(new Set())
  const cacheDataRef = useRef({})
  const [type, setType] = useState<string | null>(null)
  const FullScreenContainer = styled.SafeAreaView`
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
  const ScaledHintText = styled.Text<{ scale: number }>`
    font-size: ${(props) => props.scale};
    background-color: red;
    font-weight: bold;
  `
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
    console.log("This is the data now", newData.data)
    cacheDataRef.current[newData.type] = newData.data
    contentTabStackRef.current.add(newData.type)
    setType(newData.type)
  }

  return (
    <FullScreenContainer>
      <StatusBar style="auto" />
      <StyledFlexRowView
        style={{
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
      </StyledFlexRowView>
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
                    refreshData({
                      type: "Product",
                      data: newData,
                    })
                  }}
                />
              )
            case "Enterprise":
              return (
                <EnterpriseDetail
                  data={cacheDataRef.current[type]}
                  linkAction={(newData: unknown) => {
                    refreshData({
                      type: "Enterprise",
                      data: newData,
                    })
                  }}
                  scale={scale}
                />
              )
            case "Checker":
              return (
                <CheckerDetail
                  scale={scale}
                  data={cacheDataRef.current[type]}
                  linkAction={(newData: Checker) => {
                    refreshData({
                      type: "Checker",
                      data: newData,
                    })
                  }}
                />
              )
            case "Order":
              return <Text>Order detail not implement</Text>
            case null:
              return (
                <StyledTextByAbsoluteSize size={10 * scale}>
                  Loading...
                </StyledTextByAbsoluteSize>
              )
            default:
              return (
                <ScaledHintText
                  scale={scale}
                  style={{ textAlignVertical: "top" }}
                >
                  {t("No valid data found in qrcode url")}
                </ScaledHintText>
              )
          }
        })(type)}
      </ScrollView>
    </FullScreenContainer>
  )
}
