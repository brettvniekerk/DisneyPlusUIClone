import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import movieReducer from '../features/movie/movieSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // disables serialization checking
  })
})

// configure the state store
export default store