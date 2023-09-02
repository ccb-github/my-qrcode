import { Realm } from "@realm/react";

const appId = "application-qrcode-ukplu"; // replace this with your App ID

// Returns the shared instance of the Realm app.
export function getRealmApp() {
    const appConfig = {
      id: appId,
      
      timeout: 10000,
    };
   return new Realm.App(appConfig);
}

const realmApp = getRealmApp()


export default realmApp;