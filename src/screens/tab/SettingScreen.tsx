import { useUser } from "@realm/react"
import { useEffect, useRef } from "react"
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Pressable,
  View,
  Switch
} from "react-native"
import RealmContext from "../../realm/RealmContext"
import Constants from "expo-constants"
import { Button, Divider, List } from "react-native-paper"
import Dimensions from "../../style/Dimensions"
import { useTranslation } from "react-i18next"
import LanguagePicker from "../../components/LanguagePicker"
import realmApp from "../../realm/app"
import { FontAwesomeIconWrapper } from "../../components/Icon"
import { type StackScreenProps } from "@react-navigation/stack"
import { type RootStackParamList } from "../../type/navigation"
import { type RouteNameMain } from "../../navigation/const"
import colors from "../../style/colors"

const { scale } = Dimensions
const { useRealm } = RealmContext

const AccountList = () => {
  const { t } = useTranslation("settings")
  const currentUser = useUser()
  // console.log("Realm app",JSON.stringify(realmApp.))
  return (
    <>
      <List.Accordion
        title={t("Account")}
        left={(props) => <List.Icon {...props} icon="account" />}
      >
        {Object.entries(realmApp.allUsers).map((entry) => {
          return (
            <List.Item
              key={entry[1].profile.email}
              title={entry[1].profile.email}
              right={(color) => {
                return entry[1].isLoggedIn
                  ? (
                  <Button
                    mode="contained"
                    onPress={() => {
                      currentUser?.logOut().then(() => {
                      }).catch(error => {
                        throw error
                      })
                    }}
                  >
                    {t("Log out")}
                  </Button>
                    )
                  : null
              }}
            />
          )
        })}
      </List.Accordion>
      <Divider />
    </>
  )
}
function SubscriptionList () {
  const realm = useRealm()
  const { t } = useTranslation("setting")
  const subscriptions = useRef([
    "orderSubscription",
    "enterpriseSubscription",
    "productSubscription",
    "checkerSubscription"
  ])
  const currentSubscriptions = realm.subscriptions
  const subscriptionsState = useRef(
    subscriptions.current.map(
      (subscription) => currentSubscriptions.findByName(subscription) !== null
    )
  )
  // const subscriptions = useMemo(() => , [])
  return (
    <List.Section title={t("Subscription")}>
      {subscriptions.current.length === 0
        ? (
            <View>
              <Text>No subscription</Text>
            </View>
          )
        : (
            subscriptions.current.map((subscription, index) => {
              return (
                <List.Item
                  key={subscription}
                  title={subscription}
                  right={({ color, style }) => (
                    <Pressable
                      style={[{ backgroundColor: "red" }, style]}
                      onPress={() => {
                        realm.subscriptions.update(
                          (mutableSubs) => {
                            mutableSubs.removeByName(subscription)
                          }
                        ).catch(
                          error => {
                            throw error
                          }
                        )
                      }}
                      onLongPress={() => {
                        console.log(realm.objects("Product").length)
                      }}
                    >
                      <Switch value={subscriptionsState[index]} />
                    </Pressable>
                  )}
                />
              )
            })
          )
      }
    </List.Section>
  )
}
type SettingScreenStackProps = StackScreenProps<
RootStackParamList,
RouteNameMain.setting
>
function SettingScreen (props: SettingScreenStackProps) {
  const realm = useRealm()

  const { t } = useTranslation("settings")
  const connectState = useRef(realm.syncSession?.isConnected())
  useEffect(() => {
    // console.log(realm.objects("Checker"))
    // realm.syncSession?.addProgressNotification(ProgressDirection["Download"],  ProgressMode["ForCurrentlyOutstandingWork"], (transfered, transferAble) => {
    //   console.log(transferAble, transfered)
    // })
    // realm.syncSession?.addProgressNotification(ProgressDirection["Download"],  ProgressMode["ForCurrentlyOutstandingWork"], (transfered, transferAble) => {
    //   console.log(transferAble, transfered)
    // })
    // console.log(`Scale`, fontScale)
    console.log(realm.schema)
  }, [realm.syncSession])
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "ios" ? colors.iosSettingBackground : colors.white
      }}
    >
      <List.Section title="Status">
        <List.Item
          title={t("Connection state")}
          right={({ color }) => (
            <>
              {(connectState.current ?? false)
                ? <Text style={{ color }}>Connected</Text>
                : <Text style={{ color }}>Disconnect</Text>
              }
            </>
          )}
        />
      </List.Section>
      <SubscriptionList />
      <List.Section title="Customize">
        <List.Item
          title={t("Language switch")}
          right={() => <LanguagePicker />}
        />
        <List.Item
          title={`${t("Pausing")} ${t("sync")}`}
          right={() => (
            <TouchableOpacity>
              <FontAwesomeIconWrapper name="play" size={10 * scale} />
            </TouchableOpacity>
          )}
        />
      </List.Section>
      <AccountList />
      <Divider />

      <List.Section title="Runtime info" titleStyle={{ fontWeight: "bold" }}>
        <List.Item
          title={"Expo version"}
          right={({ color }) => <Text>{Constants.expoRuntimeVersion}</Text>}
        />
        <List.Item
          title={"Expo Go version"}
          right={({ color }) => <Text>{Constants.expoVersion}</Text>}
        />
        <List.Item
          title={"Device name"}
          right={({ color }) => <Text>{Constants.deviceName}</Text>}
        />
        <List.Item
          title={"Debug mode"}
          right={({ color }) => (
            <Text style={{ color }}>{Constants.debugMode}</Text>
          )}
        />
      </List.Section>
    </ScrollView>
  )
}

export default SettingScreen
