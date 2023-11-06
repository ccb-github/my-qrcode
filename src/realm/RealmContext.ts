import { createRealmContext } from "@realm/react"

import { OpenRealmBehaviorType } from "realm"
import type { OpenRealmBehaviorConfiguration } from "realm"
import OrderSchemaList from "./models/Customer/Order"
import ProductSchemaList from "./models/Producer/Product"
import CheckRecord from "./models/Regulatory/CheckRecord"
import CheckerSchemaList from "./models/Regulatory/Checker"
import EnterpriseSchemaList from "./models/Producer/EnterPrise"
import Regulatory from "./models/Regulatory/Regulatory"

// TODO realm timeout behavior
export const realmFileBehavior: OpenRealmBehaviorConfiguration = {
  type: OpenRealmBehaviorType.DownloadBeforeOpen,
  timeOut: 1000,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  timeOutBehavior: "openLocalRealm",
}

export const config = {
  deleteRealmIfMigrationNeeded: true,
  schema: [
    ...CheckerSchemaList,
    CheckRecord,
    ...OrderSchemaList,
    Regulatory,
    ...ProductSchemaList,
    ...EnterpriseSchemaList,
  ],
}

export default createRealmContext(config)
