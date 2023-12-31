import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  useWindowDimensions,
} from "react-native"
import realmApp from "../../realm/app"
import { useTranslation } from "react-i18next"
import LanguagePicker from "../../components/LanguagePicker"
import { type LoginStackLoginScreenProps } from "../../type/navigation"
import i18n from "../../lib/i18-next"
import styled from "styled-components/native"
import { StyledTextByAbsoluteSize } from "../../components/styled/text"
import { StyledFlexColumnView } from "../../components/styled/view"

import fonts from "../../style/fonts"
import { type ScaleStyledProps } from "../../style/common"

const ScreenContainer = styled(StyledFlexColumnView)`
  flex-direction: column;
`
const InputView = styled.View<{ scale: number }>`
  background-color: #ffc0cb;
  border-radius: ${({ scale }) => "18"}px;
  width: 70%;
  height: ${({ scale }) => 18 * scale}px;
  margin-bottom: 8px;
  align-items: center;
`

const ForgetPasswordText = styled(StyledTextByAbsoluteSize)<{
  scale: number
  size: number
}>`
  text-decoration-line: underline;
  /* height: 12 * scale; */
  margin-bottom: ${(props) => 12 * props.scale}px;
`

const TitleText = styled(StyledTextByAbsoluteSize)<ScaleStyledProps>`
  padding: ${({ scale }) => 4 * scale}px;
  margin-top: ${({ scale }) => 15 * scale}px;
  margin-bottom: ${({ scale }) => 15 * scale}px;
  background-color: red;
  border-radius: 40px;
  margin-left: ${({ scale }) => 8 * scale}px;
  margin-right: ${({ scale }) => 8 * scale}px;
`
const InputField = styled.TextInput<ScaleStyledProps>`
  flex: 1;
  padding: ${({ scale }) => 4 * scale}px;
  margin-left: ${({ scale }) => 8 * scale}px;
  margin-right: ${({ scale }) => 8 * scale}px;
`

const IconImage = styled(Image)<ScaleStyledProps>`
  margin-bottom: ${({ scale }) => 10 * scale}px;
`

const ActionButton = styled.TouchableOpacity<ScaleStyledProps>`
  width: 80%;
  border-radius: ${({ scale }) => scale * 10}px;
  height: ${({ scale }) => scale * 20}px;
  align-items: center;
  justify-content: center;
  margin-top: ${({ scale }) => scale * 16}px;
  background-color: #ff1493;
`

export default function LoginScreen({
  navigation,
}: LoginStackLoginScreenProps) {
  const email = useRef("")
  const password = useRef("")
  const [loginLoading, setLoginLoading] = useState(false)
  const { scale } = useWindowDimensions()
  const { t } = useTranslation("login")
  useEffect(() => {
    console.log(i18n.language)
  })

  const loginWithEmailAndPassword = () => {
    ;(async () => {
      if (email.current === "" || password.current === "") {
        console.log("loginEmpty")
        alert("Please fill all the field")
        return
      }
      try {
        setLoginLoading(true)
        console.log("Cred create start")
        const emailPasswordCred = Realm.Credentials.emailPassword(
          email.current,
          password.current,
        )
        const loginUser = await realmApp.logIn(emailPasswordCred)
        console.log(`Login with user ${loginUser.id}`)
      } catch (error) {
        const { message } = error
        Alert.alert(
          t("Error"),
          typeof message === "string" ? message : "No specific message",
          [{ text: t("Ok") }],
        )
        console.error("Login error", error)
        return
      } finally {
        setLoginLoading(false)
      }
    })().catch((error) => {
      throw error
    })
  }

  return (
    <ScreenContainer>
      <StatusBar style="auto" />

      <TitleText size={fonts.large} scale={scale}>{`XX${t(
        "Traceability system",
      )}`}</TitleText>

      <IconImage
        source={require("../../../assets/favicon.png")}
        scale={scale}
      />

      <InputView scale={scale}>
        <InputField
          scale={scale}
          placeholder={t("Email")}
          placeholderTextColor="#003f5c"
          onChangeText={(value) => {
            email.current = value
          }}
        />
      </InputView>
      <InputView scale={scale}>
        <InputField
          scale={scale}
          placeholder={t("Password")}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(value) => {
            password.current = value
          }}
        />
      </InputView>

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Reset", { email: email.current })
          }}
        >
          <ForgetPasswordText scale={scale} size={10}>
            {t("Forgot Password")}
          </ForgetPasswordText>
        </TouchableOpacity>
        <LanguagePicker />
      </View>
      <ActionButton scale={scale} onPress={loginWithEmailAndPassword}>
        <Text>{t("Login")}</Text>
        {loginLoading ? <ActivityIndicator size={"small"} /> : null}
      </ActionButton>
    </ScreenContainer>
  )
}
