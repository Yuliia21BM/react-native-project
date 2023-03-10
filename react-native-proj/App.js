import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from "react-native";

// const bgImage = require("./assets/bg.avif");

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBG}
        source={require("./assets/ice-cream-1-min.jpg")}
      >
        <View style={styles.form}>
          <Text style={styles.titleForm}>Registration form</Text>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput style={styles.input} />
          </View>
          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageBG: {
    flex: 1,
    resizeMode: "containe",
    justifyContent: "center",
    // alignItems: "center",
  },
  titleForm: {
    color: "green",
    fontSize: 30,
    alignSelf: "center",
    fontWeight: 500,
    backgroundColor: "rgba(225,225,225, 0.8)",
  },
  form: {
    marginHorizontal: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 10,
  },
  input: {
    borderColor: "hotpink",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "white",
    fontSize: 20,
    padding: 10,
  },
});
