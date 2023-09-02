/* eslint-disable react/react-in-jsx-scope */
import { StatusBar } from "expo-status-bar"
import { useRef, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native"
import realmApp from "../../realm/app"
import Dimensions from "../../style/Dimensions"
import { useTranslation } from "react-i18next"
import LanguagePicker from "../../components/LanguagePicker"
import { Title } from "react-native-paper"

const { scale } = Dimensions

export default function LoginScreen ({ navigation }) {
  const email = useRef("")
  const password = useRef("")
  const [loading, setLoading] = useState(false)

  const { t } = useTranslation("login")
 
  const loginWithEmailAndPassword = async () => {
    if (email.current === "" || password.current === "") {
      console.log("loginEmpty")
      alert("Please fill all the field")
      return
    }
    try {
      setLoading(true)
      console.log("Cred create start")
      const emailPasswordCred = Realm.Credentials.emailPassword(email.current, password.current)
      const loginUser = await realmApp.logIn(emailPasswordCred)
      console.log(`Login with user ${loginUser.id}`)
    } catch (error) {
      Alert.alert(t("error"), error?.message || "No specific message",
        [{ text: t("Ok") }]
      )

      console.error("Login error", error)
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <Title style={styles.textInput}>{`XX${t(
          "Traceability system"
        )}`}</Title>
      </View>
      <Image
        source={require("../../../assets/favicon.png")}
        style={styles.image}
      />

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder={t("Email")}
          placeholderTextColor="#003f5c"
          onChangeText={(value) => {
            email.current = value;
          }}
        />
      </View>

      <View style={[styles.inputView, {}]}>
        <TextInput
          style={styles.textInput}
          placeholder={t("Password")}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(value) => {
            password.current = value
          }}
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Reset", { email })
          }}
        >
          <Text style={styles.forgotPasswordText}>{t("Forgot Password")}</Text>
        </TouchableOpacity>
        <LanguagePicker />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={loginWithEmailAndPassword}
      >
        <Text>{t("Login")}</Text>
        {loading ? <ActivityIndicator size={"small"} /> : null}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={navigation.navigate("Reset", { email })}
      >
        <Text>{t("Sign up")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  image: {
    marginBottom: 10 * scale
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 18 * scale,
    width: "70%",
    height: 18 * scale,
    marginBottom: 8 * scale,

    alignItems: "center"
  },

  textInput: {
    flex: 1,
    padding: 4 * scale,
    marginLeft: 8 * scale,
    marginRight: 8 * scale

  },

  forgotPasswordText: {
    height: 12 * scale,
    marginBottom: 12 * scale,
    textDecorationLine: "underline"
  },

  loginBtn: {
    width: "80%",
    borderRadius: 10 * scale,
    height: 20 * scale,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16 * scale,
    backgroundColor: "#FF1493"
  }

})
/*
import {render, screen, fireEvent} from '@testing-library/react-native'
test('examples of some things', async () => {
  const expectedUsername = 'admin@domain.com'

  render(<LoginScreen navigation={undefined} />)

  fireEvent.changeText(screen.getByTestId('input'), expectedUsername)
  fireEvent.press(screen.getByText('Print Username'))

  // Using `findBy` query to wait for asynchronous operation to finish
  const usernameOutput = await screen.findByTestId('printed-username')

  // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
  expect(usernameOutput).toHaveTextContent(expectedUsername)

  expect(screen.toJSON()).toMatchSnapshot()
})

 */
