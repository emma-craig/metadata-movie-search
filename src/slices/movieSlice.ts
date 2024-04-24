import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMovie } from '../types/movies';
import { RootState } from '../config/store';

export interface MovieState {
  data: Array<IMovie>;
  error: string | null;
  favourites: Array<string>;
  status: 'loading' | 'idle';
}

export const initialState: MovieState = {
  data: [],
  error: null,
  favourites: [],
  status: 'idle',
};

export const listMovies: any = createAsyncThunk(
  'movies/listMovies',

  async (searchTerm) => {
    const BASE_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
    const response = await fetch(`${BASE_URL}&s=${searchTerm}`);
    const data = await response.json();
    return data.Search;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFavourite(state, action) {
      state.favourites = [...state.favourites, action.payload];
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter((id) => id !== action.payload);
    },
    sortMovies(state) {
      state.data = state.data.sort((a, b) =>
        a.Title.toString().localeCompare(b.Title.toString())
      );
    },
    setLoading: (state, action: PayloadAction<any>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listMovies.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(listMovies.fulfilled, (state, action) => {
      state.data = action.payload || [];
      state.status = 'idle';
    });
    builder.addCase(listMovies.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      state.status = 'idle';
    });
  },
});

export const selectMovies = (state: RootState) => state.data;
export const selectFavourites = (state: RootState) => state.favourites;
export const selectStatus = (state: RootState) => state.status;

export const { addFavourite, removeFavourite, sortMovies } = movieSlice.actions;
export default movieSlice.reducer;
