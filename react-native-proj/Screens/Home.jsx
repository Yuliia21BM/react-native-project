import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import CreatePostScreen from "./CreatePostsScreen";
import PostScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

export default function Home() {
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
          return <Ionicons name={iconName} size={size} color={color} />;
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
        options={{ headerShown: false }}
        name="PostScreen"
        component={PostScreen}
      />
      <Tabs.Screen
        options={{ headerShown: false }}
        name="CreatePostScreen"
        component={CreatePostScreen}
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
