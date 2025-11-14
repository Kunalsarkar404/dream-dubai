/**
 * Dashboard Thunk Actions
 * Dream Dubai Admin Panel
 */
import {
  setLoading,
  setDashboardData,
  setError,
} from '../slices/dashboardSlice';
import { dashboardAPI } from '../../services/api';

/**
 * Fetch dashboard data
 */
export const fetchDashboardData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Fetch stats, sales data, top products, and recent activity
    const [statsResponse, salesResponse, topProductsResponse, activityResponse] = await Promise.all([
      dashboardAPI.getStats(),
      dashboardAPI.getSalesData(),
      dashboardAPI.getTopProducts(),
      dashboardAPI.getRecentActivity(),
    ]);

    dispatch(setDashboardData({
      stats: statsResponse.data.data,
      salesData: salesResponse.data.data,
      topProducts: topProductsResponse.data.data,
      recentActivity: activityResponse.data.data,
    }));

    return {
      stats: statsResponse.data.data,
      salesData: salesResponse.data.data,
      topProducts: topProductsResponse.data.data,
      recentActivity: activityResponse.data.data,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard data';
    dispatch(setError(errorMessage));
    throw error;
  }
};
