/* eslint-disable react-native/no-color-literals */
import {
  Text,
  useColorScheme,
  type GestureResponderEvent,
  useWindowDimensions,
} from "react-native"
import { Searchbar } from "react-native-paper"
import Dimensions from "../../style/Dimensions"
import { type FontAwesome } from "@expo/vector-icons"
import { FontAwesomeIconWrapper } from "../../components/Icon"
import { RouteNameMain } from "../../navigation/const"
import { useTranslation } from "react-i18next"
import { type RootTabHomeScreenProps } from "../../type/props"
import {
  StyledFlexColumnView,
  StyledFlexRowView,
  StyledSafeAreaView,
} from "../../components/styledTemplate"
import styled from "styled-components/native"
const { getHeight } = Dimensions

const NavigationAreaContainer = styled(StyledFlexColumnView)<{height: string}>`
  flex: 1;
  height: ${(props) => props.height};
`
const NavigationButtonView = styled.TouchableOpacity<{ height: number }>`
  aspect-ratio: 3 / 2;
  height: ${(props) => props.height};
  margin: 40;
  border-radius: 7;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

export default function HomeScreen({ navigation }: RootTabHomeScreenProps) {
  const theme = useColorScheme()
  // const [searchBarValue, setSearchBarValue] = useState(t("Search here"))
  const isDarkTheme = theme === "dark"
  const { t } = useTranslation("home")
  console.log(`The theme ${theme}`)

  /** TODO unused code
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
    <NavigationButtonView onPress={onPress} height={40 * scale}>
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
    </NavigationButtonView>
  )
  const { height, scale } = useWindowDimensions()
  return (
    <StyledSafeAreaView height={height}>
      <Searchbar
        placeholder="Search"
        onChange={(value) => {}}
        value={"Holder"}
      />
      {/* Navigate to another screen */}
      <StyledFlexColumnView style={{ flexGrow: 1 }}>
        <StyledFlexRowView flex={"1"} style={{ flex: 1, width: "100%" }}>
          <NavigationAreaContainer height={`${50 * scale}`}>
            <NavigationButton
              iconName={"qrcode"}
              onPress={() => {
                navigation.navigate(RouteNameMain.modalScanner)
              }}
              text={t("scanner")}
            />
          </NavigationAreaContainer>
          <NavigationAreaContainer height={`${50 * scale}`}>
            <NavigationButton
              iconName={"bitbucket"}
              onPress={() => {
                navigation.navigate(RouteNameMain.storageInspect)
              }}
              text={t("storage")}
            />
          </NavigationAreaContainer>
        </StyledFlexRowView>
        <StyledFlexRowView flex={"1"} style={{ flex: 1, width: "100%" }}>
          <NavigationAreaContainer height={`${50 * scale}`}>
            <NavigationButton
              iconName={"history"}
              onPress={() => {
                navigation.navigate(RouteNameMain.record)
              }}
              text="history"
            />
          </NavigationAreaContainer>
        </StyledFlexRowView>
      </StyledFlexColumnView>
    </StyledSafeAreaView>
  )
}
