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
  TouchableHighlight,
} from "react-native";

import { useState, useEffect } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [formData, setFormData] = useState(initialState);
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
    console.log(formData);
    setFormData(initialState);
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

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
                paddingBottom: isKeyboardShown ? 32 : 78,
              }}
            >
              <Text style={styles.titleForm}>Log In</Text>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  placeholder="Email"
                  value={formData.email}
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
                    focusedInput === "input2" && styles.focusedTextInput,
                  ]}
                  onFocus={() => {
                    handleFocus("input2");
                    setIsKeyboardShown(true);
                  }}
                  onBlur={handleBlur}
                  secureTextEntry={isShownPassword}
                  onEndEditing={onKeyboardHide}
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
                <Text style={styles.btnText}>LOG IN</Text>
              </TouchableOpacity>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#dcdcdc"
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.linkText}>
                  Don't have an account? REGISTER
                </Text>
              </TouchableHighlight>
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
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  titleForm: {
    fontFamily: "RobotoMed",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 33,
  },
  form: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    fontFamily: "RobotoReg",
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
    fontFamily: "RobotoReg",
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
  },
  btnText: {
    fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },

  linkText: {
    color: "#1B4371",
    fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
