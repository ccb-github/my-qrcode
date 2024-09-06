/**
 * This is for resolve the issue document by {@link https://www.npmjs.com/package/react-native-get-random-values }
 */
import "react-native-get-random-values"
import "expo-dev-client"
import App from "./src/App"
import { registerRootComponent } from "expo"
import Realm from "realm"
Realm.flags.THROW_ON_GLOBAL_REALM = true

registerRootComponent(App)

