import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private (Admin only)
 */
export const getDashboardStats = async (req, res, next) => {
    try {
        const [
            totalUsers,
            totalProducts,
            totalOrders,
            pendingOrders,
            lowStockProducts,
            revenueData,
        ] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.countDocuments(),
            Order.countDocuments({ status: 'Pending' }),
            Product.countDocuments({ stock: { $lt: 10 }, status: 'active' }),
            Order.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$totalAmount' },
                    },
                },
            ]),
        ]);

        // Get new users this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const newUsersThisMonth = await User.countDocuments({
            createdAt: { $gte: startOfMonth },
        });

        const newOrdersThisMonth = await Order.countDocuments({
            createdAt: { $gte: startOfMonth },
        });

        const stats = {
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: revenueData[0]?.totalRevenue || 0,
            newUsersThisMonth,
            newOrdersThisMonth,
            lowStockProducts,
            pendingOrders,
        };

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get sales data for charts (last 6 months)
 * @route   GET /api/dashboard/sales
 * @access  Private (Admin only)
 */
export const getSalesData = async (req, res, next) => {
    try {
        const months = 6;
        const salesData = [];

        // Get data for last 6 months
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);

            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

            const [orderStats, newCustomers] = await Promise.all([
                Order.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: startOfMonth,
                                $lte: endOfMonth,
                            },
                            status: { $ne: 'Cancelled' },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            sales: { $sum: '$totalAmount' },
                            orders: { $sum: 1 },
                        },
                    },
                ]),
                User.countDocuments({
                    createdAt: {
                        $gte: startOfMonth,
                        $lte: endOfMonth,
                    },
                }),
            ]);

            const stats = orderStats[0] || { sales: 0, orders: 0 };

            salesData.push({
                month: date.toLocaleString('en-US', { month: 'short' }),
                year: date.getFullYear(),
                sales: stats.sales || 0,
                orders: stats.orders || 0,
                avgOrderValue: stats.orders > 0 ? (stats.sales / stats.orders).toFixed(2) : 0,
                newCustomers,
            });
        }

        res.status(200).json({
            success: true,
            data: salesData,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get top selling products
 * @route   GET /api/dashboard/top-products
 * @access  Private (Admin only)
 */
export const getTopProducts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 5;

        const topProducts = await Product.find({ status: 'active' })
            .sort({ salesCount: -1, totalRevenue: -1 })
            .limit(limit)
            .select('name category salesCount totalRevenue images');

        const formattedProducts = topProducts.map(product => ({
            id: product._id,
            name: product.name,
            category: product.category,
            sales: product.salesCount,
            revenue: product.totalRevenue,
            image: product.images[0],
        }));

        res.status(200).json({
            success: true,
            data: formattedProducts,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get recent activity
 * @route   GET /api/dashboard/activity
 * @access  Private (Admin only)
 */
export const getRecentActivity = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        // Get recent orders
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('orderNumber customerName totalAmount status createdAt');

        // Get recent users
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .select('name createdAt');

        // Get low stock products
        const lowStockProducts = await Product.find({
            stock: { $lt: 10 },
            status: 'active',
        })
            .sort({ stock: 1 })
            .limit(2)
            .select('name stock');

        // Combine and format activities
        const activities = [];

        recentOrders.forEach(order => {
            activities.push({
                id: `order-${order._id}`,
                type: 'order',
                title: `New Order ${order.orderNumber}`,
                description: `${order.customerName} placed an order worth AED ${order.totalAmount}`,
                timestamp: order.createdAt,
                icon: 'shopping-cart',
            });
        });

        recentUsers.forEach(user => {
            activities.push({
                id: `user-${user._id}`,
                type: 'user',
                title: 'New User Registration',
                description: `${user.name} joined Dream Dubai`,
                timestamp: user.createdAt,
                icon: 'user-plus',
            });
        });

        lowStockProducts.forEach(product => {
            activities.push({
                id: `product-${product._id}`,
                type: 'product',
                title: 'Low Stock Alert',
                description: `${product.name} - Only ${product.stock} items remaining`,
                timestamp: new Date(),
                icon: 'alert-triangle',
            });
        });

        // Sort by timestamp and limit
        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const limitedActivities = activities.slice(0, limit);

        res.status(200).json({
            success: true,
            data: limitedActivities,
        });
    } catch (error) {
        next(error);
    }
};
