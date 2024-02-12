import { Text } from "react-native"
import { Divider } from "react-native-paper"
import { StringField, DateField, LinkObjectField } from "../field"
import { useTranslation } from "react-i18next"
import { type EnterpriseMain } from "../../realm/models/Producer/EnterPrise"
import type { Product } from "../../realm/models/Producer/Product"
import type { DetailViewProps } from "../../type/props"
import { ObjectId } from "bson"
import { HintText } from "../styled/text"
import styled from "styled-components/native"

const WhiteBackgroundView = styled.View`
  background-color: white;
`

export const ProductDetail = ({
  data,
  linkAction,
  scale,
}: DetailViewProps<Product>) => {
  console.log(`Data inside ProductDetail ${JSON.stringify(data)}`)
  const { t } = useTranslation("product")

  const dataIdInterpret = (value: ObjectId | string | unknown) => {
    if (value instanceof ObjectId) {
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
      <WhiteBackgroundView>
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
      </WhiteBackgroundView>
      <Divider style={{ height: 10 * scale }} />

      <WhiteBackgroundView>
        <Text style={{ textAlign: "center" }}>Enterprise</Text>
        {typeof data.producer === "object" ? (
          <LinkObjectField<EnterpriseMain, "name">
            name={t("Producer")}
            valueAccessor={"name"}
            type={"Enterprise"}
            value={data.producer}
            onPressAction={linkAction}
          />
        ) : (
          <HintText scale={scale} size={10 * scale}>
            This area is empty yet
          </HintText>
        )}
      </WhiteBackgroundView>
      <Divider style={{ height: 10 * scale }} />

      <WhiteBackgroundView>
        <Text style={{ textAlign: "center" }}>{"Enterprise"}</Text>
        {data.producer != null ? (
          <LinkObjectField<EnterpriseMain, "name">
            name={t("name")}
            type={"Enterprise"}
            valueAccessor={"name"}
            value={data.producer}
            onPressAction={linkAction}
          />
        ) : (
          <HintText size={10} scale={scale}>
            This area is empty yet
          </HintText>
        )}
      </WhiteBackgroundView>
    </>
  )
}
