import React from "react";
import styled from "styled-components/native";
import { Button } from "../components";
import { signout } from "../firebase";
import { Alert } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Profile = ({ navigation }) => {
  const handleSignout = async () => {
    try {
      await signout();
      navigation.reset({ index: 0, routes: [{ name: "Signin" }] });
    } catch {
      Alert.alert("로그아웃 실패", "잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <Container>
      <Button title="Sign out" onPress={handleSignout} />
    </Container>
  );
};
export default Profile;
