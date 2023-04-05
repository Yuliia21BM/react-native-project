import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import { selectIsCurrentUser } from "./redux/auth/authSelectors";

import AuthNav from "./authNav";
import BottomTabsNav from "./bottomTabsNav";

export default function Main() {
  const isCurrentUser = useSelector(selectIsCurrentUser);
  const [fontsLoaded] = useFonts({
    RobotoReg: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMed: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something wetn wrong. Please reload the page!</Text>
      </View>
    );
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <NavigationContainer>
      {isCurrentUser ? <BottomTabsNav /> : <AuthNav />}
    </NavigationContainer>
  );
}