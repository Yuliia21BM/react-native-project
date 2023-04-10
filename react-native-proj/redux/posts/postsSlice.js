import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  comments: [],
  isLoading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    uploadPosts: (state, { payload }) => {
      console.log(payload);
      state.items = payload;
    },
    uploadComments: (state, { payload }) => {
      state.comments = payload;
    },
    updateIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});
