import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// initial state values for userSlice
const initialState = {
  name: '',
  email: '',
  photo: '',
}

// creates the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // remember user details
    setUserLoginDetails: (state: any, action: PayloadAction<any>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.photo = action.payload.photo
    },

    // forget user details
    setSignOutState: (state: any) => {
      state.name = null
      state.email = null
      state.photo = null
    }
  }
})

 // export the reducer functions to modify state
export const { setUserLoginDetails, setSignOutState } = userSlice.actions

// export selectors to access state
export const selectUserName = (state: any) => state.user.name
export const selectUserEmail = (state: any) => state.user.email
export const selectUserPhoto = (state: any) => state.user.photo

// export default reducer -- goes to store, and handles the actions we call from components to affect state
export default userSlice.reducer