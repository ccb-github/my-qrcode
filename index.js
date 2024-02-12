import "expo-dev-client"
import App from "./src/App"

// This is for resolve the issue document by @{link} https://www.npmjs.com/package/react-native-get-random-values
import "react-native-get-random-values"
import { registerRootComponent } from "expo"
import { ExecutionEnvironment } from "expo-constants"
// Detect if the run time is expo go, etc does not support some native module.

// if (isExpoGo) {
//   registerRootComponent(AppWithoutRealm)
// } else {
console.log(ExecutionEnvironment)
registerRootComponent(App)
// }
