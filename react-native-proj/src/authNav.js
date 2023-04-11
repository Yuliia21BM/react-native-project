import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

const MainStack = createStackNavigator();

export default function AuthNav() {
  return (
    <MainStack.Navigator
      initialRouteName="Registration"
      screenOptions={{
        backgroundColor: "#FFF",
      }}
    >
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      />
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
    </MainStack.Navigator>
  );
}
