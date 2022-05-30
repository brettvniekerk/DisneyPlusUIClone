import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// set initial state
const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
}

// create slice
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    // reducer for setting state
    setMovies: (state: any, action: PayloadAction<any>) => {
      state.recommend = action.payload.recommend
      state.newDisney = action.payload.newDisney
      state.original = action.payload.original
      state.trending = action.payload.trending
    },
  }
})

// export reducers for dispatchers
export const { setMovies } = movieSlice.actions

// export selectors
export const selectRecommended = (state: any) => state.movie.recommend
export const selectNewDisney = (state: any) => state.movie.newDisney
export const selectOriginals = (state: any) => state.movie.original
export const selectTrending = (state: any) => state.movie.trending

// export default reducer for store
export default movieSlice.reducer