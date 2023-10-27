/* eslint-disable react-native/no-color-literals */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  type GestureResponderEvent,
  SafeAreaView,
  useWindowDimensions,
} from "react-native"
import { Searchbar } from "react-native-paper"
import Dimensions from "../../style/Dimensions"
import { type FontAwesome } from "@expo/vector-icons"
import { FontAwesomeIconWrapper } from "../../components/Icon"
import { RouteNameMain } from "../../navigation/const"
import { useTranslation } from "react-i18next"
import { type RootTabHomeScreenProps } from "../../type/props"

const { getHeight } = Dimensions

export default function HomeScreen({ navigation }: RootTabHomeScreenProps) {
  const theme = useColorScheme()
  // const [searchBarValue, setSearchBarValue] = useState(t("Search here"))
  const isDarkTheme = theme === "dark"
  const { t } = useTranslation("home")
  console.log(`The theme ${theme}`)

  /* TODO unused code
    // const coolMusic = "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
    // const [play, pause, stop, data] = useSound(coolMusic);
  */

  const NavigationButton = ({
    iconName,
    text,
    onPress,
  }: {
    iconName?: React.ComponentProps<typeof FontAwesome>["name"]
    text: string
    onPress: (event: GestureResponderEvent) => void
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.navigationButton,
        { flexDirection: "row", alignItems: "center" },
      ]}
    >
      {iconName !== undefined ? (
        <FontAwesomeIconWrapper
          name={iconName}
          size={getHeight(15)}
          style={{ marginRight: 5 }}
        />
      ) : null}
      <Text
        style={{
          textAlign: "center",
          color: isDarkTheme ? "#FFF" : "#000",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
  // const handlePlay = () => {
  //   if (data.isPlaying) pause()
  //   else play()
  // }
  const { height } = useWindowDimensions()
  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        backgroundColor: isDarkTheme ? "black" : "white",
        height,
      }}
    >
      <Searchbar
        placeholder="Search"
        onChange={(value) => {}}
        value={"Holder"}
      />
      {/* Navigation to another screen */}
      <View style={{ flexDirection: "column", flexGrow: 1 }}>
        <View style={{ flexDirection: "row", flex: 1, width: "100%" }}>
          <View style={styles.navigationAreaContainer}>
            <NavigationButton
              iconName={"qrcode"}
              onPress={() => {
                navigation.navigate(RouteNameMain.modalScanner)
              }}
              text={t("scanner")}
            />
          </View>
          <View style={styles.navigationAreaContainer}>
            <NavigationButton
              iconName={"bitbucket"}
              onPress={() => {
                navigation.navigate(RouteNameMain.storageInspect)
              }}
              text={t("storage")}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={styles.navigationAreaContainer}>
            <NavigationButton
              iconName={"history"}
              onPress={() => {
                navigation.navigate(RouteNameMain.record)
              }}
              text="history"
            />
          </View>
          {/* <View
            style={{
              ...styles.navigationAreaContainer,
              borderColor: "yellow",
              borderWidth: 2
            }}
          >
            <NavigationButton
              iconName={"info"}
              onPress={() => {}}
              text={t("info")}
            />
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  )
}

// TODO Adjust to scale
const styles = StyleSheet.create({
  navigationAreaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderColor: "red",
    borderWidth: 2,
    height: getHeight(50),
  },
  navigationButton: {
    aspectRatio: 3 / 2,
    height: getHeight(40),
    margin: 40,
    borderRadius: 7,
    justifyContent: "center",
  },
})
