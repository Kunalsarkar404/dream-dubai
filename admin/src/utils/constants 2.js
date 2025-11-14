/**
 * Application Constants
 * Dream Dubai Admin Panel
 */

// Product Categories
export const productCategories = ['Activewear', 'Women', 'Men', 'Kids', 'Stationery'];

// Available Colors
export const availableColors = [
  { value: 'black', label: 'Black', hex: '#000000' },
  { value: 'white', label: 'White', hex: '#FFFFFF' },
  { value: 'red', label: 'Red', hex: '#FF0000' },
  { value: 'blue', label: 'Blue', hex: '#0000FF' },
  { value: 'navy', label: 'Navy', hex: '#000080' },
  { value: 'green', label: 'Green', hex: '#008000' },
  { value: 'yellow', label: 'Yellow', hex: '#FFD700' },
  { value: 'pink', label: 'Pink', hex: '#FFC0CB' },
  { value: 'purple', label: 'Purple', hex: '#800080' },
  { value: 'gray', label: 'Gray', hex: '#808080' },
  { value: 'beige', label: 'Beige', hex: '#F5F5DC' },
  { value: 'brown', label: 'Brown', hex: '#8B4513' },
];

// Available Sizes
export const availableSizes = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  kids: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y', '14-15Y'],
};

// Check if category requires color/size options
export const categoryRequiresOptions = (category) => {
  return ['Activewear', 'Women', 'Men', 'Kids'].includes(category);
};

// Order Status Options
export const orderStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

// Payment Status Options
export const paymentStatuses = ['Pending', 'Paid', 'Refunded', 'Failed'];

// Payment Methods
export const paymentMethods = [
  'Credit Card',
  'Debit Card',
  'Cash on Delivery',
  'Apple Pay',
  'Bank Transfer'
];

// User Roles
export const userRoles = ['User', 'Admin'];

// Emirates in UAE
export const uaeEmirates = [
  'Abu Dhabi',
  'Dubai',
  'Sharjah',
  'Ajman',
  'Umm Al Quwain',
  'Ras Al Khaimah',
  'Fujairah'
];
