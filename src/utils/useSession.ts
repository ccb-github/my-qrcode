import { useEffect, useState } from "react"

import Realm, { type ConnectionState } from "realm"

export default function useSession(realm: Realm) {
  const [syncSessionConnected, setSyncSessionConnected] = useState<
    ConnectionState | undefined
  >(realm.syncSession?.connectionState)
  useEffect(() => {
    if (realm.syncSession?.connectionState !== undefined) {
      realm.syncSession.addConnectionNotification((newState) => {
        setSyncSessionConnected(newState)
      })
      return () => {
        realm.syncSession?.removeConnectionNotification((newState) => {
          console.log(`Session end with state ${newState}`)
        })
      }
    }
  }, [realm.syncSession?.connectionState])
  return syncSessionConnected
}
