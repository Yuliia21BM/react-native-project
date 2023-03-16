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
  Dimensions,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import { useState, useEffect } from "react";

const initialState = {
  email: "",
  password: "",
  name: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [fontsLoaded] = useFonts({
    RobotoR: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoM: require("../../assets/fonts/Roboto-Medium.ttf"),
  });
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );
  const [isShownPassword, setIsShownPassword] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const onChangeWidth = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChangeWidth);
    // return () => {
    //   Dimensions.removeEventListener("change", onChangeWidth);
    // };
  }, []);

  const onKeyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const onSubmitForm = () => {
    onKeyboardHide();
    setFormData(initialState);
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
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
          source={require("../../assets/bg-image.jpg")}
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={100}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isKeyboardShown ? 10 : 78,
              }}
            >
              <View style={styles.photoDef}>
                <Image
                  style={styles.addPhotoIcon}
                  source={require("../../assets/images/add-photo.png")}
                />
              </View>
              <Text style={styles.titleForm}>Registration</Text>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  placeholder="Name"
                  value={formData.name}
                  style={[
                    { ...styles.input, width: dimensions },
                    focusedInput === "input1" && styles.focusedTextInput,
                  ]}
                  onFocus={() => {
                    handleFocus("input1");
                    setIsKeyboardShown(true);
                  }}
                  onBlur={handleBlur}
                  onEndEditing={onKeyboardHide}
                  onChangeText={(value) =>
                    setFormData((prevS) => ({ ...prevS, name: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  placeholder="Email"
                  value={formData.email}
                  style={[
                    { ...styles.input, width: dimensions },
                    focusedInput === "input2" && styles.focusedTextInput,
                  ]}
                  onFocus={() => {
                    handleFocus("input2");
                    setIsKeyboardShown(true);
                  }}
                  onBlur={handleBlur}
                  onEndEditing={onKeyboardHide}
                  onChangeText={(value) =>
                    setFormData((prevS) => ({ ...prevS, email: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 43, position: "relative" }}>
                <TextInput
                  placeholder="Password"
                  value={formData.password}
                  style={[
                    { ...styles.input, width: dimensions },
                    focusedInput === "input3" && styles.focusedTextInput,
                  ]}
                  onBlur={handleBlur}
                  secureTextEntry={isShownPassword}
                  onEndEditing={onKeyboardHide}
                  onFocus={() => {
                    setIsKeyboardShown(true);
                    handleFocus("input3");
                  }}
                  onChangeText={(value) =>
                    setFormData((prevS) => ({ ...prevS, password: value }))
                  }
                />
                <Text
                  style={styles.passwordModeText}
                  onPress={() => {
                    setIsShownPassword(!isShownPassword);
                  }}
                >
                  {isShownPassword ? "Show" : "Hide"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onSubmitForm}
                style={styles.btn}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>SIGN IN</Text>
              </TouchableOpacity>
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate("Login")}
              >
                Already have an account? LOG IN
              </Text>
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
  },
  titleForm: {
    fontFamily: "RobotoM",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 33,
  },
  form: {
    position: "relative",
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoDef: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addPhotoIcon: {
    position: "absolute",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
  },
  input: {
    fontFamily: "RobotoR",
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    lineHeight: 19,
    color: "#212121",
  },
  focusedTextInput: {
    borderColor: "#FF6C00",
  },
  passwordModeText: {
    position: "absolute",
    top: 20,
    right: 16,
    color: "#1B4371",
    fontFamily: "RobotoR",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    // ...Platform.select({
    //   ios: {
    //     backgroundColor: "#fff",
    //   },
    //   android: {
    //     backgroundColor: "green",
    //   },
    // }),
  },
  btnText: {
    fontFamily: "RobotoR",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  linkText: {
    color: "#1B4371",
    fontFamily: "RobotoR",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
