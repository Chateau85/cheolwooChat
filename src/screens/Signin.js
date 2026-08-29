import React, { useContext, useMemo, useRef, useState } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import { Button, Image, Input, ErrorMessage } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signin } from "../firebase";
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { getAuthErrorMessage, normalizeEmail, validateEmail } from "../utils";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const LOGO =
  "https://firebasestorage.googleapis.com/v0/b/rn-chat-9ce10.appspot.com/o/icon.png?alt=media";

const Signin = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const refPassword = useRef(null);
  const disabled = useMemo(
    () => !email || !password || Boolean(errorMessage) || isSubmitting,
    [email, password, errorMessage, isSubmitting]
  );

  const _handleEmailChange = (email) => {
    const changedEmail = normalizeEmail(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? "" : "Please verify your email"
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(password);
  };

  const _handleSigninBtnPress = async () => {
    try {
      setIsSubmitting(true);
      const user = await signin({ email, password });
      navigation.replace("Profile", { user });
    } catch (e) {
      Alert.alert("로그인 실패", getAuthErrorMessage(e));
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
        <Container insets={insets}>
        <Image url={LOGO} />
        <Input
          label="Email"
          placeholder="Email"
          returnKeyType="next"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <Input
          ref={refPassword}
          label="Password"
          placeholder="Password"
          returnKeyType="done"
          value={password}
          onChangeText={_handlePasswordChange}
          isPassword={true}
          onSubmitEditing={_handleSigninBtnPress}
        />
        <ErrorMessage message={errorMessage} />
        <Button
          title={isSubmitting ? "Signing in..." : "Sign in"}
          onPress={_handleSigninBtnPress}
          disabled={disabled}
        />
        <Button
          title="or sign up"
          onPress={() => navigation.navigate("Signup")}
          containerStyle={{ marginTop: 0, backgroundColor: "transparent" }}
          textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
        />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signin;
