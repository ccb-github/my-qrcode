import "expo-dev-client"
import App from "./src/App"
// eslint-disable-next-line @typescript-eslint/quotes
import AppWithoutRealm from "./src/AppWithoutRealm"
import Constants, { ExecutionEnvironment } from "expo-constants"

// This is for reslove the issue document by @{link} https://www.npmjs.com/package/react-native-get-random-values
import "react-native-get-random-values"
import { registerRootComponent } from "expo"

// Detect if the run time is expogo, etc does not support some native module.
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient

if (isExpoGo) {
  registerRootComponent(AppWithoutRealm)
} else {
  registerRootComponent(App)
}
