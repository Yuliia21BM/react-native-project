import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
  },
});
