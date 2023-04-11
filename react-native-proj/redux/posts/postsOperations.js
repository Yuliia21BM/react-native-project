import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import { postsSlice } from "./postsSlice";

const { updateIsLoading, incrementLikes, decrementLikes } = postsSlice.actions;

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

export const getOwnPosts = () => async (dispatch, getState) => {
  const { userID } = getState().auth;

  try {
    dispatch(updateIsLoading(true));
    const q = query(collection(db, "posts"), where("userId", "==", userID));
    const querySnapshot = await getDocs(q);

    const allPosts = [];
    querySnapshot.forEach((doc) =>
      allPosts.push({ ...doc.data(), idPost: doc.id })
    );

    dispatch(postsSlice.actions.uploadownPosts(allPosts));
    dispatch(updateIsLoading(false));
    return allPosts;
  } catch (error) {
    console.log(error.message);
    dispatch(updateIsLoading(false));
  }
};

export const getAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch(updateIsLoading(true));
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);

    const allPosts = [];
    for (const doc of querySnapshot.docs) {
      const postData = { ...doc.data(), idPost: doc.id };

      const commentsSnapshot = await getDocs(
        collection(db, "posts", postData.idPost, "comments")
      );
      const commentCount = commentsSnapshot.size;

      await updateDoc(doc.ref, { comments: commentCount });

      allPosts.push({
        ...postData,
        comments: commentCount,
      });
    }

    dispatch(postsSlice.actions.uploadPosts(allPosts));
    dispatch(updateIsLoading(false));
    return allPosts;
  } catch (error) {
    console.log(error.message);
    dispatch(updateIsLoading(false));
  }
};

export const addCommentToPost =
  (postId, comment) => async (dispatch, getState) => {
    const { userID } = getState().auth;
    try {
      const commentRef = collection(db, "posts", postId, "comments");
      await addDoc(commentRef, {
        ...comment,
        userId: userID,
      });
      dispatch(getAllPosts());
      console.log("Comment added to post");
    } catch (error) {
      console.log(error.message);
    }
  };

export const getCommentsByPostId = (postId) => async (dispatch, getState) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef);
    const commentsSnapshot = await getDocs(q);
    const comments = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(postsSlice.actions.uploadComments(comments));
  } catch (error) {
    console.log(error.message);
  }
};

export const toggleLike = (postId) => async (dispatch, getState) => {
  const { userID } = getState().auth;
  const postRef = doc(db, "posts", postId);
  console.log("like");

  try {
    const postDoc = await getDoc(postRef);
    console.log(postDoc);

    if (postDoc.exists()) {
      const post = postDoc.data();
      const likes = post.likes || [];

      // Check if the user has already liked the post
      const index = likes.indexOf(userID);

      if (index === -1) {
        // User hasn't liked the post, add the like
        likes.push(userID);
        await setDoc(postRef, { likes }, { merge: true });
        await setDoc(postRef, { likesCounter: likes.length }, { merge: true });
        console.log(likes.length);
        dispatch(incrementLikes({ postId, likesCounter: likes.length }));
      } else {
        // User has liked the post, remove the like
        likes.splice(index, 1);
        await setDoc(postRef, { likes }, { merge: true });
        await setDoc(postRef, { likesCounter: likes.length }, { merge: true });
        dispatch(decrementLikes({ postId, likesCounter: likes.length }));
      }
    } else {
      console.log("Post does not exist");
    }
  } catch (error) {
    console.log(error);
  }
};
