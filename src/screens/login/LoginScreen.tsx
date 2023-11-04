import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native"
import realmApp from "../../realm/app"
import Dimensions from "../../style/Dimensions"
import { useTranslation } from "react-i18next"
import LanguagePicker from "../../components/LanguagePicker"
import { Title } from "react-native-paper"
import { type LoginStackLoginScreenProps } from "../../type/navigation"
import i18n from "../../lib/i18-next"
import styled from "styled-components/native"
import { StyledTextByAbsoluteSize } from "../../components/styled/text"
import { StyledFlexColumnView } from "../../components/styled/view"

const { scale } = Dimensions

const InputView = styled.View<{ scale: number }>`
  background-color: #ffc0cb;
  border-radius: ${({ scale }) => "18"}px;
  width: 70%;
  height: ${({ scale }) => 18 * scale}px;
  margin-bottom: 8px;

  align-items: center;
`
const ScreenContainer = styled(StyledFlexColumnView)`
  background-color: blue;
  flex-direction: column;
  height: 100%;
`

export default function LoginScreen({
  navigation,
}: LoginStackLoginScreenProps) {
  const email = useRef("")
  const password = useRef("")
  const [loginLoading, setLoginLoading] = useState(false)

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
      <View style={styles.titleView}>
        <Title style={styles.textInput}>
          <Text>{`XX${t("Traceability system")}`}</Text>
        </Title>
      </View>
      <Image
        source={require("../../../assets/favicon.png")}
        style={styles.image}
      />

      <InputView scale={scale}>
        <TextInput
          style={styles.textInput}
          placeholder={t("Email")}
          placeholderTextColor="#003f5c"
          onChangeText={(value) => {
            email.current = value
          }}
        />
      </InputView>
      <InputView scale={scale}>
        <TextInput
          style={styles.textInput}
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
          <ForgetPasswordText scale={scale} size={10}>{t("Forgot Password")}</ForgetPasswordText>
        </TouchableOpacity>
        <LanguagePicker />
      </View>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={loginWithEmailAndPassword}
      >
        <Text>{t("Login")}</Text>
        {loginLoading ? <ActivityIndicator size={"small"} /> : null}
      </TouchableOpacity>
       {/*
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => {
          navigation.navigate("Reset", { email: email.current })
        }}
      >
        <Text>{t("Sign up")}</Text>
      </TouchableOpacity> */}
    </ScreenContainer>
  )
}
const ForgetPasswordText = styled(StyledTextByAbsoluteSize)<{
  scale: number
  size: number
}>`
  text-decoration-line: underline;
  /* height: 12 * scale; */
  margin-bottom: ${(props) => 12 * props.scale}px;
`
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 10 * scale,
  },

  titleView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 18 * scale,
    width: "70%",
    marginBottom: 8 * scale,
    alignItems: "center",
  },

  textInput: {
    flex: 1,
    padding: 4 * scale,
    marginLeft: 8 * scale,
    marginRight: 8 * scale,
  },

  forgotPasswordText: {
    height: 12 * scale,
    marginBottom: 12 * scale,
  
  },

  actionBtn: {
    width: "80%",
    borderRadius: 10 * scale,
    height: 20 * scale,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16 * scale,
    backgroundColor: "#FF1493",
  },
})
