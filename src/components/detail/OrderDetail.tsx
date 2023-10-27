import { useTranslation } from "react-i18next"
import { List } from "react-native-paper"
import type { OrderMain } from "../../realm/models/Customer/Order"
import { StringField, DateField } from "../field"

const OrderDetail = ({ data }: { data: OrderMain }) => {
  console.log(`Data inside OrderDetail ${JSON.stringify(data)}`)
  const { t } = useTranslation("order")
  return (
    <>
      <StringField name="Id" value={data?.customerId} />
      <DateField name="Order Time" value={data?.orderTime.toISOString()} />
      <List.Section title={t("product list")}>
        {data.products?.map((item, index) => (
          <List.Item title={item.name} key={index} />
        ))}
      </List.Section>
    </>
  )
}

export default OrderDetail
