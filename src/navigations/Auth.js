import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Signin, Signup, Profile } from "../screens";

const Stack = createStackNavigator();

const Auth = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: theme.text,
        }}
      />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default Auth;
