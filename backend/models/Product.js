import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [200, 'Product name cannot be more than 200 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Activewear', 'Women', 'Men', 'Kids', 'Stationery'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 6;
        },
        message: 'Product must have between 1 and 6 images',
      },
      required: [true, 'Please provide at least one product image'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    salesCount: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for search functionality
productSchema.index({ name: 'text', description: 'text' });

// Index for category and status filtering
productSchema.index({ category: 1, status: 1 });

// Virtual for low stock alert
productSchema.virtual('isLowStock').get(function () {
  return this.stock < 10;
});

const Product = mongoose.model('Product', productSchema);

export default Product;
