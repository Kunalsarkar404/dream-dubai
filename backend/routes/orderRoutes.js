import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Admin routes
router.get('/', protect, authorize('Admin'), getOrders);
router.delete('/:id', protect, authorize('Admin'), deleteOrder);

// Public/User routes
router.post('/', createOrder); // Can be used by guests or authenticated users
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, authorize('Admin'), updateOrderStatus);

export default router;
