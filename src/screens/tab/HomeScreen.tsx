import { useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  type GestureResponderEvent
} from "react-native"
import { Searchbar } from "react-native-paper"
import Dimensions from "../../style/Dimensions"
import { borderStyle } from "../../__test__/helper"
import { FontAwesomeIconWrapper } from "../../components/Icon"
import RealmContext from "../../realm/RealmContext"
import { customerRealmSub } from "../../realm/subscription"

const { getHeight } = Dimensions
const { useRealm } = RealmContext

export default function HomeScreen ({ navigation }) {
  const theme = useColorScheme()
  const realm = useRealm()

  const isDarkTheme = theme === "dark"
  console.log(`The theme ${theme}`)

  const coolMusic =
    "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
  // const [play, pause, stop, data] = useSound(coolMusic);
  useEffect(() => {
    if (realm) {
      customerRealmSub(realm)
    }
  }, [])

  const NavigationButton = ({
    iconName,
    text,
    onPress
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
        borderStyle(2),
      ]}
    >
      {iconName !== undefined
        ? (<FontAwesomeIconWrapper
            name={iconName}
            size={getHeight(15)}
            style={{ marginRight: 5 }}
          />
        ) : null}
      <Text
        style={{
          textAlign: "center",
          color: isDarkTheme ? "white" : "black",
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
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: isDarkTheme ? "black" : "white",
        paddingTop: getHeight(5)
      }}
    >
      <ActivityIndicator
        style={{
          position: "absolute",
          alignSelf: "center",
          marginTop: 100,
          borderColor: "red"
        }}
        size="large"
        color="#2ED573"
      />
      <Searchbar placeholder="Search" onChange={value => {}} value={"Holder"} />
      {/* Navigation to another screen */}
    </View>
  )
}

// TODO Adjust to scale
const styles = StyleSheet.create({
  flexItemView: {
    flex: 1,
    alignItems: "center"
  },
  navigationAreaContainer: {
    flexDirection: "column",
    height: getHeight(200)
  },
  navigationButton: {
    aspectRatio: 3 / 2,
    height: getHeight(40),
    ...borderStyle(2),
    borderRadius: 5,
    justifyContent: "center"
  }
})
