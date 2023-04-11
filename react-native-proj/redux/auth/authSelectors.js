export const selectIsCurrentUser = (state) => state.auth.isCurrentUser;
export const selectAvatar = (state) => state.auth.avatar;
export const selectUserName = (state) => state.auth.userName;
export const selectUserEmail = (state) => state.auth.userEmail;
export const selectUserId = (state) => state.auth.userID;
export const selectisLoading = (state) => state.auth.isLoading;
export const selectIsLoadingPhotoToServer = (state) =>
  state.auth.isLoadingPhotoToServer;
