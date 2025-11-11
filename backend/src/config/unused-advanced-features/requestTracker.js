/**
 * Request tracking middleware for API monitoring and debugging
 */

const crypto = require('crypto');

/**
 * Generates a unique request ID
 */
const generateRequestId = () => {
  return crypto.randomBytes(16).toString('hex');
};

/**
 * Request tracking middleware that adds unique IDs and timing
 */
const requestTracker = (req, res, next) => {
  // Generate unique request ID
  const requestId = req.headers['x-request-id'] || generateRequestId();
  req.id = requestId;
  
  // Add request start time
  req.startTime = Date.now();
  
  // Set request ID in response headers
  res.set('X-Request-ID', requestId);
  
  // Track response time
  const originalSend = res.send;
  res.send = function(data) {
    const responseTime = Date.now() - req.startTime;
    res.set('X-Response-Time', `${responseTime}ms`);
    
    // Log request completion in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Request completed: ${req.method} ${req.originalUrl} - ${res.statusCode} (${responseTime}ms) [${requestId}]`);
    }
    
    return originalSend.call(this, data);
  };
  
  next();
};

/**
 * API versioning middleware
 */
const apiVersioning = (req, res, next) => {
  const apiVersion = req.headers['x-api-version'] || '1.0';
  req.apiVersion = apiVersion;
  res.set('X-API-Version', apiVersion);
  next();
};

/**
 * Request validation middleware
 */
const requestValidation = (req, res, next) => {
  // Validate Content-Type for POST/PUT requests
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.get('Content-Type');
    
    if (!contentType) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type header is required',
        requestId: req.id,
      });
    }
    
    if (!contentType.includes('application/json') && !contentType.includes('multipart/form-data')) {
      return res.status(415).json({
        success: false,
        message: 'Unsupported Media Type. Expected application/json or multipart/form-data',
        requestId: req.id,
      });
    }
  }
  
  next();
};

/**
 * Security headers middleware
 */
const securityHeaders = (req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  });
  
  next();
};

/**
 * API health check middleware
 */
const healthCheck = (req, res, next) => {
  if (req.path === '/api/health') {
    return res.status(200).json({
      status: 'OK',
      message: 'CafPatronatoAZ Backend API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.API_VERSION || '1.0.0',
      uptime: process.uptime(),
      requestId: req.id,
      cors: {
        maxAge: 0,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      },
    });
  }
  next();
};

module.exports = {
  requestTracker,
  apiVersioning,
  requestValidation,
  securityHeaders,
  healthCheck,
  generateRequestId,
};