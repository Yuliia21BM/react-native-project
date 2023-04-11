export const selectAllPosts = (state) => state.posts.items;
export const selectOwnPosts = (state) => state.posts.ownItems;
export const selectComments = (state) => state.posts.comments;
export const selectisLoadingPosts = (state) => state.posts.isLoading;
