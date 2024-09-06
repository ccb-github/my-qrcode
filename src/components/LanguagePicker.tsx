import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal, View, Text, Pressable, StyleSheet, Alert } from "react-native"
import styled from "styled-components/native"
import { StyledTextByAbsoluteSize } from "./styled/text"
import { StyledFlexRowView } from "./styled/view"

const CenteredText = styled(StyledTextByAbsoluteSize)`
  text-align: center
`

const ModalView = styled(View)`
  background-color: white;
  border-radius: 10px;
  padding: 80px;
  justify-content: center;
  align-items: center;
  shadow-color: black;
  /* Shadow offset*/
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  //elevation: 5;

`

function LanguagePicker() {
  const [modalVisible, setModalVisible] = useState(false)
  const { i18n } = useTranslation() // i18n instance

  // Array with all supported languages
  const languages = [
    { name: "de", label: "Deutsch" },
    { name: "en", label: "English" },
    { name: "fr", label: "Français" },
    { name: "be", label: "Беларуская" },
    { name: "es", label: "Español" },
    { name: "ch", label: "中文" },
  ]

  enum languageDict {
    "de" = "Deutsch",
    "en" = "English",
    "fr" = "Français",
    "be" = "Беларуская",
    "es" = "Español",
    "ch" = "中文",
  }
  const LanguageItem = ({ name, label }: { name: string; label: string }) => (
    <Pressable
      style={styles.button}
      onPress={() => {
        i18n.changeLanguage(name).then( () => {
          Alert.alert(i18n.language)
        }).catch((error) => {
          console.error(error)
          throw error
        }) // changes the app language
      
        setModalVisible(!modalVisible)
      }}
    >
      <Text style={styles.textStyle}>{label}</Text>
    </Pressable>
  )

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <ModalView>
            {languages.map((lang) => (
              <LanguageItem {...lang} key={lang.name} />
            ))}
          </ModalView>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true)
        }}
      >
        {/* displays the current app language */}
        <CenteredText size={ 15}>{languageDict[i18n.language]}</CenteredText>
      </Pressable>
    </View>
  )
}

export default LanguagePicker

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: "#f36293fd",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
})
