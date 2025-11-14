# Mock Data Integration Guide
**Dream Dubai Admin Panel**

## Overview
The admin panel now uses mock data instead of backend API calls. All data is served locally through mock functions that simulate API responses with realistic network delays.

---

## Mock Data Files Created

### 1. **mockAuth.js** - Authentication
**Location:** `src/utils/mockAuth.js`

**Available Credentials:**
- Email: `admin@dreamdubai.com` | Password: `admin123`
- Email: `fatima@dreamdubai.com` | Password: `password123`
- Email: `mohammed@dreamdubai.com` | Password: `secure123`

**Functions:**
- `mockLogin(email, password)` - Authenticates admin users
- `mockLogout()` - Simulates logout
- `mockGetProfile()` - Returns current user profile

---

### 2. **mockProducts.js** - Product Management
**Location:** `src/utils/mockProducts.js`

**Product Categories:** 5 categories
- **Activewear** - Sports and fitness clothing (with color/size options)
- **Women** - Women's fashion and apparel (with color/size options)
- **Men** - Men's fashion and apparel (with color/size options)
- **Kids** - Children's clothing (with color/size options)
- **Stationery** - Office and school supplies (no color/size options)

**Mock Data:** 15 products with:
- Multiple images (up to 6 per product)
- Color options (12 colors available)
- Size options (7 clothing sizes, 7 kids sizes)
- Categories with color/size support: Activewear, Women, Men, Kids
- Stationery category: No color/size options

**Available Colors:** Black, White, Red, Blue, Navy, Green, Yellow, Pink, Purple, Gray, Beige, Brown

**Available Sizes:**
- Clothing (Activewear, Women, Men): XS, S, M, L, XL, XXL, XXXL
- Kids: 2-3Y, 4-5Y, 6-7Y, 8-9Y, 10-11Y, 12-13Y, 14-15Y

**Functions:**
- `mockGetProducts({ page, limit, search, category, status })` - Get products with pagination/filters
- `mockGetProductById(id)` - Get single product
- `mockCreateProduct(productData)` - Create new product
- `mockUpdateProduct(id, productData)` - Update existing product
- `mockDeleteProduct(id)` - Delete product
- `categoryRequiresOptions(category)` - Check if category needs color/size options

---

### 3. **mockOrders.js** - Order Management
**Location:** `src/utils/mockOrders.js`

**Mock Data:** 8 complete orders with:
- Customer details
- Order items with images
- Shipping addresses
- Multiple status types (Pending, Shipped, Delivered, Cancelled)

**Functions:**
- `mockGetOrders({ page, limit, search, status })` - Get orders with pagination/filters
- `mockGetOrderById(id)` - Get single order with full details
- `mockUpdateOrderStatus(id, status)` - Update order status

---

### 4. **mockUsers.js** - User Management
**Location:** `src/utils/mockUsers.js`

**Mock Data:** 12 users including:
- Regular users (10)
- Admin users (2)
- Active and inactive accounts
- Complete profiles with purchase history

**Functions:**
- `mockGetUsers({ page, limit, search })` - Get users with pagination/search
- `mockGetUserById(id)` - Get single user details

---

### 5. **mockDashboard.js** - Dashboard Statistics
**Location:** `src/utils/mockDashboard.js`

**Mock Data:**
- Dashboard statistics (users, products, orders, revenue)
- 6 months of sales data for charts
- Revenue breakdown by category
- Top 5 selling products
- Recent activity feed

**Functions:**
- `mockGetDashboardStats()` - Get overview statistics
- `mockGetSalesData(period)` - Get sales data for charts
- `mockGetRevenueByCategory()` - Get category revenue breakdown
- `mockGetTopProducts(limit)` - Get top selling products
- `mockGetRecentActivity(limit)` - Get recent activities

---

## Redux Thunks (Action Creators)

All Redux thunks have been updated to use mock data:

### Auth Thunks
**File:** `src/redux/thunks/authThunks.js`
```javascript
import { login, logout } from '../redux/thunks/authThunks';

// Usage in components
dispatch(login({ email, password }))
dispatch(logout())
```

### Product Thunks
**File:** `src/redux/thunks/productThunks.js`
```javascript
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../redux/thunks/productThunks';

// Usage in components
dispatch(fetchProducts({ page: 1, search: 'abaya' }))
dispatch(createProduct(productData))
dispatch(updateProduct(id, productData))
dispatch(deleteProduct(id))
```

### Order Thunks
**File:** `src/redux/thunks/orderThunks.js`
```javascript
import { fetchOrders, fetchOrderById, updateOrderStatus } from '../redux/thunks/orderThunks';

// Usage in components
dispatch(fetchOrders({ page: 1, status: 'Pending' }))
dispatch(fetchOrderById(orderId))
dispatch(updateOrderStatus(orderId, 'Shipped'))
```

### User Thunks
**File:** `src/redux/thunks/userThunks.js`
```javascript
import { fetchUsers } from '../redux/thunks/userThunks';

// Usage in components
dispatch(fetchUsers({ page: 1, search: 'ahmed' }))
```

### Dashboard Thunks
**File:** `src/redux/thunks/dashboardThunks.js`
```javascript
import { fetchDashboardData } from '../redux/thunks/dashboardThunks';

// Usage in components
dispatch(fetchDashboardData())
```

---

## Updated Pages

All pages now use mock data through Redux thunks:

### ✅ Login.jsx
- Uses `login` thunk for authentication
- Test with: `admin@dreamdubai.com` / `admin123`

### ✅ Dashboard.jsx
- Uses `fetchDashboardData` thunk
- Displays stats and 6-month sales chart

### ✅ Products.jsx
- Uses `fetchProducts`, `createProduct`, `updateProduct`, `deleteProduct` thunks
- Full CRUD operations with 15 mock products

### ✅ Orders.jsx
- Uses `fetchOrders`, `fetchOrderById`, `updateOrderStatus` thunks
- View and manage 8 mock orders

### ✅ Users.jsx
- Uses `fetchUsers` thunk
- Browse 12 mock users with pagination

---

## Mock Data Features

### Simulated Network Delays
All mock functions include realistic delays:
- Login: 800ms
- Get operations: 300-500ms
- Create/Update: 600ms
- Delete: 400ms

### Pagination Support
Mock data supports pagination with:
- `page` - Current page number
- `limit` - Items per page (default: 10)
- Returns `totalPages`, `currentPage`, `totalItems`

### Search & Filter Support
- **Products:** Search by name/SKU, filter by category (5 categories)/status
- **Orders:** Search by order number/customer, filter by status
- **Users:** Search by name/email/phone

### Product Features
- **Multi-Image Upload:** Up to 6 images per product
- **Color Selection:** 12 available colors (only for Activewear, Women, Men, Kids)
- **Size Selection:** Multiple size options:
  - Clothing sizes: XS, S, M, L, XL, XXL, XXXL
  - Kids sizes: 2-3Y through 14-15Y
- **Category-Based Options:** Stationery products don't require color/size

### Error Handling
Mock functions properly reject with error responses:
```javascript
reject({
  response: {
    data: { message: 'Error message' },
    status: 404
  }
})
```

---

## Testing the Application

### 1. Login Screen
```
Email: admin@dreamdubai.com
Password: admin123
```

### 2. Dashboard
- View 4 summary cards (Users, Products, Orders, Revenue)
- Interactive Chart.js graph with 6 months of data
- All data in AED currency

### 3. Products Page
- Browse 15 mock products across 5 categories
- Test search: "sports", "dress", "shirt"
- Filter by category: "Activewear", "Women", "Men", "Kids", "Stationery"
- Filter by status: "active", "low stock", "out of stock"
- **Add new product:**
  - Upload up to 6 product images
  - Select category
  - For Activewear/Women/Men/Kids: Choose colors and sizes
  - For Stationery: No color/size selection needed
- Edit existing product with full image/color/size management
- Delete product

### 4. Orders Page
- View 8 mock orders
- Search by customer name or order number
- Filter by status: "Pending", "Shipped", "Delivered", "Cancelled"
- Click "View Details" to see full order
- Update order status

### 5. Users Page
- Browse 12 mock users
- Pagination (10 users per page)
- View user roles (Admin/User badges)

---

## Switching to Real Backend

When your backend is ready, simply:

1. Update `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

2. Replace mock thunks with API calls in:
   - `src/redux/thunks/authThunks.js`
   - `src/redux/thunks/productThunks.js`
   - `src/redux/thunks/orderThunks.js`
   - `src/redux/thunks/userThunks.js`
   - `src/redux/thunks/dashboardThunks.js`

3. Replace mock imports with API imports:
```javascript
// Replace this:
import { mockLogin } from '../../utils/mockAuth';

// With this:
import { authAPI } from '../../services/api';
```

---

## Benefits of Mock Data

✅ **No Backend Required** - Develop frontend independently
✅ **Realistic Testing** - Comprehensive mock data with relationships
✅ **Network Simulation** - Delays simulate real API behavior
✅ **Error Testing** - Test error scenarios easily
✅ **Consistent Data** - Same data across sessions
✅ **Fast Development** - No API setup or CORS issues
✅ **Easy Transition** - Clean separation allows easy backend integration

---

## Currency Format

All prices throughout the application use **AED (Dirham)**:
- Format: `AED 1,450`
- Helper function: `formatCurrency()` in `src/utils/helpers.js`

---

## Support

For any issues or questions about mock data integration:
1. Check browser console for error messages
2. Verify mock data file imports
3. Ensure Redux DevTools is installed for debugging
4. Check that all thunks are properly dispatched

**Last Updated:** November 13, 2025
