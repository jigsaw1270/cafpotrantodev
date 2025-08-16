# CafPotranto Backend API

Professional backend API for CafPotranto Legal Services website, providing comprehensive management of legal service categories and subservices.

## 🚀 Features

- **JWT Authentication** - Secure admin authentication with role-based access
- **Category Management** - Full CRUD operations for service categories
- **Subservice Management** - Complete subservice management with advanced features
- **File Upload** - Image upload support for categories and subservices
- **Search & Filtering** - Advanced search and filtering capabilities
- **Pagination** - Efficient data pagination for large datasets
- **Validation** - Comprehensive input validation and error handling
- **Security** - Rate limiting, CORS, helmet security headers
- **MongoDB Integration** - Mongoose ODM with advanced schemas and relationships

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting
- **Environment**: dotenv
- **Development**: Nodemon

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── models/           # Mongoose models
│   │   ├── Admin.js      # Admin user model
│   │   ├── Category.js   # Service category model
│   │   └── Subservice.js # Subservice model
│   ├── routes/           # Express routes
│   │   ├── auth.js       # Authentication routes
│   │   ├── categories.js # Category management routes
│   │   └── subservices.js# Subservice management routes
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js       # JWT authentication middleware
│   │   ├── errorHandler.js# Global error handler
│   │   └── upload.js     # File upload middleware
│   ├── utils/            # Utility functions
│   │   └── createDefaultAdmin.js# Default admin creation
│   └── server.js         # Main server file
├── uploads/              # File upload directory
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
└── package.json         # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### 3. Configure Environment Variables
```env
# Database
MONGODB_URI=mongodb://localhost:27017/cafpotranto

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Admin User (Default)
ADMIN_EMAIL=admin@cafpotranto.it
ADMIN_PASSWORD=Admin123!

# Server
PORT=5000
NODE_ENV=development

# CORS
CLIENT_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=5000000
UPLOAD_PATH=./uploads
```

### 4. Start the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

### 5. Verify Installation
Visit `http://localhost:5000/api/health` to check if the server is running.

## 📚 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@cafpotranto.it",
  "password": "Admin123!"
}
```

#### Get Current Admin
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "new@email.com"
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "current",
  "newPassword": "newpass",
  "confirmPassword": "newpass"
}
```

### Category Endpoints

#### Get Categories
```http
GET /api/categories?page=1&limit=10&search=legal&active=true
```

#### Get Single Category
```http
GET /api/categories/{id}
```

#### Create Category
```http
POST /api/categories
Authorization: Bearer {token}
Content-Type: multipart/form-data

name: "CAF Services"
description: "Complete tax assistance services"
displayOrder: 1
isActive: true
image: [file]
```

#### Update Category
```http
PUT /api/categories/{id}
Authorization: Bearer {token}
Content-Type: multipart/form-data

name: "Updated CAF Services"
description: "Updated description"
```

#### Delete Category
```http
DELETE /api/categories/{id}
Authorization: Bearer {token}
```

#### Get Category Subservices
```http
GET /api/categories/{id}/subservices?page=1&limit=10
```

### Subservice Endpoints

#### Get Subservices
```http
GET /api/subservices?page=1&limit=10&categoryId={id}&search=tax&featured=true
```

#### Get Single Subservice
```http
GET /api/subservices/{id}
```

#### Create Subservice
```http
POST /api/subservices
Authorization: Bearer {token}
Content-Type: multipart/form-data

categoryId: "60f7b3b3b3b3b3b3b3b3b3b3"
name: "Tax Return Preparation"
description: "Professional tax return preparation service"
shortDescription: "Expert tax returns"
price_start: 150.00
priceType: "starting_from"
rating: 4.8
reviews_count: 25
notes: "Popular service"
isActive: true
isFeatured: true
displayOrder: 1
tags: ["tax", "returns", "preparation"]
image: [file]
```

#### Update Subservice
```http
PUT /api/subservices/{id}
Authorization: Bearer {token}
Content-Type: multipart/form-data

name: "Updated Service Name"
price_start: 200.00
```

#### Delete Subservice
```http
DELETE /api/subservices/{id}
Authorization: Bearer {token}
```

#### Get Featured Subservices
```http
GET /api/subservices/featured?limit=6
```

#### Search Subservices
```http
GET /api/subservices/search?q=tax&categoryId={id}&minPrice=100&maxPrice=500
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer {your_jwt_token}
```

### Default Admin Account
- **Email**: `admin@cafpotranto.it`
- **Password**: `Admin123!`

**⚠️ Important**: Change the default password immediately after first login.

## 📁 File Upload

The API supports image uploads for categories and subservices:

- **Supported formats**: JPEG, JPG, PNG, GIF, WebP, SVG
- **Maximum size**: 5MB
- **Storage location**: `./uploads/`
- **Access**: Files are served at `/uploads/{filename}`

## 🚦 Rate Limiting

- **Window**: 15 minutes
- **Max requests**: 100 per IP
- **Scope**: All `/api/` endpoints

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request throttling
- **Input Validation**: Comprehensive validation
- **Password Hashing**: bcrypt with salt rounds
- **JWT Expiration**: Configurable token expiry
- **Account Locking**: Failed login attempt protection

## 🗄️ Database Schema

### Admin Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  role: String (admin|superadmin),
  isActive: Boolean,
  lastLogin: Date,
  loginAttempts: Number,
  lockUntil: Date,
  timestamps: true
}
```

### Category Model
```javascript
{
  name: String (unique, required),
  description: String (required),
  slug: String (auto-generated),
  image: Object (file metadata),
  isActive: Boolean,
  displayOrder: Number,
  metadata: Object (SEO),
  subservicesCount: Number,
  timestamps: true
}
```

### Subservice Model
```javascript
{
  categoryId: ObjectId (ref Category),
  name: String (required),
  description: String (required),
  shortDescription: String,
  price_start: Number (required),
  priceType: String (enum),
  rating: Number (0-5),
  reviews_count: Number,
  notes: String,
  slug: String (auto-generated),
  image: Object (file metadata),
  isActive: Boolean,
  isFeatured: Boolean,
  displayOrder: Number,
  tags: [String],
  features: [Object],
  requirements: [Object],
  estimatedDuration: Object,
  metadata: Object (SEO),
  stats: Object (views, inquiries, bookings),
  timestamps: true
}
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cafpotranto
JWT_SECRET=complex_production_secret_key
CLIENT_URL=https://your-frontend-domain.com
```

### PM2 Process Manager
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/server.js --name cafpotranto-api

# Monitor
pm2 monit

# Logs
pm2 logs cafpotranto-api
```

### Docker Support
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 Development Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint issues
npm test         # Run tests
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB is running
   - Verify connection string in `.env`
   - Ensure network connectivity

2. **JWT Token Invalid**
   - Check JWT_SECRET in environment
   - Verify token hasn't expired
   - Ensure proper Authorization header format

3. **File Upload Fails**
   - Check upload directory permissions
   - Verify file size under limit
   - Ensure supported file format

4. **Rate Limit Exceeded**
   - Wait for rate limit window to reset
   - Check if multiple requests from same IP

## 📞 Support

For support and questions:
- Email: info@cafpotranto.it
- Documentation: Check API endpoints above
- Issues: Create GitHub issue

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Your CafPotranto Backend API is ready!**

The backend provides a robust foundation for managing legal services with professional-grade security, validation, and performance features.
