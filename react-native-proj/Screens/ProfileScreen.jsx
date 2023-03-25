import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Image,
  FlatList,
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import defaultPhoto from "../assets/images/default-photo.jpg";
import defaultPage from "../assets/images/default-img.jpg";
import PostItem from "../components/PostItem";

// const posts = [
//   {
//     photo: defaultPage,
//     name: "Forest",
//     lacotion: "Ivano-Frankivs'k Region, Ukraine",
//     id: "111",
//     comments: 0,
//     likes: 3,
//   },
//   {
//     photo: defaultPage,
//     name: "Forest",
//     lacotion: "Ivano-Frankivs'k Region, Ukraine",
//     id: "112",
//     comments: 0,
//   },
//   {
//     photo: defaultPage,
//     name: "Forest",
//     lacotion: "Ivano-Frankivs'k Region, Ukraine",
//     id: "113",
//     comments: 0,
//   },
// ];

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBG}
        source={require("../assets/bg-image.jpg")}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{
                alignSelf: "flex-end",
                marginBottom: 46,
                paddingRight: 16,
              }}
            />
            <View style={styles.photoDef}>
              <Image
                source={defaultPhoto}
                style={{ width: "100%", height: "100%", borderRadius: 16 }}
              />
              <AntDesign
                name="pluscircleo"
                size={24}
                color="#BDBDBD"
                style={styles.addPhotoIcon}
              />
            </View>
            <Text style={styles.title}>Yulia Mykhailiuk</Text>
            {/* <FlatList
              data={posts}
              renderItem={({ item }) => <PostItem item={item} />}
              keyExtractor={(item) => item.id}
              style={{ gap: 34 }}
            /> */}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
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
  title: {
    fontFamily: "RobotoMed",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 33,
  },
  form: {
    position: "relative",
    paddingTop: 22,
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
    backgroundColor: "#fff",
    borderRadius: 24 / 2,
    transform: [{ rotate: "-45deg" }],
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
