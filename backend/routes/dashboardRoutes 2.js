import express from 'express';
import {
    getDashboardStats,
    getSalesData,
    getTopProducts,
    getRecentActivity,
} from '../controllers/dashboardController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected and admin only
router.use(protect, authorize('Admin'));

router.get('/stats', getDashboardStats);
router.get('/sales', getSalesData);
router.get('/top-products', getTopProducts);
router.get('/activity', getRecentActivity);

export default router;
