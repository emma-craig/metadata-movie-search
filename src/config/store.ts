import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../slices/movieSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, movieReducer);
export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
