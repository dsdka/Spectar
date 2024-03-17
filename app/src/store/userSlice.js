import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null//{ userName: 'Desislava', userRole: 'Admin' }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload
    },
    removeUser: state => {
      state.user = null;
    }
  }
});

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;