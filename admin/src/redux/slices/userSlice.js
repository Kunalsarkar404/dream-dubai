import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalUsers: 0,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.totalUsers = action.payload.totalUsers;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setUsers,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
