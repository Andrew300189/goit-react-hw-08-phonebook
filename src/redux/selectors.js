export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.contacts.filter;
export const selectUserEmail = state => state.auth.user.email;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.IsRefreshing;
