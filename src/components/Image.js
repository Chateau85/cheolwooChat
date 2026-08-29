import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imgBtnBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled.Text`
  color: ${({ theme }) => theme.imgBtnIcon};
  font-size: 11px;
  font-weight: 700;
`;

const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer
      accessibilityLabel="프로필 사진 변경"
      accessibilityRole="button"
      onPress={onPress}
    >
      <ButtonIcon>편집</ButtonIcon>
    </ButtonContainer>
  );
};

const Container = styled.View`
  margin-bottom: 30px;
`;

const ProfileImage = styled.Image`
  background-color: ${({ theme }) => theme.imgBackground};
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Image = ({ url, showButton, onChangePhoto }) => {
  const _handlePhotoBtnPress = async () => {
    if (Platform.OS !== "web") {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        Alert.alert("사진 권한 필요", "설정에서 사진 보관함 접근을 허용해 주세요.");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]) {
      onChangePhoto(result.assets[0].uri);
    }
  };

  return (
    <Container>
      <ProfileImage source={{ uri: url }} />
      {showButton && <PhotoButton onPress={_handlePhotoBtnPress} />}
    </Container>
  );
};

Image.propTypes = {
  url: PropTypes.string,
  showButton: PropTypes.bool,
  onChangePhoto: PropTypes.func,
};

export default Image;
