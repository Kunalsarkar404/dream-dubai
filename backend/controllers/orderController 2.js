import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

/**
 * @desc    Get all orders with pagination and filters
 * @route   GET /api/orders
 * @access  Private (Admin only)
 */
export const getOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';

    // Build query
    const query = {};

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;

    const [orders, totalOrders] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('items.product', 'name images'),
      Order.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      success: true,
      data: {
        orders,
        currentPage: page,
        totalPages,
        totalOrders,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single order
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Public
 */
export const createOrder = async (req, res, next) => {
  try {
    const { items, customerName, customerEmail, customerPhone, shippingAddress, paymentMethod } = req.body;

    // Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}`,
        });
      }

      orderItems.push({
        product: product._id,
        productId: product._id.toString(),
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.images[0],
        color: item.color || '',
        size: item.size || '',
      });

      totalAmount += product.price * item.quantity;

      // Update product stock and sales
      product.stock -= item.quantity;
      product.salesCount += item.quantity;
      product.totalRevenue += product.price * item.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      items: orderItems,
      customerName,
      customerEmail,
      customerPhone,
      totalAmount,
      shippingAddress,
      paymentMethod,
      user: req.user?._id, // If authenticated
    });

    // Update user stats if authenticated
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { totalOrders: 1, totalSpent: totalAmount },
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:id/status
 * @access  Private (Admin only)
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;

    if (status === 'Delivered') {
      order.deliveredAt = Date.now();
      order.paymentStatus = 'Paid';
    } else if (status === 'Cancelled') {
      order.cancelledAt = Date.now();
      order.cancellationReason = req.body.cancellationReason || 'Cancelled by admin';
      
      // Restore product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { 
            stock: item.quantity,
            salesCount: -item.quantity,
            totalRevenue: -(item.price * item.quantity)
          },
        });
      }
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete order
 * @route   DELETE /api/orders/:id
 * @access  Private (Admin only)
 */
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
