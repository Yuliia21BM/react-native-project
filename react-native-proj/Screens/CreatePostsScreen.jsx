import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

export default function CreatePostScreen() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.photoWrap}>
            {/* <Image/> */}
            <TouchableOpacity
              style={styles.addPhotoIconWrap}
              activeOpacity={0.8}
            >
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginBottom: 48 }} activeOpacity={0.8}>
            <Text style={styles.text}>Upload photo</Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 32 }}>
            <TextInput placeholder="Title..." style={styles.input} />
          </View>
          <View style={{ marginBottom: 32, position: "relative" }}>
            <TextInput
              placeholder="Location"
              style={{ ...styles.input, paddingLeft: 28 }}
            />
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={{ position: "absolute" }}
            />
          </View>
          <TouchableOpacity
            // onPress={onSubmitForm}
            style={styles.btn}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.deleteBtn}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 32,
  },
  photoWrap: {
    position: "relative",
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
  },
  addPhotoIconWrap: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60 / 2,
  },
  text: {
    fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    placeholderTextColor: "#BDBDBD",
    fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 15,
  },
  btn: {
    backgroundColor: "#F6F6F6",
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
    color: "#BDBDBD",
  },
  deleteBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    alignSelf: "center",
    marginTop: "auto",
  },
});
