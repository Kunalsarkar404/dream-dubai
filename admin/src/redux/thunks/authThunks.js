/**
 * Auth Thunk Actions
 * Dream Dubai Admin Panel
 */
import { loginStart, loginSuccess, loginFailure, logout as logoutAction } from '../slices/authSlice';
import { authAPI } from '../../services/api';

/**
 * Login with real API
 */
export const login = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await authAPI.login(credentials);
        // Backend returns: response.data.data = { user: {...}, token: "..." }
        const { user, token } = response.data.data;

        // Check if user has Admin role
        if (user.role !== 'Admin') {
            dispatch(loginFailure('Access denied. Admin privileges required.'));
            throw new Error('Access denied. Admin privileges required.');
        }

        dispatch(loginSuccess({
            user,
            token
        }));
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        dispatch(loginFailure(errorMessage));
        throw error;
    }
};

/**
 * Logout with real API
 */
export const logout = () => async (dispatch) => {
    try {
        await authAPI.logout();
        dispatch(logoutAction());
    } catch (error) {
        console.error('Logout error:', error);
        // Still logout on client side even if API fails
        dispatch(logoutAction());
    }
};

/**
 * Get current user profile
 */
export const getProfile = () => async (dispatch) => {
    try {
        const response = await authAPI.getProfile();
        dispatch(loginSuccess({
            user: response.data.data,
            token: localStorage.getItem('adminToken')
        }));
        return response;
    } catch (error) {
        dispatch(logout());
        throw error;
    }
};
