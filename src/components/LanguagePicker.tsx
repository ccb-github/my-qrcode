import { useState } from "react"
import { useTranslation } from "react-i18next"
  import { Modal, View, Text, Pressable, StyleSheet, Alert, ViewStyle } from "react-native"
import styled from "styled-components/native"
import { StyledTextByAbsoluteSize } from "./styled/text"

const CenteredText = styled(StyledTextByAbsoluteSize)`
  text-align: center
`

const ModalView = styled(View)<{$style: ViewStyle}>`
  background-color: white;
  border-radius: 10px;
  padding: 80px;
  justify-content: center;
  align-items: center;
  shadow-color: brown;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;

`

function LanguagePicker() {
  const [modalVisible, setModalVisible] = useState(false)
  const { i18n } = useTranslation() // i18n instance

  enum LanguageText {
    "de" = "Deutsch",
    "en" = "English",
    "fr" = "Français",
    "be" = "Беларуская",
    "es" = "Español",
    "ch" = "中文",
  }
  // Array with all supported languages
  const languages: 
    Array<{
    
        name: keyof typeof LanguageText
        label: LanguageText
      
    }>
   = [
    { name: "de", label: LanguageText["de"] },
    { name: "en", label: LanguageText["en"] },
    { name: "fr", label: LanguageText["fr"] },
    { name: "be", label: LanguageText["be"] },
    { name: "es", label: LanguageText["es"] },
    { name: "ch", label: LanguageText["ch"] },
  ]


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
          <ModalView $style={{
            shadowOffset: {
      width: 5,
      height: 20,
    },
          }}>
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
        <CenteredText size={ 15}>{LanguageText[i18n.language as keyof typeof LanguageText]}</CenteredText>
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
