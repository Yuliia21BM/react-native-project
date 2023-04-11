import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { View, StyleSheet } from "react-native";

export default function LoaderScreen({ iconSize }) {
  return (
    <View style={styles.loaderWrap}>
      <Animatable.View
        animation="rotate"
        iterationCount="infinite"
        duration={1000}
      >
        <FontAwesome name="spinner" size={iconSize} color="#FF6C00" />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
