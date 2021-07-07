import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: false,
  reducers: {
    changeAuth: (state, action) => {
      return action.payload.auth;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeAuth } = authSlice.actions;

export default authSlice.reducer;
