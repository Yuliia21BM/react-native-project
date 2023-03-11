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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import { useState, useEffect } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function App() {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [fontsLoaded] = useFonts({
    "Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
  });

  const onKeyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const onSubmitForm = () => {
    onKeyboardHide();
    setFormData(initialState);
  };

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
    <TouchableWithoutFeedback onPress={onKeyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBG}
          source={require("./assets/bg-image.jpg")}
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
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
                  value={formData.email}
                  style={styles.input}
                  onEndEditing={onKeyboardHide}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setFormData((prevS) => ({ ...prevS, email: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 40 }}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  value={formData.password}
                  style={styles.input}
                  secureTextEntry={true}
                  onEndEditing={onKeyboardHide}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setFormData((prevS) => ({ ...prevS, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                onPress={onSubmitForm}
                style={styles.btn}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
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
    color: "#fff",
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
