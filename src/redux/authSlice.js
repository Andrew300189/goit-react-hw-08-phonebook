import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('authToken', token);
};


const storedToken = localStorage.getItem('authToken');

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
  user: {
    name: null,
    email: null,
  },
  token: storedToken || null,
  isLoggedIn: !!storedToken,
  isRefreshing: false,
};

export const loginUser = createAsyncThunk('user/loginUser', async (userData) => {
  try {
    const response = await axios.post('/users/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    const response = await axios.post('/users/logout');

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});


const api = {
  fetchCurrentUser: async () => {
    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error.message);
      throw new Error(error.message);
    }
  }
};

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const persistToken = state.user.token;

    if (persistToken === null) {
      return thunkAPI.rejectWithValue();
    }

    setAuthHeader(persistToken);

    try {
      const data = await api.fetchCurrentUser();
      return data;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
});


export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearCurrentUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem('authToken');
        state.user = initialState.user;
        state.token = initialState.token;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      });
  },
});

export const { clearCurrentUser } = authSlice.actions;
export default authSlice.reducer;
