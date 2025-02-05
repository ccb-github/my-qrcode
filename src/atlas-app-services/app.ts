import { Realm } from "@realm/react"
import { APPLICATION_ID } from "../../mongo-setting.json"

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  const appConfig = {
    id: APPLICATION_ID,
    timeout: 10000,
  }
  return new Realm.App(appConfig)
}

const realmApp = getRealmApp()
export default realmApp
