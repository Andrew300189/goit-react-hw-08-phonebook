import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuthHeader } from './authSlice';

export const fetchPrivateContacts = createAsyncThunk(
  'privateContacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      setAuthHeader(token);
      const response = await axios.get(`/contacts`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const addPrivateContact = createAsyncThunk(
  'privateContacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      setAuthHeader(token);
      const response = await axios.post(`/contacts`, contact);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deletePrivateContact = createAsyncThunk(
  'privateContacts/deleteContact',
  async id => {
    try {
      await axios.delete(`/contacts/${id}`);

      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updatePrivateContact = createAsyncThunk(
  'privateContacts/updateContact',
  async ({ id, updatedData }) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const privateContactsSlice = createSlice({
  name: 'privateContacts',
  initialState: {
    isLoading: false,
    items: [],
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPrivateContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrivateContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPrivateContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addPrivateContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPrivateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addPrivateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deletePrivateContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePrivateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deletePrivateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePrivateContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePrivateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedContact = action.payload;
        state.items = state.items.map(contact => {
          return contact.id === updatedContact.id ? updatedContact : contact;
        });
      })
      .addCase(updatePrivateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default privateContactsSlice.reducer;
