import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  selectIsCurrentUser,
  selectisLoading,
} from "./redux/auth/authSelectors";
import { authStateChanged } from "./redux/auth/authOperations";

import AuthNav from "./authNav";
import BottomTabsNav from "./bottomTabsNav";
import LoaderScreen from "./Screens/LoaderSrceen";

export default function Main() {
  const isCurrentUser = useSelector(selectIsCurrentUser);
  const isLoading = useSelector(selectisLoading);
  const [fontsLoaded] = useFonts({
    RobotoReg: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMed: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCurrentUser) return;
    dispatch(authStateChanged());
  }, []);

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
  if (isLoading) {
    return <LoaderScreen iconSize={70} />;
  }
  return (
    <NavigationContainer>
      {isCurrentUser ? <BottomTabsNav /> : <AuthNav />}
    </NavigationContainer>
  );
}
