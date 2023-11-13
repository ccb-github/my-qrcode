/* eslint-disable react-native/no-color-literals */
import {
  Text,
  useColorScheme,
  type GestureResponderEvent,
  useWindowDimensions,
} from "react-native"
import { Searchbar } from "react-native-paper"
import { type FontAwesome } from "@expo/vector-icons"
import { FontAwesomeIconWrapper } from "../../components/Icon"
import { RouteNameMain } from "../../navigation/const"
import { useTranslation } from "react-i18next"
import { type RootTabHomeScreenProps } from "../../type/props"
import {
  StyledFlexColumnView,
  StyledFlexRowView,
  StyledSafeAreaView,
} from "../../components/styled/view"
import styled, { css } from "styled-components/native"

const NavigationAreaContainer = styled(StyledFlexColumnView)<{
  height?: number
  width?: number
}>`
  flex: 1;
  border: red solid 1px;
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
  `}
`

// const StyledView = styled.View((props) => ({
//   borderWidth: "3px",
//   borderColor: "black",
//   borderRadius: "10px",
//   height: "60px",
// }))
const NavigationButtonView = styled.TouchableOpacity`
  aspect-ratio: 3 / 2;
  border-radius: 7px;
  min-width: 100px;
  padding: 20px;
  border-width: 2px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

export default function HomeScreen({ navigation }: RootTabHomeScreenProps) {
  const theme = useColorScheme()
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
    <NavigationButtonView onPress={onPress}>
      {iconName !== undefined ? (
        <FontAwesomeIconWrapper
          name={iconName}
          size={15 * scale}
          style={{ marginRight: 5 }}
        />
      ) : null}
      <Text
        style={{
          color: isDarkTheme ? "#FFF" : "#000",
        }}
      >
        {text}
      </Text>
    </NavigationButtonView>
  )
  const { height, scale } = useWindowDimensions()
  return (
    <StyledSafeAreaView height={height - 150}>
      <Searchbar
        placeholder="Search"
        onChange={(value) => {}}
        value={"Holder"}
      />
      {/* Navigate to another screen */}
      <StyledFlexColumnView style={{ flexGrow: 1 }}>
        <StyledFlexRowView flex={1} style={{ flex: 1, width: "100%" }}>
          <NavigationAreaContainer>
            <NavigationButton
              iconName={"qrcode"}
              onPress={() => {
                navigation.push(RouteNameMain.modalScanner)
              }}
              text={t("scanner")}
            />
          </NavigationAreaContainer>
          <NavigationAreaContainer width={50}>
            <NavigationButton
              iconName={"bitbucket"}
              onPress={() => {
                navigation.navigate(RouteNameMain.storageInspect)
              }}
              text={t("storage")}
            />
          </NavigationAreaContainer>
        </StyledFlexRowView>
        <StyledFlexRowView flex={1} style={{ width: "100%" }}>
          <NavigationAreaContainer width={100}>
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
