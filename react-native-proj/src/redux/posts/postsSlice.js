import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  ownItems: [],
  comments: [],
  isLoading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    uploadPosts: (state, { payload }) => {
      state.items = payload;
    },
    uploadownPosts: (state, { payload }) => {
      state.ownItems = payload;
    },
    uploadComments: (state, { payload }) => {
      state.comments = payload;
    },
    updateIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    incrementLikes: (state, { payload }) => {
      const { postId, likesCounter } = payload;
      state.items = state.items.map((post) => {
        if (post.idPost === postId) {
          return { ...post, likesCounter };
        }
        return post;
      });
      state.ownItems = state.ownItems.map((post) => {
        if (post.idPost === postId) {
          return { ...post, likesCounter };
        }
        return post;
      });
    },
    decrementLikes: (state, { payload }) => {
      const { postId, likesCounter } = payload;
      state.items = state.items.map((post) => {
        if (post.idPost === postId) {
          return { ...post, likesCounter };
        }
        return post;
      });
      state.ownItems = state.ownItems.map((post) => {
        if (post.idPost === postId) {
          return { ...post, likesCounter };
        }
        return post;
      });
    },
  },
});
