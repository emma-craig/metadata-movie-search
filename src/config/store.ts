import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../slices/movieSlice';

export const store = configureStore({ reducer: movieReducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
