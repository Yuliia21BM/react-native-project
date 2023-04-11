import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  ScrollView,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadPostToStore, getAllPosts } from "../redux/posts/postsOperations";
import { uploadPhotoToServer } from "../utils/uploadPhotoToServer";

const initialState = {
  title: "",
  locationDescr: "",
  photo: "",
  location: {},
};

export default function CreatePostScreen({ navigation }) {
  const [formData, setFormData] = useState(initialState);
  const [snap, setSnap] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData((prevS) => ({ ...prevS, photo: "" }));
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setFormData((prevS) => ({
        ...prevS,
        location: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        },
      }));
    })();
  }, []);

  const selectImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }

    const source = pickerResult.assets[0].uri;
    const uploadedPhoto = await uploadPhotoToServer(source, "avatars");
    setFormData((prevS) => ({ ...prevS, photo: uploadedPhoto }));
  };

  const takeSnap = async () => {
    const { uri } = await snap.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    const uploadedPhoto = await uploadPhotoToServer(uri, "postScreen");
    setFormData((prevS) => ({ ...prevS, photo: uploadedPhoto }));
  };

  const onSubmitForm = () => {
    const id = Date.now();
    Keyboard.dismiss();
    onClearForm();
    dispatch(
      uploadPostToStore({
        photo: formData.photo,
        name: formData.title,
        locationDescr: formData.locationDescr,
        location: formData.location,
        id,
        comments: 0,
        likes: [],
        likesCounter: 0,
      })
    );
    dispatch(getAllPosts());
    navigation.navigate("PostScreen");
  };

  const reviewBTNSubmirDisabled = (disabledStyle, generalStyle) => {
    if (
      formData.locationDescr !== "" &&
      formData.title !== "" &&
      formData.photo !== ""
    ) {
      return generalStyle;
    } else {
      return disabledStyle;
    }
  };

  const onClearForm = () => {
    setFormData(initialState);
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.photoWrap}>
            {hasPermission && (
              <Camera style={{ flex: 1 }} ref={setSnap} type={type}>
                {formData.photo && (
                  <Image source={{ uri: formData.photo }} style={{ flex: 1 }} />
                )}
                <TouchableOpacity
                  style={styles.addPhotoIconWrap}
                  activeOpacity={0.8}
                  onPress={takeSnap}
                >
                  <FontAwesome name="camera" size={24} color="#fff" />
                </TouchableOpacity>
                {!formData.photo && (
                  <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Feather name="refresh-ccw" size={24} color="#fff" />
                  </TouchableOpacity>
                )}
              </Camera>
            )}
          </View>
          <TouchableOpacity
            style={{ marginBottom: 48 }}
            activeOpacity={0.8}
            onPress={() => selectImage()}
          >
            <Text style={styles.text}>Upload photo</Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 32 }}>
            <TextInput
              value={formData.title}
              placeholder="Title..."
              style={styles.input}
              onChangeText={(value) =>
                setFormData((prevS) => ({ ...prevS, title: value }))
              }
              onBlur={() => Keyboard.dismiss()}
              onEndEditing={() => Keyboard.dismiss()}
            />
          </View>
          <View style={{ marginBottom: 32, position: "relative" }}>
            <TextInput
              value={formData.locationDescr}
              placeholder="Location"
              style={{ ...styles.input, paddingLeft: 28 }}
              onChangeText={(value) =>
                setFormData((prevS) => ({ ...prevS, locationDescr: value }))
              }
              onBlur={() => Keyboard.dismiss()}
              onEndEditing={() => Keyboard.dismiss()}
            />
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={{ position: "absolute" }}
            />
          </View>
          <TouchableOpacity
            onPress={onSubmitForm}
            style={reviewBTNSubmirDisabled(styles.btnDisabled, styles.btn)}
            activeOpacity={0.8}
            disabled={formData === initialState}
          >
            <Text
              style={reviewBTNSubmirDisabled(
                styles.btnDisabledText,
                styles.btnText
              )}
            >
              Publish
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.deleteBtn}
            onPress={onClearForm}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
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
    borderRadius: 8,
    overflow: "hidden",
  },
  addPhotoIconWrap: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -40 }],
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 100,
  },
  btnText: {
    fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  btnDisabled: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 100,
  },
  btnDisabledText: {
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
  },
  flipContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
