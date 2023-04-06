import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authSlice } from "./authSlice";
import { auth } from "../../firebase/config";

const { logout, updateUserProfile, updateAvatar } = authSlice.actions;

export const authRegistration =
  ({ userName, userEmail, userPassword, avatar }) =>
  async (dispatch) => {
    try {
      const updatedEmail = userEmail.toLowerCase();
      await createUserWithEmailAndPassword(auth, updatedEmail, userPassword);
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: avatar,
      });

      const { uid, displayName, email, photoURL } = auth.currentUser;

      await AsyncStorage.setItem("auth_email", email);
      await AsyncStorage.setItem("auth_password", userPassword);

      dispatch(
        updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          avatar: photoURL,
          isCurrentUser: true,
        })
      );
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

export const authLogInUser =
  ({ userEmail, userPassword }) =>
  async (dispatch) => {
    try {
      const updatedEmail = userEmail.toLowerCase();
      const { user } = await signInWithEmailAndPassword(
        auth,
        updatedEmail,
        userPassword
      );
      console.log(user);

      const { displayName, email, photoURL, uid } = user;

      await AsyncStorage.setItem("auth_email", user.email);
      await AsyncStorage.setItem("auth_password", userPassword);

      dispatch(
        updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          avatar: photoURL,
          isCurrentUser: true,
        })
      );

      return { user };
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };

export const authLogout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
    await AsyncStorage.removeItem("auth_email");
    await AsyncStorage.removeItem("auth_password");
    // dispatch(postsSlice.actions.reset());
  } catch (error) {
    return error.message;
  }
};

export const authStateChanged = () => async (dispatch) => {
  try {
    const authEmail = await AsyncStorage.getItem("auth_email");
    const authPassword = await AsyncStorage.getItem("auth_password");

    const userData = { userEmail: authEmail, userPassword: authPassword };

    if (userData.userEmail) {
      try {
        await dispatch(authLogInUser(userData));
      } catch (error) {
        console.log("Sorry, this user was deleted");
        return error.message;
      }
    }
  } catch (error) {
    return error.message;
  }
};

export const authUpdateAvatar = (avatar) => async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: avatar,
    });
    dispatch(updateAvatar(avatar));
  } catch (error) {
    return error.message;
  }
};
