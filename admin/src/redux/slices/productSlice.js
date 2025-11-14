import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0,
  filters: {
    search: '',
    category: '',
    status: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.totalProducts = action.payload.totalProducts;
      state.loading = false;
      state.error = null;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
      state.totalProducts += 1;
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      if (state.currentProduct?._id === action.payload._id) {
        state.currentProduct = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload);
      state.totalProducts -= 1;
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
  setProducts,
  setCurrentProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  setFilters,
  setError,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;
