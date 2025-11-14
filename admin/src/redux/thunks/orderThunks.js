/**
 * Order Thunk Actions
 * Dream Dubai Admin Panel
 */
import {
  setLoading,
  setOrders,
  setCurrentOrder,
  updateOrderStatus as updateOrderStatusAction,
  setError,
} from '../slices/orderSlice';
import { ordersAPI } from '../../services/api';

/**
 * Fetch all orders with filters
 */
export const fetchOrders = (params) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const { filters, currentPage } = getState().orders;
    const queryParams = {
      page: params?.page || currentPage,
      limit: params?.limit || 10,
      search: params?.search ?? filters.search,
      status: params?.status ?? filters.status,
    };

    const response = await ordersAPI.getAll(queryParams);
    // Backend returns data in response.data.data
    dispatch(setOrders(response.data.data));
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
    dispatch(setError(errorMessage));
    throw error;
  }
};

/**
 * Fetch order by ID
 */
export const fetchOrderById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await ordersAPI.getById(id);
    dispatch(setCurrentOrder(response.data.data));
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch order';
    dispatch(setError(errorMessage));
    throw error;
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await ordersAPI.updateStatus(orderId, { status });
    dispatch(updateOrderStatusAction({ orderId, status }));
    dispatch(setLoading(false));
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update order status';
    dispatch(setError(errorMessage));
    throw error;
  }
};
