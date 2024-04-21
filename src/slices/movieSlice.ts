import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../types/movies';
import { getMovies } from '../services/getMovies';
import { RootState } from '../config/store';

export interface MovieState {
  status: 'loading' | 'idle';
  error: string | null;
  data: Array<IMovie>;
  favourites: Array<IMovie>;
}

export const initialState: MovieState = {
  data: [],
  error: null,
  status: 'idle',
  favourites: [],
};

export const listMovies: any = createAsyncThunk(
  'movies/listMovies',
  async () => {
    const response = await getMovies();
    const data = await response.json();
    return data.Search;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listMovies.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(
      listMovies.fulfilled,
      (state, action: PayloadAction<Array<IMovie>>) => {
        state.data = action.payload;
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

export default movieSlice.reducer;
