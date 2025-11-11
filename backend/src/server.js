require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const subserviceRoutes = require('./routes/subservices');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { createDefaultAdmin } = require('./utils/createDefaultAdmin');
const { validateCloudinaryConfig } = require('./config/cloudinary');

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Enhanced CORS configuration with zero caching to fix browser cache issues
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow production domain
    if (origin === 'https://www.cafpatronatoaz.com' || origin === 'https://cafpatronatoaz.com') {
      return callback(null, true);
    }
    
    // Allow development domain
    if (origin === 'https://dev.cafpatronatoaz.com') {
      return callback(null, true);
    }
    
    // Allow Vercel preview deployments for cafpotrantoclient
    if (origin.includes('cafpotrantoclient') && origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Allow Vercel preview deployments for cafpotrantoadmin
    if (origin.includes('cafpotrantoadmin') && origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Allow Vercel preview deployments for cafpotrantodev (development frontend)
    if (origin.includes('cafpotrantodev') && origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Allow development environment
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 0, // ✅ CRITICAL: Prevent CORS preflight caching to fix browser cache issues
}));

// Middleware to add anti-cache headers for CORS preflight requests
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
  }
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'CafPatronatoAZ Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    cors: {
      maxAge: 0,
      cachePolicy: 'no-cache'
    }
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subservices', subserviceRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'CafPatronatoAZ Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      categories: '/api/categories',
      subservices: '/api/subservices',
      auth: '/api/auth'
    },
    cors: {
      maxAge: 0,
      credentials: true,
      cachePolicy: 'no-cache'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Validate Cloudinary configuration
    validateCloudinaryConfig();
    
    // Create default admin user
    await createDefaultAdmin();
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Start server only if not in serverless environment
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;

  const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`
🚀 CafPatronatoAZ Backend Server running!
📍 Environment: ${process.env.NODE_ENV}
🌐 Port: ${PORT}
📊 Health Check: http://localhost:${PORT}/api/health
 CORS Policy: Zero-cache, production-grade (maxAge: 0)
      `);
    });
  };

  startServer();
} else {
  // For Vercel serverless, just connect to DB
  connectDB();
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app;
