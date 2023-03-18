import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Button } from "react-native";

import CreatePostScreen from "./Screens/CreatePostsScreen";
import PostScreen from "./Screens/PostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const Tabs = createBottomTabNavigator();

export default function BottomTabsNav() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "PostScreen") {
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
      <Tabs.Screen
        name="PostScreen"
        options={{
          title: "Posts",
          headerTitleAlign: "center",
          headerRight: () => (
            <Feather name="log-out" size={24} color="#BDBDBD" />
          ),
          headerRightContainerStyle: { paddingRight: 10 },
        }}
        component={PostScreen}
      />
      <Tabs.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          title: "Create post",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color="rgba(33, 33, 33, 0.8);"
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 16 },
          tabBarStyle: { display: "none" },
        }}
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
});
