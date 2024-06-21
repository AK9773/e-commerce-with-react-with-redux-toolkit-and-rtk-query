import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  isAuthenticated: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.error = null;
    },
    logout: (state, action) => {
      state.userData = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login, logout, setError } = userSlice.actions;
