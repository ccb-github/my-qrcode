import { useCallback, useEffect, useState } from "react"
import {
  Text,
  View,
  ScrollView,
  useColorScheme,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native"

import RealmContext from "#/atlas-app-services/RealmContext"
import { useUser } from "@realm/react"
import { Divider, List, Switch, Tooltip } from "react-native-paper"
import {
  APP_DATABASE_NAME,
  USER_CUSTOM_DATA_COLLECTION,
} from "../../../mongo-setting.json"
import { screenStyleByTheme } from "#/style/common"
import { useTranslation } from "react-i18next"
import Button from "#/components/Button"
import { type EditableUserProfile } from "#/type/user"
import { type RootTabProfileScreenProps } from "#/type/props"
import styled from "styled-components/native"
import {
  StyledFlexItemView,
  StyledFlexRowTouchableOpacity,
  StyledFlexRowView,
} from "#/components/styled/view"
import { StyledTextByAbsoluteSize } from "#/components/styled/text"
import { RouteNameMain } from "#/navigation/const"
import { ImageField } from "#/components/field"
import { Product } from "#/atlas-app-services/models/Producer/Product"

const { useRealm } = RealmContext
const ProfileFieldView = styled.View`
  flex-direction: row;
  align-items: center;
`
/**
 * @param scale {number} The number this view scale to
 */
const ProfileFieldValueInput = styled.TextInput<{
  scale: number
  editable: boolean
}>`
  flex: 1;
  padding: ${(props) => 4 * props.scale}px;
  margin-top: ${(props) => 4 * props.scale}px;
  margin-bottom: ${(props) => 4 * props.scale}px;
  margin-left: ${(props) => 8 * props.scale}px;
  margin-right: ${(props) => 8 * props.scale}px;
  border-width: 1px;
  border-color: ${(props) => (props.editable ? "#f00" : "#fff")};
  border-radius: 8px;
`
const ProfileContainerView = styled.View`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
const InteractionButtonText = styled(StyledTextByAbsoluteSize)<{
  size: number
}>`
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
  const userData: Partial<Record<keyof EditableUserProfile, string>> = {}

  const UserProfileData: React.FC = ({
    displayProfileKeyList: profileKeyList,
    userData: userDataProp,
    fetchUserData,
  }:{
    displayProfileKeyList: Array<keyof EditableUserProfile>
    userData: Partial<EditableUserProfile>
    dataSubmitAction: (dataObj: unknown) => Promise<void>
    fetchUserData: () => Promise<Partial<EditableUserProfile>>
  }) => {
    const [userData, setUserData] = useState<
      Partial<Record<keyof EditableUserProfile, string>>
    >({})
    const [editable, toggleEditable] = useState(false)

    const { scale } = useWindowDimensions()

    useEffect(() => {
      (async () => {
        setUserData((await user?.refreshCustomData()) ?? {})
      })().catch((error) => {
        throw error
      })
    }, [])
    const EmailFieldText = styled(StyledTextByAbsoluteSize)<{
      scale: number
    }>`
      font-family: SSRegular;
      padding: ${({scale}) => `${4 * scale}px ${4 * scale}px`};
      font-size: ${({scale}) => `${10 * scale}px`};
      background-color: #f0f;
      color: #333;
      margin-top: ${({scale}) => `${2 * scale}px`};
    `
    //${10 * scale}px
    return (
      // TODO profile title style
      <List.Section title={"Info"}>
        {/* Profile View */}
        {userData !== null ? (
          profileKeyList.map((profileKey) => (
            <>
              <ProfileFieldView key={profileKey}>
                <EmailFieldText scale={scale} size={ 10 * scale }>{profileKey}</EmailFieldText>
                {/* {editable ? ( */}
                <ProfileFieldValueInput
                  scale={scale}
                  placeholder={t(userData?.[profileKey] ?? "")}
                  editable={editable}
                  placeholderTextColor="#003f5c"
                  onChangeText={(value) => (userData[profileKey] ??= value)}
                />
              </ProfileFieldView>
              <Divider />
            </>
          ))
        ) : (
          <ActivityIndicator size="large" />
        )}

        <StyledFlexRowView>
          <StyledFlexItemView>
            <Tooltip title="Activate edit">
              <Switch
                value={editable}
                onValueChange={() => {
                  toggleEditable(!editable)
                  console.log("This is the state right now", editable)
                }}
              />
            </Tooltip>
          </StyledFlexItemView>
          <StyledFlexItemView>
            <Button
              style={{ backgroundColor: "#4b7bec" }}
              onPress={() => {
                submitUserCustomData(userData)
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
          </StyledFlexItemView>
        </StyledFlexRowView>
      </List.Section>
    )
  }

  const { scale } = useWindowDimensions()
  useEffect(() => {
    if (user === null)
      throw new Error("You must login first to see this screen")
    ;(async () => {
      console.log("The length",realm.objects(Product).length)
    })().catch((error) => {
      throw error
    })
  }, [user])

  const fetchUserData = useCallback(async () => {
    return (await user?.refreshCustomData()) as EditableUserProfile
  }, [user])

  

  /**
   * Use mongodb client service to edit custom user data
   */
  async function submitUserCustomData(userData: Partial<EditableUserProfile> = {}) {
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
      throw error
    }
  }
  return (
    <View style={screenStyleByTheme({ colorScheme: colorScheme ?? "light" })}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileContainerView>
          <UserProfileData
            userData={userData}
            displayProfileKeyList={["email", "name"]}
            fetchUserData={fetchUserData}
            dataSubmitAction={submitUserCustomData}
          />
          <Divider />

          {/* Interaction view */}
          <View>
            <StyledFlexRowTouchableOpacity
              onPress={() => {
                navigation.push(RouteNameMain.modalScanner)
              }}
            >
              <InteractionButtonText size={9 * scale}>
                {t("Scan")}
              </InteractionButtonText>
            </StyledFlexRowTouchableOpacity>
          </View>
        </ProfileContainerView>
        <ImageField name={t("brand")} value={"https://picsum.photos/200/300?random=97;" ?? "Empty"} />

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
