import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stats: {
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
    },
    salesData: [],
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setDashboardData: (state, action) => {
            state.stats = action.payload.stats;
            state.salesData = action.payload.salesData;
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
    setDashboardData,
    setError,
    clearError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
