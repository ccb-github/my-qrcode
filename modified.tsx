import { useEffect, useRef, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native"

import RealmContext from "../../realm/RealmContext"
import { useUser } from "@realm/react"
import { Divider, List, Switch, Tooltip } from "react-native-paper"
import Dimensions from "../../style/Dimensions"
import {
  APP_DATABASE_NAME,
  USER_CUSTOM_DATA_COLLECTION,
} from "../../../mongo-setting.json"
import { screenStyleByTheme } from "../../style/common"
import { useTranslation } from "react-i18next"
import Button from "../../components/Button"
import { RouteNameMain } from "../../navigation/const"
import { type UserProfile } from "../../type/user"
import { type RootTabScreenProps } from "../../type/props"

// TODO Adjust to scale
const { scale } = Dimensions
const { useRealm } = RealmContext

export default function ProfileScreen({ navigation }: RootTabScreenProps) {
  const colorScheme = useColorScheme()
  const { t } = useTranslation("profile")
  const user = useUser()
  const realm = useRealm()
  useEffect(() => {
    console.log(realm.objects)
    if (user === null)
      throw new Error("You must login first to see this screen")
  }, [user])

  const UserProfileData = ({
    profileKeyList,
  }: {
    profileKeyList: string[]
    dataSubmitAction: (dataObj: any) => Promise<void>
  }) => {
    const userData = useRef<UserProfile>()

    const [editable, toggleEditable] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      ;(async () => {
        // const { email, name } = await user.refreshCustomData()
        // console.log("Current user id", user?.id)
        // console.log("Current user data", { email, name })
        userData.current = (await user?.refreshCustomData()) as UserProfile
        setLoading(false)
      })().catch((error) => {
        throw error
      })
    }, [])
    return (
      // TODO profile title style
      <List.Section title={"Info"}>
        {/* Profile Email */}
        {loading ? (
          profileKeyList.map((profileKey) => (
            <>
              <View style={styles.profileFieldView} key={profileKey}>
                <Text style={styles.emailField}>{profileKey}</Text>
                {/* {editable ? ( */}
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderColor: editable ? "red" : "black",
                      borderRadius: 8,
                    },
                  ]}
                  placeholder={t(userData.current![profileKey])}
                  editable={editable}
                  placeholderTextColor="#003f5c"
                  onChangeText={(value) =>
                    (userData.current[profileKey] = value)
                  }
                />
              </View>
              <Divider />
            </>
          ))
        ) : (
          <ActivityIndicator size="large" />
        )}

        <View style={styles.profileFieldFootView}>
          <View style={styles.flexItemView}>
            <Tooltip title="Activate edit">
              <Switch
                value={editable}
                onValueChange={() => {
                  toggleEditable(!editable)
                  console.log("This is the state right now", editable)
                }}
              />
            </Tooltip>
          </View>
          <View style={styles.flexItemView}>
            <Button
              style={{ backgroundColor: "#4b7bec" }}
              onPress={() => {
                submitUserCustomData(userData.current).then(() => {
                  setLoading(true)
                  toggleEditable(false)
                })
              }}
            >
              {t("Submit")}
            </Button>
            {/* <TouchableOpacity
              style={styles.interactButton}
              disabled={!editable}
              onPress={() => {
                dataSubmitAction(userData.current).then(() => {
                  setLoading(true);
                  toggleEditable(false);
                });
              }}
            >
              <Text style={styles.interactButtonText}>{t("Submit")}</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </List.Section>
    )
  }

  /**
   * Use mongodb client service to edit custom user data
   */
  async function submitUserCustomData(userData: Partial<UserProfile> = {}) {
    // TODO should I check every time?
    if (user === null)
      throw new Error("You must login first to see this screen")
    const mongo = user.mongoClient("mongodb-atlas")

    const collection = mongo
      .db(APP_DATABASE_NAME)
      .collection(USER_CUSTOM_DATA_COLLECTION)
    const filter = {
      _userId: user.id, // Query for the user object of the logged in user
    }
    console.log("The submit data", userData)
    const updateDoc = { $set: userData }
    try {
      const result = await collection.findOneAndUpdate(filter, updateDoc)
      console.log("Service result", result)
      const customUserData = await user.refreshCustomData()
      console.log(customUserData)
    } catch (error) {
      throw new Error(error)
    }
  }
  return (
    <View style={screenStyleByTheme({ colorScheme })}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <UserProfileData
            profileKeyList={["email", "name"]}
            dataSubmitAction={submitUserCustomData}
          />
          <Divider />

          {/* Interaction */}
          <View>
            <TouchableOpacity
              style={styles.interactButton}
              onPress={() => navigation.navigate(RouteNameMain.modalScanner)}
            >
              <Text style={styles.interactButtonText}>{t("Scan")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <List.Section title="Subscription">
          <List.Item
            title={"Expo version"}
            right={({ color, style }) => (
              <Pressable
                style={[{ backgroundColor: "red" }, style]}
                onPress={() => {}}
                onLongPress={() => {
                  console.log(realm.objects("Product").length)
                }}
              >
                <Text>toggle</Text>
              </Pressable>
            )}
          />
          <List.Item
            title={"Expo Go version"}
            right={({ color }) => <Text>{"Extra"}</Text>}
          />
        </List.Section>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  flexItemView: {
    flex: 1,
    alignItems: "center",
  },
  profileContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileFieldView: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileFieldFootView: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailField: {
    fontFamily: "SSRegular",
    paddingHorizontal: 8 * scale,
    fontSize: 5 * scale,
    color: "#333",
    marginTop: 4,
  },
  interactButton: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  interactButtonText: {
    fontFamily: "SSBold",
    color: "#fff",
    fontSize: 18,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    padding: 4 * scale,
    marginVertical: 2 * scale,
    marginLeft: 8 * scale,
    marginRight: 8 * scale,
    borderWidth: 1,
  },
})
