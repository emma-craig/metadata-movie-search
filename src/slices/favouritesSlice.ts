import { createSlice } from '@reduxjs/toolkit'

export interface FavouritesState {
  value: number
}

const initialState: FavouritesState = {
  value: 0,
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    removeFromFavourites: (state) => {
      state.value -= 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions

export default favouritesSlice.reducer