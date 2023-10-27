import { View, Text } from "react-native"

import styled from "styled-components/native"

const FigmaSampleScreen = () => {
  return (
    <>
      <Profile>
        {/* <HEADER>
<BGImage />
</HEADER> */}
        {/* <CARD> */}
        <BG />
        <SHOWMORE>
          <DEFAULT>
            <ShowmoreText>Show more</ShowmoreText>
          </DEFAULT>
          <HOVER>
            <ShowmoreText>Show more</ShowmoreText>
          </HOVER>
        </SHOWMORE>
        <AnartistofconsideText>
          An artist of considerable range, Jessica name taken by Melbourne …
        </AnartistofconsideText>
        <LINE />
        {/* <SanFrancisco,USAText>San Francisco, USA</SanFrancisco,USAText> */}
        {/* <albumcopy>
      <AlbumText>Album</AlbumText>
      <ViewAllText>View All</ViewAllText>
      <Card1>
        <img>
          <Mask />
          <Mask />
          <photo-1501601983405-7c7cabaa1581Image />
        </img>
        <img>
          <Mask />
          <Mask />
          <photo-1543747579-795b9c2c3adaImage />
        </img>
        <imgcopy>
          <Mask />
          <Mask />
          <photo-1550945771-515f118cef86Image />
        </imgcopy>
        <imgcopy4>
          <Mask />
          <Mask />
          <photo-1470225620780-dba8ba36b745Image />
        </imgcopy4>
        <imgcopy3>
          <Mask />
          <Mask />
          <denysImage />
        </imgcopy3>
        <imgcopy2>
          <Mask />
          <Mask />
          <photo-1482686115713-0fbcaced6e28Image />
        </imgcopy2>
      </Card1>
    </albumcopy>
    <JessicaJones,27Text>Jessica Jones, 27</JessicaJones,27Text> */}
        <MESSAGE>
          <DEFAULT>
            <BG />
            <MESSAGEText>MESSAGE</MESSAGEText>
          </DEFAULT>
        </MESSAGE>
        <CONNECT>
          <DEFAULT>
            <BG />
            <CONNECTText>CONNECT</CONNECTText>
          </DEFAULT>
        </CONNECT>
        <IMG>
          <DEFAULT>
            <IMGImage />
          </DEFAULT>
        </IMG>
        <COMMENTS>
          <Text89>89</Text89>
          <CommentsText>Comments</CommentsText>
        </COMMENTS>
        <PHOTOS>
          <PhotosText>Photos</PhotosText>
        </PHOTOS>

        <ProfileText>Profile</ProfileText>

        <TielebarText>Tiele bar</TielebarText>
      </Profile>
    </>
  )
}
export default FigmaSampleScreen
const Profile = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  background-color: #ffffff;
`
const HEADER = styled.View`
  height: 100px;
  width: 345px;
`
const BGImage = styled.View`
  height: 100px;
  width: 345px;
`
const CARD = styled.View`
  height: 833px;
  width: 345px;
`
const BG = styled.View`
  border-radius: 4px;
  height: 771px;
  width: 345px;
  background-color: #ffffff;
`
const SHOWMORE = styled.View`
  height: 22px;
  width: 83px;
`
const DEFAULT = styled.View`
  height: 22px;
  width: 83px;
`
const ShowmoreText = styled.Text`
  max-width: 83px;
  text-align: center;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;
  font-size: 16px;
  letter-spacing: -0.3px;
  line-height: 22px;
  color: #5e72e4;
`
const HOVER = styled.View`
  height: 22px;
  width: 83px;
`
const AnartistofconsideText = styled.Text`
  max-width: 306px;
  text-align: center;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;
  font-size: 16px;
  letter-spacing: -0.3px;
  line-height: 27px;
  color: #525f7f;
`
const LINE = styled.View`
  height: 1px;
  width: 294px;
  background-color: #e9ecef;
`
const SanFranciscoUSAText = styled.Text`
  max-width: 137px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: light;
  font-size: 16px;
  line-height: 22px;
  color: #32325d;
`
const albumcopy = styled.View`
  height: 245px;
  width: 200px;
  background-color: #ffffff;
`
const AlbumText = styled.Text`
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #525f7f;
`
const ViewAllText = styled.Text`
  text-align: center;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;
  font-size: 12px;
  line-height: 17px;
  color: #5e72e4;
`
const Card1 = styled.View`
  height: 182px;
  width: 200px;
`
const img = styled.View`
  height: 88px;
  width: 63px;
`
const Mask = styled.View`
  border-radius: 6px;
  height: 88px;
  width: 63px;
  background-color: #ffffff;
`
const photo_10 = styled.View`
  height: 90px;
  width: 96px;
`
const photo1543747579795b9c2c3adaImage = styled.View`
  height: 88px;
  width: 84px;
`
const imgcopy = styled.View`
  height: 88px;
  width: 63px;
`
const photo1550945771515f118cef86Image = styled.View`
  height: 90px;
  width: 96px;
`
const imgcopy4 = styled.View`
  height: 88px;
  width: 63px;
`
const photo1470225620780dba8ba36b745Image = styled.View`
  height: 91px;
  width: 99px;
`
const imgcopy3 = styled.View`
  height: 88px;
  width: 63px;
`
const denysImage = styled.View`
  height: 94px;
  width: 101px;
`
const imgcopy2 = styled.View`
  height: 88px;
  width: 63px;
`
const photo14826861157130fbcaced6e28Image = styled.View`
  height: 103px;
  width: 110px;
`
const JessicaJones27Text = styled.Text`
  max-width: 211px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;
  font-size: 28px;
  line-height: 38px;
  color: #32325d;
`
const MESSAGE = styled.View`
  height: 28px;
  width: 75px;
`
const MESSAGEText = styled.Text`
  max-width: 56px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.09px;
  line-height: 17px;
  color: #ffffff;
`
const CONNECT = styled.View`
  height: 28px;
  width: 77px;
`
const CONNECTText = styled.Text`
  max-width: 59px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.09px;
  line-height: 17px;
  color: #ffffff;
`
const IMG = styled.View`
  height: 127px;
  width: 124px;
`
const IMGImage = styled.View`
  height: 127px;
  width: 124px;
`
const COMMENTS = styled.View`
  height: 48px;
  width: 73px;
`
const Text89 = styled.Text`
  max-width: 21px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.13px;
  line-height: 24px;
  color: #525f7f;
`
const CommentsText = styled.Text`
  max-width: 73px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 19px;
  color: #525f7f;
`
const PHOTOS = styled.View`
  height: 48px;
  width: 47px;
`
const Text10 = styled.Text`
  max-width: 21px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.13px;
  line-height: 24px;
  color: #525f7f;
`
const PhotosText = styled.Text`
  max-width: 47px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 19px;
  color: #525f7f;
`
const FRIENDS = styled.View`
  height: 48px;
  width: 49px;
`
const Text2k = styled.Text`
  max-width: 22px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.13px;
  line-height: 24px;
  color: #525f7f;
`
const FriendsText = styled.Text`
  max-width: 49px;
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: regular;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 19px;
  color: #525f7f;
`
const Navigation1Copy = styled.View`
  height: 20px;
  width: 218px;
  background-color: #ffffff;
`

const navRightImage = styled.View`
  transform: rotate(-180deg);
  height: 15px;
  width: 7px;
`
const ProfileText = styled.Text`
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
`

const basketImage = styled.View`
  height: 16px;
  width: 18px;
`
const TielebarText = styled.Text`
  text-align: left;
  vertical-align: top;
  font-family: Open Sans;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
`
