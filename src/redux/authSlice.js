import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;