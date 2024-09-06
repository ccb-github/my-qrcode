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
import RealmContext from "#/atlas-app-services/RealmContext"
import Constants from "expo-constants"
import { Divider, List } from "react-native-paper"
import Dimensions from "#/style/Dimensions"
import { useTranslation } from "react-i18next"
import LanguagePicker from "#/components/LanguagePicker"
import realmApp from "#/atlas-app-services/app"
import { FontAwesomeIconWrapper } from "#/components/Icon"
import colors from "#/style/colors"
import { Product } from "#/atlas-app-services/models/Producer/Product"
import { type RootTabHomeScreenProps } from "#/type/props"
import Button from "#/components/Button"
import styled from "styled-components"
import { ConnectionState } from "realm"

const { scale } = Dimensions
const { useRealm } = RealmContext
const ThemedScrollView = styled(ScrollView)<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

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
              right={() => {
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

function SettingScreen(props: RootTabHomeScreenProps) {
  const realm = useRealm()

  const { t } = useTranslation("settings")
  
  const sessionConnected = useRef(realm.syncSession?.isConnected())

  const [isSessionConnected, setIsSessionConnected] = useState(
    realm.syncSession?.isConnected() ?? false,
  )
  useEffect(() => {
    const connectionStateChangeNotification = (newConnectionState: ConnectionState) => {
      setIsSessionConnected(newConnectionState === "connected")
    }
    realm.syncSession?.addConnectionNotification(connectionStateChangeNotification)
    return () => {
      realm.syncSession?.removeConnectionNotification(connectionStateChangeNotification)
    }
  }, [realm.syncSession])
  return (
    <ThemedScrollView
      backgroundColor={
        Platform.OS === "ios" ? colors.iosSettingBackground : "white"
      }
    >
      <List.Section title="Status">
        <List.Item
          title={t("Connection state")}
          right={({ color }) => (
            <>
              {ConnectionState ? (
                <Text style={{ color }}>{t("Connected")}</Text>
              ) : (
                <Text style={{ color }}>{t("Disconnected")}</Text>
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
              <FontAwesomeIconWrapper name="play" iconSize={10 * scale} />
            </TouchableOpacity>
          )}
        />
      </List.Section>
      <AccountList />
      <Divider />

      <List.Section title="Runtime info" titleStyle={{ fontWeight: "bold" }}>
        <List.Item
          title={"Expo version"}
          right={({ color }) => <Text style={{color}}>{Constants.expoRuntimeVersion ?? "Empty"}</Text>}
        />
        <List.Item
          title={"Expo Go version"}
          right={({ color }) => <Text style={{color}}>{Constants.expoVersion}</Text>}
        />
        <List.Item
          title={"Device name"}
          right={({ color }) => <Text style={{color}}>{Constants.deviceName}</Text>}
        />
        <List.Item
          title={"Debug mode"}
          right={({ color }) => (
            <Text style={{ color }}>{Constants.debugMode}</Text>
          )}
        />
      </List.Section>
    </ThemedScrollView>
  )
}

export default SettingScreen
