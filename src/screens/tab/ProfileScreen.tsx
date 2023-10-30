import { useEffect, useMemo, useState } from "react"
import {
  Text,
  View,
  ScrollView,
  useColorScheme,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native"

import RealmContext from "../../realm/RealmContext"
import { useUser } from "@realm/react"
import { Divider, List, Switch, Tooltip } from "react-native-paper"
import {
  APP_DATABASE_NAME,
  USER_CUSTOM_DATA_COLLECTION,
} from "../../../mongo-setting.json"
import { screenStyleByTheme } from "../../style/common"
import { useTranslation } from "react-i18next"
import Button from "../../components/Button"
import { type UserProfile } from "../../type/user"
import { type RootTabProfileScreenProps } from "../../type/props"
import styled from "styled-components/native"
import {
  FlexItemView,
  StyledFlexRowTouchableOpacity,
  StyledFlexRowView,
  StyledTextByAbsoluteSize,
} from "../../components/styledTemplate"

const { useRealm } = RealmContext
const ProfileFieldView = styled.View`
  flex-direction: "row";
  align-items: "center";
`
/**
 * @param scale {number} The pr
 */
const ProfileFieldValueTextInput = styled.TextInput<{
  scale: number
  editable: boolean
}>`
  flex: 1;
  padding: ${(props) => 4 * props.scale}px;
  margin-top: ${(props) => 2 * props.scale}px;
  margin-bottom: ${(props) => 2 * props.scale}px;
  margin-left: ${(props) => 8 * props.scale}px;
  margin-right: ${(props) => 8 * props.scale}px;
  border-width: 1px;
  border-color: ${(props) => (props.editable ? "red" : "black")};
  border-radius: 8px;
`
const ProfileContainerView = styled.View`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
const InteractionButtonText = styled(StyledTextByAbsoluteSize)<{size: number}>`
  color: #fff;
  padding-left: 6px;
  padding-right: 6px;
`
export default function ProfileScreen({
  navigation,
}: RootTabProfileScreenProps) {
  const colorScheme = useColorScheme()
  const { t } = useTranslation("profile")
  const user = useUser()
  const realm = useRealm()
  const { scale } = useWindowDimensions()
  useEffect(() => {
    console.log(realm.objects)
    if (user === null)
      throw new Error("You must login first to see this screen")
  }, [user])

  function UserProfileData<ProfileKey extends keyof UserProfile>({
    profileKeyList,
  }: {
    profileKeyList: string[]
    dataSubmitAction: (dataObj: any) => Promise<void>
  }) {
    let userData = useMemo<Map<ProfileKey, unknown> | null>(() => null, [])
    const [editable, toggleEditable] = useState(false)
    useEffect(() => {
      ;(async () => {
        // const { email, name } = await user.refreshCustomData()
        // console.log("Current user id", user?.id)
        // console.log("Current user data", { email, name })
        const resultData = (await user?.refreshCustomData()) as UserProfile
        userData = new Map(
          Object.entries(resultData) as Array<[ProfileKey, unknown]>,
        )
      })().catch((error) => {
        throw error
      })
    }, [])
    const EmailFieldText = styled(StyledTextByAbsoluteSize)`
      font-family: "SSRegular";
      padding: "8px 0px";
      font-size: 5;
      color: "#333";
      margin-top: 4;
    `
    return (
      // TODO profile title style
      <List.Section title={"Info"}>
        {/* Profile Email */}
        {userData !== null ? (
          profileKeyList.map((profileKey) => (
            <>
              <ProfileFieldView key={profileKey}>
                <EmailFieldText size={5 * scale}>{profileKey}</EmailFieldText>
                {/* {editable ? ( */}
                <ProfileFieldValueTextInput
                  scale={scale}
                  placeholder={t(userData![profileKey])}
                  editable={editable}
                  placeholderTextColor="#003f5c"
                  onChangeText={(value) => (userData![profileKey] = value)}
                />
              </ProfileFieldView>
              <Divider />
            </>
          ))
        ) : (
          <ActivityIndicator size="large" />
        )}

        <StyledFlexRowView>
          <FlexItemView>
            <Tooltip title="Activate edit">
              <Switch
                value={editable}
                onValueChange={() => {
                  toggleEditable(!editable)
                  console.log("This is the state right now", editable)
                }}
              />
            </Tooltip>
          </FlexItemView>
          <FlexItemView>
            <Button
              style={{ backgroundColor: "#4b7bec" }}
              onPress={() => {
                submitUserCustomData(Object.fromEntries(userData!))
                  .then(() => {
                    toggleEditable(false)
                  })
                  .catch((error) => {
                    throw error
                  })
              }}
            >
              {t("Submit")}
            </Button>
          </FlexItemView>
        </StyledFlexRowView>
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

    const collection = user
      .mongoClient("mongodb-atlas")
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
        <ProfileContainerView>
          <UserProfileData
            profileKeyList={["email", "name"]}
            dataSubmitAction={submitUserCustomData}
          />
          <Divider />

          {/* Interaction view */}
          <View>
            <StyledFlexRowTouchableOpacity
              onPress={() => {
                navigation.push("modalScanner")
              }}
            >
              <InteractionButtonText size={9 * scale}>
                {t("Scan")}
              </InteractionButtonText>
            </StyledFlexRowTouchableOpacity>
          </View>
        </ProfileContainerView>
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


