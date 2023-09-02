import { useUser } from "@realm/react";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Button } from "react-native-paper";
import app from "../../realm/app";


export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  
  const { scale, width } = useWindowDimensions()
  const { t } = useTranslation("register")
  
  useEffect(() => {
  
  }, [])
  
  const registerWithEmailAndPassword = async () => {
    if(email === "" || password === "" || repeatPassword === ""){
      alert("Please fill all the field")
      return 
    }

    if(password != repeatPassword) {
      console.log(password, repeatPassword)
      alert("Password mismatch")
      return 
    }

    try {
      console.log("Register begin")
      await app.emailPasswordAuth.registerUser({ email, password });
      const emailPasswordCred = Realm.Credentials.emailPassword(email, password)
      const loginUser = await app.logIn(emailPasswordCred)
      console.log(`Login with user ${loginUser.id}`)
    } catch (error) {
      alert(error?.message)
      console.error(error)      
    }
    //navigation.navigate("Tab") 
  }

  const switchToLogin = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>
      <Image style={[styles.image, {marginBottom: 8 * scale}]} source={require("../../../assets/favicon.png")} />
      <StatusBar style="auto" />
      <View style={[styles.inputView, {height: 20 * scale}]}>
        <TextInput
          style={styles.textInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={[styles.inputView, {height: 20 * scale}]}>
        <TextInput
          style={styles.textInput}
          placeholder={"password"}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={[styles.inputView, {height: 20 * scale}]} >
        <TextInput
          style={styles.textInput}
          placeholder={t("Repeat Your Password.")}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
        />
      </View>
      
      <TouchableOpacity style={styles.signupBtn} onPress={registerWithEmailAndPassword}>
        <Text>{t("register")}</Text>
      </TouchableOpacity>

      <Button onPress={switchToLogin}>
       {t("login")}
      </Button>

    </View>
  );
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },
  
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
   
    marginBottom: 10,
    alignItems: "center",
  },
 
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  signupBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});

