import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { authLogout } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const Stack = createStackNavigator();

import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import PostScreen from "./PostsScreen";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="PostScreen">
      <Stack.Screen
        name="PostScreen"
        options={{
          title: "Posts",
          headerTitleAlign: "center",
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              onPress={() => dispatch(authLogout())}
            />
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
