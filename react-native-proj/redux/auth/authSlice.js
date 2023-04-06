import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: null,
  userName: null,
  userEmail: null,
  avatar: null,
  isCurrentUser: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => {
      state.userID = payload.userID;
      state.userName = payload.userName;
      state.userEmail = payload.userEmail;
      state.avatar = payload.avatar;
      state.isCurrentUser = payload.isCurrentUser;
    },
    logout: (state) => {
      state.userID = null;
      state.userName = null;
      state.userEmail = null;
      state.avatar = null;
      state.isCurrentUser = false;
    },
    updateAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
  },
});
