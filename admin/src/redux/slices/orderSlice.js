import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    totalOrders: 0,
    filters: {
        search: '',
        status: '',
    },
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setOrders: (state, action) => {
            state.orders = action.payload.orders;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.totalOrders = action.payload.totalOrders;
            state.loading = false;
            state.error = null;
        },
        setCurrentOrder: (state, action) => {
            state.currentOrder = action.payload;
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const index = state.orders.findIndex(o => o._id === orderId);
            if (index !== -1) {
                state.orders[index].status = status;
            }
            if (state.currentOrder?._id === orderId) {
                state.currentOrder.status = status;
            }
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
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
    setOrders,
    setCurrentOrder,
    updateOrderStatus,
    setFilters,
    setError,
    clearError,
} = orderSlice.actions;

export default orderSlice.reducer;
