import { useEffect, useState } from "react"
import realmApp from "../realm/app"
import { ConnectionState } from "realm"

export default function useSession(realm: Realm) {
  const [syncSessionConnected, setSyncSessionConnected] =
    useState<ConnectionState>(realm.syncSession.connectionState)
  useEffect(() => {
    realm.syncSession.addConnectionNotification((newState) => {
      setSyncSessionConnected(newState)
    })
    return () => {
      realm.syncSession.removeConnectionNotification((newState) => {
        console.log(`Session end with state ${newState}`)
      })
    }
  }, [])
  return syncSessionConnected
}
