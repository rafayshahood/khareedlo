import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;

      // Hardcoded credentials
      const validUsername = 'admin';
      const validPassword = 'admin';

      if (username === validUsername && password === validPassword) {
        state.isAuthenticated = true;
        state.user = { username };
      } else {
        state.isAuthenticated = false;
        state.user = null;
        alert('Invalid username or password');
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
