import Product from '../models/Product.js';
import { deleteFile } from '../middleware/upload.js';
import { cleanupOrphanedImages, getImageStats } from '../utils/imageCleanup.js';

/**
 * @desc    Get all products with pagination and filters
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const category = req.query.category || '';
        const status = req.query.status || '';
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

        // Build query
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { sku: { $regex: search, $options: 'i' } },
            ];
        }

        if (category) {
            query.category = category;
        }

        if (status) {
            query.status = status;
        }

        // Execute query with pagination
        const skip = (page - 1) * limit;

        const [products, totalProducts] = await Promise.all([
            Product.find(query)
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(limit),
            Product.countDocuments(query),
        ]);

        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({
            success: true,
            data: {
                products,
                currentPage: page,
                totalPages,
                totalProducts,
                limit,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private (Admin only)
 */
export const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private (Admin only)
 */
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // If images are being updated, delete removed images from disk
        if (req.body.images && Array.isArray(req.body.images)) {
            const oldImages = product.images || [];
            const newImages = req.body.images;

            // Find images that were removed
            const removedImages = oldImages.filter(oldImg => !newImages.includes(oldImg));

            // Delete removed image files
            removedImages.forEach(imagePath => {
                // Extract just the path part after the domain
                const pathMatch = imagePath.match(/\/uploads\/products\/.+$/);
                if (pathMatch) {
                    deleteFile(pathMatch[0]);
                }
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private (Admin only)
 */
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Delete associated image files
        if (product.images && product.images.length > 0) {
            product.images.forEach(imagePath => {
                // Extract just the path part after the domain
                const pathMatch = imagePath.match(/\/uploads\/products\/.+$/);
                if (pathMatch) {
                    deleteFile(pathMatch[0]);
                }
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get product categories
 * @route   GET /api/products/categories/list
 * @access  Public
 */
export const getCategories = async (req, res, next) => {
    try {
        const categories = ['Activewear', 'Women', 'Men', 'Kids', 'Stationery'];

        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get low stock products
 * @route   GET /api/products/lowstock/list
 * @access  Private (Admin only)
 */
export const getLowStockProducts = async (req, res, next) => {
    try {
        const lowStockProducts = await Product.find({
            stock: { $lt: 10 },
            status: 'active',
        }).sort({ stock: 1 });

        res.status(200).json({
            success: true,
            data: lowStockProducts,
            count: lowStockProducts.length,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Upload product images
 * @route   POST /api/products/upload
 * @access  Private (Admin only)
 */
export const uploadImages = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded',
            });
        }

        // Generate full URLs for uploaded files
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrls = req.files.map(file => {
            return `${baseUrl}/uploads/products/${file.filename}`;
        });

        res.status(200).json({
            success: true,
            data: imageUrls,
            message: `${imageUrls.length} image(s) uploaded successfully`,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Cleanup orphaned image files
 * @route   POST /api/products/cleanup-images
 * @access  Private (Admin only)
 */
export const cleanupImages = async (req, res, next) => {
    try {
        const result = await cleanupOrphanedImages();
        res.status(200).json({
            success: true,
            data: result,
            message: `Cleanup completed. ${result.removed} orphaned file(s) removed.`,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get image storage statistics
 * @route   GET /api/products/image-stats
 * @access  Private (Admin only)
 */
export const getImageStorageStats = async (req, res, next) => {
    try {
        const stats = await getImageStats();
        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};
