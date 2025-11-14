/**
 * Product Thunk Actions
 * Dream Dubai Admin Panel
 */
import {
  setLoading,
  setProducts,
  setCurrentProduct,
  addProduct,
  updateProduct as updateProductAction,
  deleteProduct as deleteProductAction,
  setError,
} from '../slices/productSlice';
import { productsAPI } from '../../services/api';

/**
 * Fetch all products with filters
 */
export const fetchProducts = (params) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const { filters, currentPage } = getState().products;
    const queryParams = {
      page: params?.page || currentPage,
      limit: params?.limit || 10,
      search: params?.search ?? filters.search,
      category: params?.category ?? filters.category,
      status: params?.status ?? filters.status,
    };

    const response = await productsAPI.getAll(queryParams);
    // Backend returns data in response.data.data
    dispatch(setProducts(response.data.data));
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch products';
    dispatch(setError(errorMessage));
    throw error;
  }
};

/**
 * Fetch product by ID
 */
export const fetchProductById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await productsAPI.getById(id);
    dispatch(setCurrentProduct(response.data.data));
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch product';
    dispatch(setError(errorMessage));
    throw error;
  }
};

/**
 * Create new product
 */
export const createProduct = (productData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await productsAPI.create(productData);
    dispatch(addProduct(response.data.data));
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to create product';
    dispatch(setError(errorMessage));
    throw error;
  }
};

/**
 * Update existing product
 */
export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await productsAPI.update(id, productData);
    dispatch(updateProductAction(response.data.data));
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update product';
    dispatch(setError(errorMessage));
    throw error;
  }
};

/**
 * Delete product
 */
export const deleteProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await productsAPI.delete(id);
    dispatch(deleteProductAction(id));
    dispatch(setLoading(false));
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete product';
    dispatch(setError(errorMessage));
    throw error;
  }
};
