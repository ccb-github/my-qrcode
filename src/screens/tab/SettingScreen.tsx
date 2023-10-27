import { useUser } from "@realm/react"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ActivityIndicator,
} from "react-native"
import RealmContext from "../../realm/RealmContext"
import Constants from "expo-constants"
import { Divider, List } from "react-native-paper"
import Dimensions from "../../style/Dimensions"
import { useTranslation } from "react-i18next"
import LanguagePicker from "../../components/LanguagePicker"
import realmApp from "../../realm/app"
import { FontAwesomeIconWrapper } from "../../components/Icon"
import colors from "../../style/colors"
import { Product } from "../../realm/models/Producer/Product"
import { type RootTabScreenProps } from "../../type/props"
import Button from "../../components/Button"

const { scale } = Dimensions
const { useRealm } = RealmContext

const AccountList = () => {
  const { t } = useTranslation("settings")
  const currentUser = useUser()
  const handleLogout = () => {
    currentUser
      ?.logOut()
      .then(() => {})
      .catch((error) => {
        throw error
      })
  }

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
                return entry[1].isLoggedIn ? (
                  <Button mode="contained" onPress={handleLogout}>
                    {t("Log out")}
                  </Button>
                ) : null
              }}
            />
          )
        })}
      </List.Accordion>
      <Divider />
    </>
  )
}
function SubscriptionList() {
  const realm = useRealm()
  const { t } = useTranslation("setting")
  const [reloading, setReloading] = useState(0)
  const subscriptions = useRef([
    "Order-Subscription",
    "Enterprise-Subscription",
    "Product-Subscription",
    "Checker-Subscription",
  ])
  useEffect(() => {
    console.log(realm.objects(Product).length)
  }, [])
  const currentSubscriptions = realm.subscriptions
  const subscriptionsState = useMemo(
    () =>
      subscriptions.current.map(
        (subscription) =>
          currentSubscriptions.findByName(subscription) !== null,
      ),
    [reloading],
  )
  // const subscriptions = useMemo(() => , [])
  return (
    <List.Section title={t("Subscription")}>
      {subscriptions.current.length === 0 ? (
        <View>
          <Text>No subscription</Text>
        </View>
      ) : (
        subscriptions.current.map((subscription, index) => {
          return (
            <List.Item
              key={subscription}
              title={subscription}
              right={({ color, style }) => (
                // <Pressable
                //   style={[{ backgroundColor: "red" }, style]}
                //   onPress={() => {
                //     realm.subscriptions.update(
                //       (mutableSubs) => {
                //         mutableSubs.removeByName(subscription)
                //       }
                //     ).catch(
                //       error => {
                //         throw error
                //       }
                //     )
                //   }}
                //   onLongPress={() => {
                //     console.log(realm.objects("Product").length)
                //   }}
                // >
                <Switch
                  value={subscriptionsState[index]}
                  style={style}
                  onTouchEnd={() => {
                    console.log(realm.objects("Product").length, "Length")
                  }}
                  onValueChange={(newValue) => {
                    console.log(realm.subscriptions.length)
                    realm.subscriptions
                      .update((mutableSubs) => {
                        if (newValue) {
                          mutableSubs.add(
                            realm.objects(subscription.split("-")[0]),
                            { name: subscription },
                          )
                        } else {
                          mutableSubs.removeByName(subscription)
                        }
                        setReloading(reloading + 1)
                      })
                      .catch((error) => {
                        throw error
                      })
                  }}
                />
              )}
            />
          )
        })
      )}
    </List.Section>
  )
}

function SettingScreen(props: RootTabScreenProps) {
  const realm = useRealm()

  const { t } = useTranslation("settings")
  const connectState = useRef(realm.syncSession?.isConnected())
  const [isSessionConnected, setIsSessionConnected] = useState(
    realm.syncSession?.isConnected(),
  )
  useEffect(() => {
    // console.log(realm.objects("Checker"))
    // realm.syncSession?.addProgressNotification(ProgressDirection["Download"],  ProgressMode["ForCurrentlyOutstandingWork"], (transferred, transferAble) => {
    //   console.log(transferAble, transferred)
    // })
    // realm.syncSession?.addProgressNotification(ProgressDirection["Download"],  ProgressMode["ForCurrentlyOutstandingWork"], (transferred, transferAble) => {
    //   console.log(transferAble, transferred)
    // })
    // console.log(`Scale`, fontScale)
    realm.syncSession?.addConnectionNotification((newConnectionState) => {
      setIsSessionConnected(newConnectionState === "connected")
    })

    console.log(realm.schema)
    return () => {
      realm.syncSession?.removeConnectionNotification(() => {})
    }
  }, [realm.syncSession])
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "ios" ? colors.iosSettingBackground : colors.white,
      }}
    >
      <List.Section title="Status">
        <List.Item
          title={t("Connection state")}
          right={({ color }) => (
            <>
              {connectState.current ?? false ? (
                <Text style={{ color }}>Connected</Text>
              ) : (
                <Text style={{ color }}>Disconnect</Text>
              )}
            </>
          )}
        />
      </List.Section>
      {isSessionConnected ?? false ? (
        <SubscriptionList />
      ) : (
        <ActivityIndicator size={"large"} />
      )}
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
