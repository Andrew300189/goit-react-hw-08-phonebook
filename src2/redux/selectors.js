
export const selectContacts = (state) => state.contacts.items;
export const selectFilter = (state) => state.contacts.filter;
export const selectUserEmail = (state) => state.auth.user.email;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;