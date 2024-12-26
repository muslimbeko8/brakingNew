import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload
    },
    setIsAuthenticated: (state, actions) => {
      state.isAuthenticated = actions.payload
    },
    logOut: (state) => {
      state.isAuthenticated = false
      state.user = null
    }
  }
})
export const {setUser, setIsAuthenticated, logOut} = authSlice.actions
export default authSlice.reducer