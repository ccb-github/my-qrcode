import { useEffect, useRef, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  Pressable
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
const { scale } = Dimensions
const { useRealm } = RealmContext

export default function ProfileScreen({ navigation }) {
  const colorScheme = useColorScheme()
  const user = useUser()
  const realm = useRealm()
  const { t } = useTranslation("profile")
  useEffect(() => {
    console.log(realm.objects)
    if (user === null)
      throw new Error("You must login first to see this screen")
  }, [user])

  const UserProfileData = ({
    profileKeyList,
  }: {
    profileKeyList: string[];
    dataSubmitAction: (dataObj: any) => Promise<void>;
  }) => {
    const userData = useRef({})
    const [editable, toggleEditable] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      (async () => {
        const { email, name } = await user.refreshCustomData()
        console.log("Current user id", user?.id)
        console.log("Current user data", { email, name })
        userData.current = { email, name }
        setLoading(false)
      })().catch((error) => {
        throw error
      })
    })
    return (
      // TODO profile title style
      <List.Section title={"Info"}>
        {/* Profile Email */}
        {profileKeyList.map((profileKey) => (
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
                placeholder={t(userData.current[profileKey])}
                editable={editable}
                placeholderTextColor="#003f5c"
                onChangeText={(value) => (userData.current[profileKey] = value)}
              />
            </View>
            <Divider />
          </>
        ))}

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
            <Button style={{ backgroundColor: "#4b7bec" }}>
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
  };

  /**
   * Use mongodb client service to edit custom user data
   */
  async function submitUserCustomData(userData: any) {
    const mongo = user.mongoClient("mongodb-atlas")

    const collection = mongo
      .db(APP_DATABASE_NAME)
      .collection(USER_CUSTOM_DATA_COLLECTION)
    const filter = {
      _userId: user.id, // Query for the user object of the logged in user
    }
    console.log(`The submit data`, userData)
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
    <View style={screenStyleByTheme({ colorTheme: colorScheme })}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <UserProfileData
            profileKeyList={["email", "name"]}
            dataSubmitAction={submitUserCustomData}
          />
          <Divider />

          {/* Interaction */}
          <View style={styles.logoutView}>
            <TouchableOpacity
              style={styles.interactButton}
              onPress={() => navigation.navigate(RouteNameMain["modalScanner"])}
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
import { borderStyle } from "../../__test__/helper"
import { useTranslation } from "react-i18next"
import Button from "../../components/Button"
import { RouteNameMain } from "../../navigation/const"
//TODO Adjust to scale
const styles = StyleSheet.create({
  flexItemView: {
    flex: 1,
    alignItems: "center",
  },
  coverImage: { width: "100%", ...borderStyle },
  profileContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileFieldView: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileFieldFootView: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailValue: {
    fontFamily: "SSBold",
    fontSize: 8 * scale,
  },
  emailField: {
    fontFamily: "SSRegular",
    paddingHorizontal: 8 * scale,
    fontSize: 5 * scale,
    color: "#333",
    marginTop: 4,
  },
  interactButtonsView: {
    flexDirection: "row",
    marginTop: 10 * scale,
    paddingHorizontal: 10 * scale,
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
  scanButton: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#4b7bec",
    margin: 5,
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    padding: 4 * scale,
    marginVertical: 2 * scale,
    marginLeft: 8 * scale,
    marginRight: 8 * scale,
    borderWidth: 1,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 18 * scale,
    width: "70%",
    height: 18 * scale,
    marginBottom: 8 * scale,

    alignItems: "center",
  },

  profileContentButtonsView: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#f1f3f6",
  },
  showContentButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#000",
  },
  showContentButtonText: {
    fontFamily: "SSRegular",
    fontSize: 18,
  },
})
