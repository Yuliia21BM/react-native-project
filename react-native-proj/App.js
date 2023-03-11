import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBG}
        source={require("./assets/bg-image.jpg")}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isKeyboardShown ? 20 : 100,
            }}
          >
            <Text style={styles.titleForm}>Registration form</Text>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                onFocus={() => setIsKeyboardShown(true)}
              />
            </View>
            <View style={{ marginBottom: 40 }}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onFocus={() => setIsKeyboardShown(true)}
              />
            </View>
            <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
              <Text style={styles.btnText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </KeyboardAvoidingView>
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
    justifyContent: "flex-end",
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
    marginHorizontal: 30,
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
    fontSize: 18,
    padding: 10,
  },
  btn: {
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "#fff",
      },
      android: {
        backgroundColor: "green",
      },
    }),
  },
  btnText: {
    fontSize: 18,
    fontWeight: 500,
    ...Platform.select({
      ios: {
        color: "green",
      },
      android: {
        color: "#fff",
      },
    }),
  },
});
