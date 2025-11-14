# Dream Dubai E-commerce Backend API

A secure and scalable RESTful API built with Node.js, Express.js, and MongoDB for the Dream Dubai E-commerce platform admin panel.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: CRUD operations for user accounts
- **Product Management**: Full product catalog with categories, colors, sizes
- **Order Management**: Order processing, status updates, and tracking
- **Dashboard Analytics**: Real-time statistics and sales data
- **Security**: Helmet, CORS, rate limiting, password hashing
- **Validation**: Input validation using express-validator
- **Error Handling**: Centralized error handling middleware
- **Database**: MongoDB with Mongoose ODM

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dreamdubai
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=7d
   BCRYPT_SALT_ROUNDS=10
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud database
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product CRUD
│   ├── orderController.js   # Order management
│   ├── userController.js    # User management
│   └── dashboardController.js # Analytics
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Error handling
│   └── validator.js         # Input validation
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   └── Order.js             # Order schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── productRoutes.js     # Product endpoints
│   ├── orderRoutes.js       # Order endpoints
│   ├── userRoutes.js        # User endpoints
│   └── dashboardRoutes.js   # Dashboard endpoints
├── scripts/
│   └── seedDatabase.js      # Database seeding
├── .env.example             # Environment template
├── .gitignore
├── package.json
├── README.md
└── server.js                # Entry point
```

## 🔐 API Endpoints

### Authentication (`/api/auth`)
- `POST /login` - Login user
- `POST /register` - Register new user
- `GET /me` - Get current user profile
- `POST /logout` - Logout user
- `PUT /updatepassword` - Update password

### Products (`/api/products`)
- `GET /` - Get all products (pagination, search, filter)
- `GET /:id` - Get single product
- `POST /` - Create product (Admin)
- `PUT /:id` - Update product (Admin)
- `DELETE /:id` - Delete product (Admin)
- `GET /categories/list` - Get categories
- `GET /lowstock/list` - Get low stock products (Admin)

### Orders (`/api/orders`)
- `GET /` - Get all orders (Admin)
- `GET /:id` - Get single order
- `POST /` - Create order
- `PUT /:id/status` - Update order status (Admin)
- `DELETE /:id` - Delete order (Admin)

### Users (`/api/users`)
- `GET /` - Get all users (Admin)
- `GET /:id` - Get single user (Admin)
- `POST /` - Create user (Admin)
- `PUT /:id` - Update user (Admin)
- `DELETE /:id` - Delete user (Admin)
- `PUT /:id/toggle-status` - Toggle user status (Admin)

### Dashboard (`/api/dashboard`)
- `GET /stats` - Get dashboard statistics (Admin)
- `GET /sales` - Get sales data for charts (Admin)
- `GET /top-products` - Get top selling products (Admin)
- `GET /activity` - Get recent activity (Admin)

## 🔒 Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: bcryptjs with configurable salt rounds
3. **Helmet**: Security headers protection
4. **CORS**: Configured cross-origin resource sharing
5. **Rate Limiting**: Protection against brute-force attacks
6. **Input Validation**: express-validator for request validation
7. **Role-Based Access**: Admin and User role authorization
8. **Error Handling**: Secure error messages (no stack traces in production)

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/dreamdubai |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `BCRYPT_SALT_ROUNDS` | Password hashing rounds | 10 |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:5173 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 🧪 Testing

Test endpoints using:
- Postman
- Thunder Client (VS Code extension)
- curl commands

Example:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dreamdubai.com","password":"admin123"}'

# Get products (with token)
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Database Schema

### User
- name, email, password (hashed)
- role (User/Admin)
- phone, avatar, address
- isVerified, isActive
- totalOrders, totalSpent
- timestamps

### Product
- name, category, price, stock
- status (active/inactive)
- images (1-6), description, sku
- colors, sizes (for clothing)
- salesCount, totalRevenue
- timestamps

### Order
- orderNumber, user reference
- customerName, customerEmail, customerPhone
- items array (product, quantity, price)
- totalAmount, status, paymentStatus
- paymentMethod, shippingAddress
- trackingNumber, timestamps

## 🚦 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **cors**: CORS middleware
- **helmet**: Security headers
- **express-rate-limit**: Rate limiting
- **express-validator**: Input validation
- **morgan**: HTTP logging
- **compression**: Response compression
- **dotenv**: Environment variables

## 👥 Default Admin Account

After seeding:
- **Email**: admin@dreamdubai.com
- **Password**: admin123

⚠️ **Important**: Change default credentials in production!

## 📄 License

MIT License - Dream Dubai E-commerce Platform

## 🤝 Support

For issues or questions, please contact the development team.
