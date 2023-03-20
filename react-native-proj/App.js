import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import AuthNav from "./authNav";
import BottomTabsNav from "./bottomTabsNav";
import CommentsScreen from "./Screens/CommentsScreen";

import { createStackNavigator } from "@react-navigation/stack";
const MainStack = createStackNavigator();

export default function App() {
  const [isRegistered, setIsRegistered] = useState(true);
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
      {/* {isRegistered ? <BottomTabsNav /> : <AuthNav />} */}
      <MainStack.Navigator
        initialRouteName="Comments"
        screenOptions={{
          backgroundColor: "#FFF",
        }}
      >
        <MainStack.Screen
          options={() => ({
            headerTitleAlign: "center",
            headerLeft: () => (
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
                // onPress={() => navigation.goBack()}
              />
            ),
            headerLeftContainerStyle: { paddingLeft: 16 },
          })}
          name="Comments"
          component={CommentsScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
