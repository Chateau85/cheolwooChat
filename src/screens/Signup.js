import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { Button, ErrorMessage, Image, Input } from "../components";
import { signup } from "../firebase";
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { getAuthErrorMessage, normalizeEmail, validateSignup } from "../utils";

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
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);

  const _handleSignupBtnPress = async () => {
    const validationMessage = validateSignup({ name, email, password, passwordConfirm });
    setErrorMessage(validationMessage);
    if (validationMessage) return;

    try {
      setIsSubmitting(true);
      const user = await signup({ name: name.trim(), email, password, photo });
      navigation.replace("Profile", { user });
    } catch (e) {
      Alert.alert("회원가입 실패", getAuthErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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
          onChangeText={(value) => setEmail(normalizeEmail(value))}
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
          onChangeText={setPasswordConfirm}
          isPassword={true}
          onSubmitEditing={_handleSignupBtnPress}
        />
        <ErrorMessage message={errorMessage} />
        <Button
          title={isSubmitting ? "Signing up..." : "Sign up"}
          onPress={_handleSignupBtnPress}
          disabled={isSubmitting}
        />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
