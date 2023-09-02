import { createRealmContext } from "@realm/react"

import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm"
import type { OpenRealmBehaviorConfiguration } from "realm"
import OrderSchemaList from "./models/Customer/Order"
import ProductSchemaList from "./models/Producer/Product"
import CheckRecord from "./models/Regulatory/CheckRecord"
import CheckerSchemaList from "./models/Regulatory/Checker"
import RegulatorySchemaList from "./models/Regulatory/Regulatory"
import EnterpriseSchemaList from "./models/Producer/EnterPrise"

export const realmFileBehavior: OpenRealmBehaviorConfiguration = {
  type: OpenRealmBehaviorType.DownloadBeforeOpen,
  timeOut: 1000,
  timeOutBehavior: OpenRealmTimeOutBehavior.OpenLocalRealm
}

export const config = {
  deleteRealmIfMigrationNeeded: true,
  schema: [
    ...CheckerSchemaList,
    CheckRecord,
    ...OrderSchemaList,
    ...RegulatorySchemaList,
    ...ProductSchemaList,
    ...EnterpriseSchemaList
  ]
}

export default createRealmContext(config)
