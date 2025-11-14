import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getLowStockProducts,
  uploadImages,
  cleanupImages,
  getImageStorageStats,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadProductImages } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/categories/list', getCategories);
router.get('/:id', getProduct);

// Protected routes (Admin only)
router.post('/upload', protect, authorize('Admin'), uploadProductImages, uploadImages);
router.post('/cleanup-images', protect, authorize('Admin'), cleanupImages);
router.get('/image-stats', protect, authorize('Admin'), getImageStorageStats);
router.post('/', protect, authorize('Admin'), createProduct);
router.put('/:id', protect, authorize('Admin'), updateProduct);
router.delete('/:id', protect, authorize('Admin'), deleteProduct);
router.get('/lowstock/list', protect, authorize('Admin'), getLowStockProducts);

export default router;
