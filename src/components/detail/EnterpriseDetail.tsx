import { StringField, DateField, ImageField } from "../field"
import { useTranslation } from "react-i18next"
import { type EnterpriseMain } from "../../realm/models/Producer/EnterPrise"
import { type DetailViewProps } from "../../type/props"

/**
 * Description
 * @param {EnterpriseMain} {data}:{data:EnterpriseMain}
 * @returns {React.ReactNode}
 */
export const EnterpriseDetail = ({ data }: DetailViewProps<EnterpriseMain>) => {
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
