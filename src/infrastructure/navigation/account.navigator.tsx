import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AccountNavigator = (): JSX.Element => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
