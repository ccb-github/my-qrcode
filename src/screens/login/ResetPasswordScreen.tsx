import { useApp } from "@realm/react"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native"
import Dimensions from "../../style/Dimensions"
import { RouteNameLogin } from "../../navigation/const"
import { type LoginStackResetPasswordScreenProps } from "../../type/navigation"

const { scale } = Dimensions

export default function ResetPasswordScreen({
  navigation,
  route,
}: LoginStackResetPasswordScreenProps) {
  const [email, setEmail] = useState("")
  const realmApp = useApp()

  const { t } = useTranslation("reset")
  const resetPasswordForEmailAccount = async () => {
    if (email === "") {
      console.log("loginEmpty")
      alert("Please fill all the field")
      return
    }
    try {
      await realmApp.emailPasswordAuth.sendResetPasswordEmail({ email })
      alert("password-reset-email-sended")
    } catch (error) {
      alert(error?.message)
      console.log("Reset password error")
      console.error("Maybe", error)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/favicon.png")} />
      <StatusBar style="auto" />
      <View
        style={[
          styles.inputView,
          {
            borderRadius: 18 * scale,
            width: "70%",
            height: 18 * scale,
            marginBottom: 8 * scale,
          },
        ]}
      >
        <TextInput
          style={[
            styles.textInput,
            {
              padding: 4 * scale,
              marginLeft: 8 * scale,
              marginRight: 8 * scale,
            },
          ]}
          value={email}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => {
            setEmail(email)
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(RouteNameLogin.login)
        }}
      >
        <Text>{t("Login")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.forgetBtn,
          {
            borderRadius: 10 * scale,
            height: 20 * scale,
            marginTop: 16 * scale,
          },
        ]}
        onPress={() => resetPasswordForEmailAccount}
      >
        <Text>{t("Send")}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
  },
  forgetBtn: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF1493",
  },
})
