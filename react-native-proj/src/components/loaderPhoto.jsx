import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";

export const LoaderPhoto = ({ iconSize }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Animatable.View
        animation="rotate"
        iterationCount="infinite"
        duration={1000}
      >
        <FontAwesome name="spinner" size={iconSize} color="#FF6C00" />
      </Animatable.View>
    </View>
  );
};
