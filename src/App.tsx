// This is for error handling $ https://docs.expo.dev/development/use-development-builds/#add-error-handling
import "expo-dev-client"
import { Provider as PaperProvider } from "react-native-paper"
import { LoginNavigation, MainNavigation } from "./navigation"
import { NavigationContainer } from "@react-navigation/native"
import { AppProvider, UserProvider } from "@realm/react"
import "./lib/i18-next"
import RealmContext, { realmFileBehavior } from "./realm/RealmContext"
import { customerRealmSub } from "./realm/subscription"
import type { App, SyncError } from "realm"

const { RealmProvider } = RealmContext

function AppWrapper () {
  console.log("Appwrapper function body")

  return (
    <NavigationContainer>
      <PaperProvider>
        <AppProvider id="application-qrcode-ukplu">
          <UserProvider fallback={<LoginNavigation />}>
            <RealmProvider
              sync={{
                onError: errorSync,
                flexible: true,
                existingRealmFileBehavior: realmFileBehavior,
                newRealmFileBehavior: realmFileBehavior,
                initialSubscriptions: {
                  update (_subs, realm) {
                    customerRealmSub(realm)
                  }
                }
              }}
            >
              <MainNavigation />
            </RealmProvider>
          </UserProvider>
        </AppProvider>
      </PaperProvider>
    </NavigationContainer>
  )
}

function errorSync (session: App.Sync.Session, error: SyncError) {
  console.log("Error sync is calling")

  console.error(error)
  console.log(error.name + error.message)
  /*  if (realm) {
    if (error.name === "ClientReset") {

      const realmPath = "<Your Realm Path>";
      realm.close();

      console.log(`Error ${error.message}, need to reset ${realmPath}…`);
      Realm.App.Sync.initiateClientReset(realmApp, realmPath); // pass your realm app instance, and realm path to initiateClientReset()
      console.log(`Creating backup from ${error.config.path}…`);
      // Move backup file to a known location for a restore
      fs.renameSync(error.config.path, realmPath + "~");
      // Discard the reference to the realm instance
      realm = null;
    } else {
      console.log(`Received error ${error.message}`);
    }
  } */
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
