import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  // signOut,
} from "firebase/auth";
import { authSlice } from "./authSlice";
import { auth } from "../../firebase/config";

export const authRegistration =
  ({ userName, userEmail, userPassword, avatar }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: avatar,
      });

      const { uid, displayName, email, photoURL } = auth.currentUser;

      // await AsyncStorage.setItem("auth_email", email);
      // await AsyncStorage.setItem("auth_password", password);

      dispatch(
        authSlice.actions.updateUserProfile({
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
      const { user } = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const { displayName, email, photoURL, uid } = user;

      await AsyncStorage.setItem("auth_email", user.email);
      await AsyncStorage.setItem("auth_password", password);

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          avatar: photoURL,
          isCurrentUser: true,
        })
      );

      return { user };
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

export const authLogout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.logout());
    // await AsyncStorage.removeItem("auth_email");
    // await AsyncStorage.removeItem("auth_password");
    // dispatch(postsSlice.actions.reset());
  } catch (error) {
    return error.message;
  }
};
