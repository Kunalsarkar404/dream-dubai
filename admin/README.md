# Dream Dubai - Admin Panel

A full-featured admin panel for managing the Dream Dubai e-commerce platform. Built with React, Redux Toolkit, and modern web technologies.

## 🎨 Theme Colors

- **Primary Yellow/Gold**: `#FFD700`
- **Sky Blue**: `#87CEEB`
- **Ocean Blue**: `#006994`

## ✨ Features

### 1. Authentication
- Secure login with email and password
- JWT token-based authentication
- Protected routes
- Auto-redirect on unauthorized access

### 2. Dashboard
- Summary cards showing:
  - Total Users
  - Total Products
  - Total Orders
  - Total Revenue (in AED)
- Interactive Chart.js graphs for:
  - Monthly Sales
  - Monthly Orders

### 3. Product Management
- View all products in a table
- Search products by name
- Filter by category
- Add new products with modal form
- Edit existing products
- Delete products with confirmation
- Pagination support
- Status badges (Active/Inactive/Low Stock/Out of Stock)

### 4. Order Management
- View all orders in a table
- Search orders by ID or customer
- Filter by status (Pending/Shipped/Delivered/Cancelled)
- View detailed order information
- Update order status
- Display order items and totals
- Pagination support

### 5. User Management
- View all registered users
- Display user roles (Admin/User)
- Show registration dates
- Pagination support

### 6. Error Pages
- 404 Not Found page
- 401 Unauthorized page
- Loading spinner screens

### 7. UI Components
- Responsive sidebar with hamburger menu
- Header with notifications and messages
- Reusable components:
  - Modal
  - Table
  - Pagination
  - SearchBar
  - StatusBadge
  - LoadingSpinner
  - SummaryCard

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the admin directory:
```bash
cd admin
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your backend API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

### Development

Run the development server:
```bash
npm run dev
```

The admin panel will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── SummaryCard.jsx
│   │   │   └── Table.jsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Orders.jsx
│   │   ├── Users.jsx
│   │   ├── NotFound.jsx
│   │   └── Unauthorized.jsx
│   ├── redux/               # State management
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── productSlice.js
│   │   │   ├── orderSlice.js
│   │   │   ├── userSlice.js
│   │   │   └── dashboardSlice.js
│   │   └── store.js
│   ├── services/            # API services
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Global styles
├── .env
├── .env.example
├── package.json
└── vite.config.js
```

## 🔌 API Integration

The admin panel expects the following API endpoints:

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/profile` - Get admin profile

### Dashboard
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/dashboard/sales` - Get sales data

### Products
- `GET /api/admin/products` - Get all products (with pagination)
- `GET /api/admin/products/:id` - Get product by ID
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Orders
- `GET /api/admin/orders` - Get all orders (with pagination)
- `GET /api/admin/orders/:id` - Get order by ID
- `PATCH /api/admin/orders/:id/status` - Update order status

### Users
- `GET /api/admin/users` - Get all users (with pagination)
- `GET /api/admin/users/:id` - Get user by ID

## 🎯 Development Phases

### Phase 1: Core Infrastructure ✅
- Project setup with Vite
- Dependencies installation
- Folder structure
- Global styles and theme
- Redux store configuration
- API service setup

### Phase 2: Reusable Components ✅
- Common UI components
- Layout components (Header, Sidebar)
- Protected route component

### Phase 3: Authentication & Dashboard ✅
- Login page with validation
- Dashboard with summary cards
- Chart.js integration for graphs

### Phase 4: Product & Order Management ✅
- Product listing with CRUD operations
- Order management with status updates
- Modal forms for add/edit

### Phase 5: User Management & Error Pages ✅
- User listing
- Error pages (404, 401)
- Loading states

### Phase 6: Routing & Integration ✅
- React Router setup
- Protected routes
- Navigation flow

## 🛠️ Technologies Used

- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **React Icons** - Icon library
- **Vite** - Build tool

## 🎨 Design Features

- Modern, responsive design
- Mobile-friendly with hamburger menu
- Consistent color scheme (Yellow, Sky Blue, Ocean Blue)
- Smooth animations and transitions
- Accessible UI components
- Custom scrollbar styling

## 💰 Currency

All prices are displayed in **AED (United Arab Emirates Dirham)**.

## 📝 Mock Data

The application includes mock data for development when the backend is not available. This allows you to see the UI and test functionality without a running backend server.

## 🔒 Security

- JWT token stored in localStorage
- Automatic token refresh
- Protected routes with authentication check
- 401 auto-redirect to login
- Secure API calls with interceptors

## 📱 Responsive Design

The admin panel is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1280px - 1920px)
- Tablet (768px - 1280px)
- Mobile (below 768px)

## 🤝 Contributing

When adding new features:
1. Create reusable components in `components/common`
2. Follow the existing file structure
3. Use Redux for state management
4. Keep CSS modular with component-specific files
5. Follow the theme color palette

## 📄 License

This project is part of the Dream Dubai e-commerce platform.

---

**Brand**: Dream Dubai  
**Admin Panel Version**: 1.0.0  
**Last Updated**: November 2025

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
