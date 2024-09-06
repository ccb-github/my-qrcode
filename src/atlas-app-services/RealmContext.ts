import { createRealmContext } from "@realm/react"

import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from "realm"
import type { OpenRealmBehaviorConfiguration } from "realm"
import OrderSchemaList from "./models/Customer/Order"
import ProductSchemaList from "./models/Producer/Product"
import CheckRecord from "./models/Regulatory/CheckRecord"
import CheckerSchemaList from "./models/Regulatory/Checker"
import EnterpriseSchemaList from "./models/Producer/EnterPrise"
import Regulatory from "./models/Regulatory/Regulatory"
import Category from "./models/Seller/Category"

// TODO realm timeout behavior
export const realmFileBehavior: OpenRealmBehaviorConfiguration = {
  type: OpenRealmBehaviorType.DownloadBeforeOpen,
  timeOut: 1000,
  timeOutBehavior: OpenRealmTimeOutBehavior.OpenLocalRealm,
}

export const config = {
  schema: [
    Category,
    ...CheckerSchemaList,
    CheckRecord,
    ...OrderSchemaList,
    Regulatory,
    ...ProductSchemaList,
    ...EnterpriseSchemaList,
  ],
}

export default createRealmContext(config)
