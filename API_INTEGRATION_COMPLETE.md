# API Integration Testing Guide

## Backend Server
- **URL**: http://localhost:5000/api
- **Status**: ✅ Running

## Frontend Admin Panel
- **URL**: http://localhost:5173
- **Status**: ✅ Running

## Default Admin Credentials
- **Email**: admin@dreamdubai.com
- **Password**: admin123

## API Endpoints Integrated

### Authentication (`/api/auth`)
- ✅ POST `/auth/login` - Admin login
- ✅ POST `/auth/register` - Register new user
- ✅ GET `/auth/me` - Get current user profile
- ✅ POST `/auth/logout` - Logout
- ✅ PUT `/auth/updatepassword` - Update password

### Products (`/api/products`)
- ✅ GET `/products` - Get all products (with pagination, search, filters)
- ✅ GET `/products/:id` - Get single product
- ✅ POST `/products` - Create product (Admin)
- ✅ PUT `/products/:id` - Update product (Admin)
- ✅ DELETE `/products/:id` - Delete product (Admin)
- ✅ GET `/products/categories/list` - Get categories
- ✅ GET `/products/lowstock/list` - Get low stock products (Admin)

### Orders (`/api/orders`)
- ✅ GET `/orders` - Get all orders (Admin, with pagination, search, filters)
- ✅ GET `/orders/:id` - Get single order
- ✅ POST `/orders` - Create order
- ✅ PUT `/orders/:id/status` - Update order status (Admin)
- ✅ DELETE `/orders/:id` - Delete order (Admin)

### Users (`/api/users`)
- ✅ GET `/users` - Get all users (Admin, with pagination, search, filters)
- ✅ GET `/users/:id` - Get single user (Admin)
- ✅ POST `/users` - Create user (Admin)
- ✅ PUT `/users/:id` - Update user (Admin)
- ✅ DELETE `/users/:id` - Delete user (Admin)
- ✅ PUT `/users/:id/toggle-status` - Toggle user active status (Admin)

### Dashboard (`/api/dashboard`)
- ✅ GET `/dashboard/stats` - Get dashboard statistics (Admin)
- ✅ GET `/dashboard/sales` - Get sales data (Admin)
- ✅ GET `/dashboard/top-products` - Get top selling products (Admin)
- ✅ GET `/dashboard/activity` - Get recent activity (Admin)

## Testing Steps

### 1. Test Login
1. Open http://localhost:5173
2. Login with `admin@dreamdubai.com` / `admin123`
3. Should redirect to dashboard

### 2. Test Dashboard
1. Check if statistics cards show real data:
   - Total Users
   - Total Products
   - Total Orders
   - Total Revenue
2. Check if sales chart displays data
3. Check if top products list appears
4. Check if recent activity shows

### 3. Test Products Page
1. Navigate to Products
2. Verify products list loads from API
3. Test search functionality
4. Test category filter
5. Test status filter
6. Test pagination
7. Test "Add Product" button
8. Test edit product
9. Test delete product

### 4. Test Orders Page
1. Navigate to Orders
2. Verify orders list loads from API
3. Test search by order number/customer
4. Test status filter
5. Test status update (change order status)
6. Test pagination

### 5. Test Users Page
1. Navigate to Users
2. Verify users list loads from API
3. Test search functionality
4. Test role filter
5. Test pagination
6. Test toggle user status

## Sample Data
The database has been seeded with:
- ✅ 3 users (1 admin, 2 regular users)
- ✅ 7 products across all categories
- ✅ 2 sample orders

## Changes Made

### ✅ API Service (`/admin/src/services/api.js`)
- Updated all endpoints to match backend routes
- Removed `/admin` prefix from routes
- Added missing endpoints (register, updatePassword, categories, lowStock, etc.)

### ✅ Redux Thunks
- **authThunks.js**: Updated to use real authAPI, added getProfile function
- **productThunks.js**: Updated to use productsAPI instead of mock functions
- **orderThunks.js**: Updated to use ordersAPI instead of mock functions
- **userThunks.js**: Updated to use usersAPI, added toggleUserStatus and deleteUser
- **dashboardThunks.js**: Updated to fetch all 4 dashboard endpoints (stats, sales, topProducts, activity)

### ✅ Response Structure Fixes
- Fixed all thunks to handle backend response format: `response.data.data`
- Products: `response.data.data.products`
- Orders: `response.data.data.orders`
- Users: `response.data.data.users`
- Dashboard: Multiple data structures

### ✅ Mock Data Removal
- ❌ Deleted `mockAuth.js`
- ❌ Deleted `mockProducts.js`
- ❌ Deleted `mockOrders.js`
- ❌ Deleted `mockUsers.js`
- ❌ Deleted `mockDashboard.js`

### ✅ Constants File
- ✅ Created `/admin/src/utils/constants.js`
- Moved product categories, colors, sizes, and other constants
- Updated Products.jsx to import from constants

### ✅ Environment Configuration
- Backend: `.env` configured with `PORT=5000`, `MONGODB_URI`, `JWT_SECRET`
- Frontend: `.env` configured with `VITE_API_URL=http://localhost:5000/api`

## Known Issues

### Backend Warning (Non-Critical)
- Mongoose duplicate schema index warning on `orderNumber` field
- Does not affect functionality
- Can be fixed by removing `unique: true` from schema if `index: true` is also set

## Success Criteria
- ✅ Backend server running on port 5000
- ✅ Frontend running on port 5173
- ✅ All mock data files deleted
- ✅ All Redux thunks updated to use real API
- ✅ API service endpoints match backend routes
- ✅ JWT authentication with token storage
- ✅ Axios interceptors for auth token and error handling
- ✅ All pages ready to consume real API data

## Next Steps for User
1. Test the login flow
2. Navigate through all pages (Dashboard, Products, Orders, Users)
3. Test CRUD operations (Create, Read, Update, Delete)
4. Verify data persists in MongoDB
5. Test search and filter functionality
6. Test pagination on all list pages

## Troubleshooting

### If backend is not running:
```bash
cd backend
npm run dev
```

### If frontend is not running:
```bash
cd admin
npm run dev
```

### If MongoDB connection fails:
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas connection string in `.env`

### If you see CORS errors:
- Backend CORS is configured for `http://localhost:5173`
- Check if frontend is running on correct port

### If authentication fails:
- Clear localStorage: `localStorage.clear()`
- Re-seed database: `cd backend && npm run seed`
- Try logging in again with admin credentials
