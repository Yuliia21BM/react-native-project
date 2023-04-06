import * as ImageManipulator from "expo-image-manipulator";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadPhotoToServer = async (photo, screenName) => {
  const { uri } = await ImageManipulator.manipulateAsync(
    photo,
    [{ resize: { width: 800 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );
  const res = await fetch(uri);
  const file = await res.blob();
  const uniqueId = Date.now().toString();
  const storageRef =
    screenName === "postScreen"
      ? ref(storage, `postsImages/post_${uniqueId}`)
      : ref(storage, `avatarPhoto/avatar_${uniqueId}`);

  try {
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask;
    const processedPhoto = await getDownloadURL(storageRef);
    return processedPhoto;
  } catch (error) {
    console.log(error);
  }
};
