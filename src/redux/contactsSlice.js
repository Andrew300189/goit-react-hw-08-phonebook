import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuthHeader } from './authSlice';

export const fetchContacts = createAsyncThunk(
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

export const addContact = createAsyncThunk(
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

export const deleteContact = createAsyncThunk(
  'privateContacts/deleteContact',
  async (id) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
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

const contactsSlice = createSlice({
  name: 'privateContacts',
  initialState: {
    isLoading: false,
    items: [],
    error: null,
    filter: '',
  },
  reducers: {
    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedContact = action.payload;
        state.items = state.items.map((contact) => {
          return contact.id === updatedContact.id ? updatedContact : contact;
        });
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
