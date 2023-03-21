import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();

import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import PostScreen from "./PostsScreen";

export default function Home() {
  return (
    <Stack.Navigator initialRouteName="PostScreen">
      <Stack.Screen
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
      <Stack.Screen
        options={() => ({
          headerTitleAlign: "center",
        })}
        name="Comments"
        component={CommentsScreen}
      />
      <Stack.Screen
        options={() => ({
          headerTitleAlign: "center",
        })}
        name="MapScreen"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
}
