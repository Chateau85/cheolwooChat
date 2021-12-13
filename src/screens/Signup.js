import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { Button, Image, Input } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signup } from "../firebase";
import { Alert } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 50px 20px;
`;

const DEFAULT_PHOTO =
  "https://firebasestorage.googleapis.com/v0/b/rn-chat-9ce10.appspot.com/o/face.png?alt=media";

const Signup = ({ navigation }) => {
  const [photo, setPhoto] = useState(DEFAULT_PHOTO);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPAsswordConfirm] = useState("");

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);

  const _handleSignupBtnPress = async () => {
    try {
      const user = await signup({ name, email, password, photo });
      navigation.navigate("Profile", { user });
    } catch (e) {
      Alert.alert("Signup Error", e.message);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Image showButton={true} url={photo} onChangePhoto={setPhoto} />
        <Input
          label="Name"
          placeholder="Name"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => refEmail.current.focus()}
        />
        <Input
          ref={refEmail}
          label="Email"
          placeholder="Email"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <Input
          ref={refPassword}
          label="Password"
          placeholder="Password"
          returnKeyType="next"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          onSubmitEditing={() => refPasswordConfirm.current.focus()}
        />
        <Input
          ref={refPasswordConfirm}
          label="Password Confirm"
          placeholder="Password"
          returnKeyType="done"
          value={passwordConfirm}
          onChangeText={setPAsswordConfirm}
          isPassword={true}
          onSubmitEditing={_handleSignupBtnPress}
        />
        <Button title="Sign up" onPress={_handleSignupBtnPress} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
