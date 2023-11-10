import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://connections-api.herokuapp.com/docs';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchPrivateContacts = createAsyncThunk('privateContacts/fetchAll', async () => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`);
    if (!response.ok) {
      throw new Error('Failed to fetch private contacts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addPrivateContact = createAsyncThunk('privateContacts/addContact', async (contact) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Failed to add private contact');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deletePrivateContact = createAsyncThunk('privateContacts/deleteContact', async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete private contact');
    }
    return id;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updatePrivateContact = createAsyncThunk('privateContacts/updateContact', async ({ id, updatedData }) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update private contact');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const privateContactsSlice = createSlice({
  name: 'privateContacts',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivateContacts.pending, (state) => {
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
      .addCase(addPrivateContact.pending, (state) => {
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
      .addCase(deletePrivateContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePrivateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      })
      .addCase(deletePrivateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePrivateContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePrivateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedContact = action.payload;
        state.items = state.items.map((contact) => {
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
