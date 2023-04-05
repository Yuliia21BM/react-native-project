import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Button } from "react-native";

import CreatePostScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import Home from "./Screens/Home";

const Tabs = createBottomTabNavigator();

export default function BottomTabsNav() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
            );
          }
          if (route.name === "CreatePostScreen") {
            return (
              <View style={styles.iconAdd}>
                <Ionicons name="add" size={24} color="white" />
              </View>
            );
          }
          if (route.name === "ProfileScreen") {
            return (
              <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
            );
          }
        },
        tabBarStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          display: "none",
        },
      })}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={({ navigation }) => ({
          title: "Create Post",
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              onPress={() => navigation.navigate("PostScreen")}
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 16 },
          tabBarStyle: { display: "none" },
        })}
      />
      <Tabs.Screen
        options={{ headerShown: false }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  iconAdd: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
  header: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    elevation: 5,
  },
});
