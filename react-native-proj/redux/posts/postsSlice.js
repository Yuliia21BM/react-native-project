import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  comments: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, { payload }) => {},
    uploadPosts: (state, { payload }) => {
      console.log(payload);
      state.items = payload;
    },
    uploadComments: (state, { payload }) => {
      state.comments = payload;
    },
  },
});
