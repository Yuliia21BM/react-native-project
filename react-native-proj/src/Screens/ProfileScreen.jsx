import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  selectOwnPosts,
  selectisLoadingPosts,
} from "../redux/posts/postsSelectors";
import * as ImagePicker from "expo-image-picker";

import { AntDesign, Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uploadPhotoToServer } from "../utils/uploadPhotoToServer";
import { authLogout, authUpdateAvatar } from "../redux/auth/authOperations";
import { getOwnPosts } from "../redux/posts/postsOperations";
import { selectAvatar, selectUserName } from "../redux/auth/authSelectors";
import PostItem from "../components/PostItem";
import LoaderScreen from "./LoaderSrceen";
import { LoaderPhoto } from "../components/loaderPhoto";
import { selectIsLoadingPhotoToServer } from "../redux/auth/authSelectors";
import { updateIsLoadingPhotoToServer } from "../redux/auth/authSlice";

export default function ProfileScreen() {
  const avatar = useSelector(selectAvatar);
  const userName = useSelector(selectUserName);
  const posts = useSelector(selectOwnPosts);
  const isLoadingPosts = useSelector(selectisLoadingPosts);
  const isLoadingPhotoToServer = useSelector(selectIsLoadingPhotoToServer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnPosts());
  }, []);

  const selectImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    dispatch(updateIsLoadingPhotoToServer(true));

    if (pickerResult.canceled === true) {
      return;
    }

    const source = pickerResult.assets[0].uri;
    const uploadedPhoto = await uploadPhotoToServer(source, "avatars");
    dispatch(authUpdateAvatar(uploadedPhoto));
    dispatch(updateIsLoadingPhotoToServer(false));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBG}
        source={require("../img/bg-image.jpg")}
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
              onPress={() => dispatch(authLogout())}
            />
            <View style={styles.photoDef}>
              {isLoadingPhotoToServer && <LoaderPhoto iconSize={25} />}
              <Image
                source={avatar && { uri: avatar }}
                style={{ width: "100%", height: "100%", borderRadius: 16 }}
              />
              {!avatar ? (
                <TouchableOpacity
                  style={styles.addPhotoIcon}
                  activeOpacity={0.8}
                  onPress={selectImage}
                >
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.addPhotoIcon}
                  activeOpacity={0.8}
                  onPress={() => dispatch(authUpdateAvatar(null))}
                >
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color="#dad9d9"
                    style={{ backgroundColor: "#fff", borderRadius: 50 }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.title}>{userName}</Text>
            {isLoadingPosts ? (
              <View style={{ height: 400 }}>
                <LoaderScreen iconSize={60} />
              </View>
            ) : (
              <FlatList
                data={posts}
                renderItem={({ item }) => <PostItem item={item} />}
                keyExtractor={(item) => item.idPost}
                style={{ height: 450 }}
              />
            )}
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
