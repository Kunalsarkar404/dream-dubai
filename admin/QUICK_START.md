# Dream Dubai Admin Panel - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd admin
npm install
```

### Step 2: Configure Environment
Create a `.env` file (or use the existing one):
```bash
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Run Development Server
```bash
npm run dev
```

The admin panel will open at: **http://localhost:5174/**

## 🎯 Quick Test Guide

### 1. Test Login Screen
- Navigate to http://localhost:5174/login
- Try entering credentials (currently uses mock authentication)
- Form validation will check:
  - Email format
  - Password length (min 6 characters)

### 2. Test Dashboard
- After login (or directly navigate to `/dashboard`)
- View summary cards showing stats
- Check the interactive Chart.js graph

### 3. Test Product Management
Navigate to `/products`:
- **Search**: Type in the search bar
- **Filter**: Select a category from dropdown
- **Add Product**: Click "Add Product" button
  - Fill in the form
  - Submit to see new product in list
- **Edit Product**: Click edit icon
  - Modify product details
  - Save changes
- **Delete Product**: Click delete icon
  - Confirm deletion

### 4. Test Order Management
Navigate to `/orders`:
- **View Orders**: See all orders in table
- **Filter**: Select status from dropdown
- **View Details**: Click eye icon to see order details
- **Update Status**: Change status and click "Update Status"

### 5. Test User Management
Navigate to `/users`:
- View all registered users
- See role badges (Admin/User)
- Check pagination

### 6. Test Error Pages
- Navigate to `/nonexistent` → See 404 page
- Try accessing protected route when logged out → See 401 page

## 📱 Test Responsive Design

1. **Desktop View** (Default)
   - Full sidebar visible
   - All features accessible

2. **Mobile View** (< 768px)
   - Hamburger menu appears
   - Click to toggle sidebar
   - Tap outside to close

To test:
- Open browser DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
- Select different device sizes

## 🎨 Theme & Branding

The admin panel uses Dream Dubai's color scheme:
- **Primary**: Gold/Yellow (`#FFD700`) - Logo, accents
- **Secondary**: Sky Blue (`#87CEEB`) - Buttons, highlights
- **Accent**: Ocean Blue (`#006994`) - Header, sidebar, primary actions

## 💰 Currency Format

All monetary values are displayed in **AED (Dirham)**:
- Format: `AED 1,234.56`
- Used throughout product prices, order totals, revenue

## 🔐 Authentication (Mock Mode)

Currently using mock authentication. To test:
1. Go to login page
2. Enter any valid email (e.g., `admin@dreamdubai.com`)
3. Enter password (min 6 chars, e.g., `password123`)
4. Click Login

The app will:
- Store token in localStorage
- Redirect to dashboard
- Enable protected routes

To test logout:
- Click "Logout" button in header
- Token will be cleared
- Redirected to login page

## 📊 Mock Data

The application includes mock data for:
- Dashboard statistics
- Products (5 sample products)
- Orders (4 sample orders)
- Users (5 sample users)
- Sales data (6 months)

This allows full testing without a backend server.

## 🔌 Connecting to Real Backend

When you have a backend API ready:

1. Update `.env` file:
```bash
VITE_API_URL=https://your-api-domain.com/api
```

2. Ensure backend implements these endpoints:
   - Auth: `/api/admin/login`, `/api/admin/logout`
   - Dashboard: `/api/admin/dashboard/stats`, `/api/admin/dashboard/sales`
   - Products: `/api/admin/products` (GET, POST, PUT, DELETE)
   - Orders: `/api/admin/orders` (GET, PATCH)
   - Users: `/api/admin/users` (GET)

3. Backend should return JWT token on login
4. All requests include `Authorization: Bearer <token>` header

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📦 Production Build

To build for production:

```bash
npm run build
```

Build output will be in the `dist/` folder, ready to deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use 5174 or next available port.

### Module Not Found
Run `npm install` to ensure all dependencies are installed.

### API Errors
Check browser console (F12) for detailed error messages. When backend is not available, mock data will be used automatically.

### Redux State Issues
Clear localStorage and refresh:
```javascript
localStorage.clear()
location.reload()
```

## 📚 Project Structure Quick Reference

```
admin/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components (routes)
│   ├── redux/           # State management
│   ├── services/        # API service
│   └── utils/           # Helper functions
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## ✨ Key Features to Test

✅ Login with validation  
✅ Dashboard with charts  
✅ Product CRUD operations  
✅ Order management  
✅ User listing  
✅ Search functionality  
✅ Filters and pagination  
✅ Modals for add/edit  
✅ Status badges  
✅ Responsive design  
✅ Error pages  
✅ Loading states  

## 🎉 You're Ready!

The Dream Dubai Admin Panel is fully functional and ready for testing. Explore all features and enjoy the modern, responsive interface!

---

**Need Help?** Check the main README.md for detailed documentation.

**Current Status**: ✅ Running on http://localhost:5174/
