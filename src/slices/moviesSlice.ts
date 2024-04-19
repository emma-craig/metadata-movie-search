import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../types/movies';
import { getMovies } from '../services/fetchMovies';

type fetchMoviesError = {
  message: string;
};

export type MoviesState = {
  status: 'loading' | 'idle';
  error: string | null;
  movies: Movie[];
favourites: Movie[];  
};

export const initialState: MoviesState = {
  movies: [],
  error: null,
  status: 'idle',
  favourites: []
};

export const fetchMovies = createAsyncThunk<
  Movie[],
  undefined,
  { rejectValue: fetchMoviesError }
>('movies', async (undefined, thunkApi) => {
  const response = await getMovies();
  if (response.status === 400) {
    return thunkApi.rejectWithValue(
      (await response.json()) as fetchMoviesError
    );
  }

  return (await response.json()) as Movie[];
});


export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavourites: (state, {payload}) => {
      state.favourites.push(payload)
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    removeFromFavourites: (state, {payload}) => {
state.favourites = state.favourites.filter(({imdbID}) => imdbID !== payload)
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      // add movie to favourites
      state.movies = payload;
      state.status = 'idle';
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      state.status = 'idle';
    });
  },
});

// Action creators are generated for each case reducer function
export const { addToFavourites, removeFromFavourites } =
moviesSlice.actions;

export const getAllMovies = (state:MoviesState) => state.movies
export const getFavourites = (state:MoviesState) => state.favourites

export default moviesSlice.reducer;
