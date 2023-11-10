import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const customMiddleware = (store) => (next) => (action) => {
  console.log('Action:', action);
  const result = next(action);
  console.log('State after dispatch:', store.getState());

  return result;
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

const rootReducer = {
  contacts: persistedContactsReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
