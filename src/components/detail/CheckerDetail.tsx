import { StringField } from "../field"
import { useTranslation } from "react-i18next"
import { type Checker } from "../../realm/models/Regulatory/Checker"

export const CheckerDetail = ({ data }: { data: Checker }) => {
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
