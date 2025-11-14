/**
 * User Thunk Actions
 * Dream Dubai Admin Panel
 */
import {
  setLoading,
  setUsers,
  setError,
} from '../slices/userSlice';
import { usersAPI } from '../../services/api';

/**
 * Fetch all users with pagination
 */
export const fetchUsers = (params) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const { currentPage } = getState().users;
    const queryParams = {
      page: params?.page || currentPage,
      limit: params?.limit || 10,
      search: params?.search || '',
      role: params?.role || '',
      isActive: params?.isActive || '',
    };

    const response = await usersAPI.getAll(queryParams);
    // Backend returns data in response.data.data
    dispatch(setUsers(response.data.data));
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch users';
    dispatch(setError(errorMessage));
    throw error;
  }
};

/**
 * Toggle user status (active/inactive)
 */
export const toggleUserStatus = (userId) => async (dispatch) => {
  try {
    await usersAPI.toggleStatus(userId);
    // Refetch users to update the list
    dispatch(fetchUsers());
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to toggle user status';
    dispatch(setError(errorMessage));
    throw error;
  }
};

/**
 * Delete user
 */
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await usersAPI.delete(userId);
    // Refetch users to update the list
    dispatch(fetchUsers());
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete user';
    dispatch(setError(errorMessage));
    throw error;
  }
};
