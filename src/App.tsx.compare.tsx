// This is for error handling $ https://docs.expo.dev/development/use-development-builds/#add-error-handling
import "expo-dev-client"
import { Provider as PaperProvider } from "react-native-paper"

import { NavigationContainer } from "@react-navigation/native"
import { AppProvider, UserProvider } from "@realm/react"
import "./lib/i18-next"
import RealmContext, {
  realmFileBehavior,
} from "&/realm/RealmContext"
import { customerRealmSub } from "./realm/subscription"
import Realm, { ClientResetMode, type App, type SyncError } from "realm"
import { LoginStackNavigation, MainStackNavigation } from "&/navigation"
import { Alert } from "react-native"
import realmApp from "./atlas-app-services/app"
import { useCallback, useEffect, useRef } from "react"
import FileSystem from "expo-file-system"
const { RealmProvider } = RealmContext

/**
 * The pre-client reset listener - Will be invoked before sync initiates
 * a client reset.
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function handlePreClientReset(localRealm: Realm): void {
  Alert.alert(`${localRealm.isClosed}`)
  console.log("Initiating client reset...")
}

/**
 * The post-client reset listener - Will be invoked after a client reset.
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function handlePostClientReset(localRealm: Realm, remoteRealm: Realm): void {
  console.log("Client has been reset.")
}

function AppWrapper() {
  console.log("App wrapper function body")

  const realmRef = useRef<Realm | null>(null)

  const errorSync = useCallback(
    (session: App.Sync.Session, error: SyncError) => {
      Alert.alert("Error sync is calling")

      console.error(error)
      console.log({
        name: error.name,
        message: error.message,
      })

      if (realmRef.current !== null) {
        if (error.name === "ClientReset") {
          const realmPath = realmRef.current.path
          realmRef.current.close()

          console.log(`Error ${error.message}, need to reset ${realmPath}…`)
          Realm.App.Sync.initiateClientReset(realmApp, realmPath) // pass your realm app instance, and realm path to initiateClientReset()
          console.log(`Creating backup from ${error.config.path}…`)
          // Move backup file to a known location for a restore
          FileSystem.moveAsync({
            from: realmPath,
            to: realmPath + "~",
          })
          // Discard the reference to the realm instance
          realmRef.current = null
        } else {
          console.log(`Received error ${error.message}`)
        }
      }
    },
    [],
  )

  useEffect(() => {
    if (realmRef.current !== null)
      console.log(
        "Is realm in migrate AppWrapper",
        realmRef.current.isInMigration,
      )
  }, [realmRef])

  return (
    <NavigationContainer>
      <PaperProvider>
        <AppProvider id="application-qrcode-ukplu">
          <UserProvider fallback={<LoginStackNavigation />}>
            <RealmProvider
              realmRef={realmRef}
              sync={{
                clientReset: {
                  mode: ClientResetMode.RecoverOrDiscardUnsyncedChanges,
                  onBefore: handlePreClientReset,
                  onAfter: handlePostClientReset,
                },
                onError: errorSync,
                flexible: true,
                existingRealmFileBehavior: realmFileBehavior,
                newRealmFileBehavior: realmFileBehavior,
                initialSubscriptions: {
                  update(_subs, realm) {
                    customerRealmSub(realm)
                  },
                },
              }}
            >
              <MainStackNavigation />
            </RealmProvider>
          </UserProvider>
        </AppProvider>
      </PaperProvider>
    </NavigationContainer>
  )
}

if (__DEV__) {
  console.log("It's in dev environment")
  // connectToDevTools({
  //   host: "localhost",
  //   port: 8083,
  // });
  // Dev only
  // RNAsyncStorageFlipper(AsyncStorage);
  // End dev only
}

export default AppWrapper
