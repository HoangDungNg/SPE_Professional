import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; //Pass the object (payload)
    },
    logout: (state) => {
      state.user = null; //When logout user set to null
    },
  },
});

export const { login, logout } = userSlice.actions;

//Allow other components to pull the data of user (selectors)
export const selectUser = (state) => state.user.user;



export default userSlice.reducer;
