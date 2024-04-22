import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../types/movies';
import { RootState } from '../config/store';

export interface MovieState {
  status: 'loading' | 'idle';
  error: string | null;
  data: Array<IMovie>;
  favourites: Array<string>;
}

export const initialState: MovieState = {
  data: [],
  error: null,
  status: 'idle',
  favourites: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(listMovies.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(
      listMovies.fulfilled,
      (state, action: PayloadAction<Array<IMovie>>) => {
        state.data = action.payload || [];
        state.status = 'idle';
      }
    );
    builder.addCase(listMovies.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;

      state.status = 'idle';
    });
  },
});

export const selectMovies = (state: RootState) => state.data;
export const selectFavourites = (state: RootState) => state.favourites;
export const { addFavourite, removeFavourite } = movieSlice.actions;
export default movieSlice.reducer;
