import styled from "styled-components/native"
import Button from "../components/Button"
import { View } from "react-native"
import BottomToolbar from "../components/BottomToolbar"

const FigmaSampleScreen = () => {
  return (
    <CenteredBlackProfile>
      <Button style={{ borderColor: "brown", borderWidth: 3 }}>
        <Text89>reason</Text89>
      </Button>
      <View>
        <HintText>Show more</HintText>
      </View>
      <ArtistOfConsiderText>
        An artist of considerable range, Jessica name taken by Melbourne …
      </ArtistOfConsiderText>
      <Line />
      <AlbumText>Album</AlbumText>

      <ViewAllText>View All</ViewAllText>
      <Card1>
        <IMG>
          <Mask />
          <Mask />
        </IMG>
        <>
          <Mask />
          <Mask />
        </>
      </Card1>
      <JessicaJones27Text>Jessica Jones, 27</JessicaJones27Text>
      <View>
        <BG />
        <MessageText>MESSAGE</MessageText>
      </View>
      <View>
        <BG />
        <ConnectText>CONNECT</ConnectText>
      </View>
      <IMG>
        <View>
          <IMGImage />
        </View>
      </IMG>
      <COMMENTS>
        <Text89>89</Text89>
        <CommentsText>Comments</CommentsText>
      </COMMENTS>
      <View>
        <PhotosText>Photos</PhotosText>
      </View>

      <ProfileText>Profile</ProfileText>
      <JessicaJones27Text>27</JessicaJones27Text>
      <TitlebarText>Titlebar</TitlebarText>
      <BottomToolbar style={{height: 120}}/>
    </CenteredBlackProfile>
  )
}
export default FigmaSampleScreen

const CustomText = styled.Text`
  font-family: Open Sans;
  font-weight: regular;
`

const CenteredBlackProfile = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  background-color: #ffffff;
`

const BG = styled.View`
  background-color: #ffff00;
`

const HintText = styled(CustomText)`
  text-align: center;
  vertical-align: top;
  color: #5e72e4;
`
const ArtistOfConsiderText = styled.Text`
  text-align: center;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;

  color: #525f7f;
`
const Line = styled.View`
  background-color: #e9ecef;
`
const AlbumText = styled.Text`
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  color: #525f7f;
`
const ViewAllText = styled.Text`
  text-align: center;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;

  color: #5e72e4;
`
const Card1 = styled.View``
const Mask = styled.View`
  background-color: #ffffff;
`
/* eslint react-native/no-raw-text: 0 */
const JessicaJones27Text = styled.Text`
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;

  color: #32325d;
`

const MessageText = styled.Text`
  text-align: left;
  vertical-align: top;
  font-weight: bold;
  color: #ffffff;
`

const ConnectText = styled(CustomText)`
  text-align: left;
  vertical-align: top;
  font-weight: bold;
  color: #ffffff;
`
const IMG = styled.View``
const IMGImage = styled.View``
const COMMENTS = styled.View``
const Text89 = styled.Text`
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  color: #525f7f;
`
const CommentsText = styled.Text`
  text-align: left;
  vertical-align: top;
  color: #525f7f;
`

const PhotosText = styled(CustomText)`
  text-align: left;
  vertical-align: top;
  color: #525f7f;
`

const ProfileText = styled.Text`
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  color: #ffffff;
`

const TitlebarText = styled.Text`
  text-align: left;
  vertical-align: top;
  font-weight: bold;
  color: #000000;
`
