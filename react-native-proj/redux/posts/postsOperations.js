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

// const { uploadPosts } = postsSlice.actions;

export const uploadPostToStore = (post) => async (_, getState) => {
  const { userID } = getState().auth;
  try {
    await addDoc(collection(db, "posts"), {
      ...post,
      userId: userID,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllPosts = () => async (dispatch, getState) => {
  const { userID } = getState().auth;

  try {
    const q = query(collection(db, "posts"), where("userId", "==", userID));
    const querySnapshot = await getDocs(q);

    const allPosts = [];
    querySnapshot.forEach((doc) =>
      allPosts.push({ ...doc.data(), idPost: doc.id })
    );

    dispatch(postsSlice.actions.uploadPosts(allPosts));
    return allPosts;
  } catch (error) {
    console.log(error.message);
  }
};

export const addCommentToPost = (postId, comment) => async (_, getState) => {
  const { userID } = getState().auth;
  try {
    const commentRef = collection(db, "posts", postId, "comments");
    await addDoc(commentRef, {
      ...comment,
      userId: userID,
    });
    console.log("Comment added to post");
  } catch (error) {
    console.log(error.message);
  }
};

export const getCommentsByPostId = (postId) => async (_, getState) => {
  const { userID } = getState().auth;
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef);
    const commentsSnapshot = await getDocs(q);
    const comments = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(comments);
    // return comments;
  } catch (error) {
    console.log(error.message);
  }
};
