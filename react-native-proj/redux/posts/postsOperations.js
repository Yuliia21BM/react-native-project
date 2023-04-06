import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import { postsSlice } from "./postsSlice";

export const uploadPostToStore = (post) => async (_, getState) => {
  const { userID } = getState().auth;
  console.log(userID);
  console.log(post);
  console.log(getState());

  try {
    await addDoc(collection(db, "posts"), {
      ...post,
      userId: userID,
    });
    console.log("added");
  } catch (error) {
    console.log(error.message);
  }
  //   const collectionRef = db.collection("posts");

  //   collectionRef
  //     .add({
  //       ...post,
  //       userId,
  //     })
  //     .then((docRef) => {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding document: ", error);
  // });
};

export const getPosts = () => async () => {
  const { userID } = getState().auth;
};
