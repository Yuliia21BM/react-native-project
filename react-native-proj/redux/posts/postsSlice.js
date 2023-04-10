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
      console.log(payload);
      state.ownItems = payload;
    },
    uploadComments: (state, { payload }) => {
      state.comments = payload;
    },
    updateIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    updateLikes: (state, { payload }) => {
      const { id, likes } = payload;
      const updatedPosts = state.posts.map((post) => {
        if (post.idPost === id) {
          return { ...post, likes };
        }
        return post;
      });
    },
  },
});
