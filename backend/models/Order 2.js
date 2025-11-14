import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: false, // Auto-generated in pre-save hook
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Allow guest orders
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone is required'],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productId: String,
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        },
        price: {
          type: Number,
          required: true,
          min: [0, 'Price cannot be negative'],
        },
        image: String,
        color: String,
        size: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount cannot be negative'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Refunded', 'Failed'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'Cash on Delivery', 'Apple Pay', 'Bank Transfer'],
      required: true,
    },
    shippingAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      emirate: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: 'UAE',
      },
      zipCode: String,
    },
    trackingNumber: String,
    deliveredAt: Date,
    cancelledAt: Date,
    cancellationReason: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for formatted date
orderSchema.virtual('date').get(function () {
  return this.createdAt.toISOString().split('T')[0];
});

// Generate order number before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `DD-${year}-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

// Index for efficient querying
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ customerEmail: 1 });
orderSchema.index({ orderNumber: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
