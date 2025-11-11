/**
 * CORS Configuration Module
 * Implements production-grade CORS policy with zero caching and comprehensive origin validation
 */

const corsConfig = {
  // Static origins that are always allowed
  staticOrigins: [
    'http://localhost:3000',
    'http://localhost:3001', // Admin panel dev
    'https://www.cafpatronatoaz.com',
    'https://cafpatronatoaz.com',
    'https://dev.cafpatronatoaz.com',
    'https://staging.cafpatronatoaz.com',
  ],
  
  // Dynamic patterns for Vercel deployments
  vercelPatterns: [
    /^https:\/\/cafpotrantodev-.*\.vercel\.app$/,
    /^https:\/\/cafpotrantoclient-.*\.vercel\.app$/,
    /^https:\/\/cafpotrantoadmin-.*\.vercel\.app$/,
    /^https:\/\/.*-jigsaw1270s-projects\.vercel\.app$/,
  ],
  
  // Development patterns
  developmentPatterns: [
    /^http:\/\/localhost:\d+$/,
    /^http:\/\/127\.0\.0\.1:\d+$/,
    /^http:\/\/0\.0\.0\.0:\d+$/,
  ],
};

/**
 * Validates if an origin is allowed by the CORS policy
 * @param {string|undefined} origin - The origin to validate
 * @returns {boolean} - Whether the origin is allowed
 */
const isOriginAllowed = (origin) => {
  // Allow requests with no origin (mobile apps, server-to-server)
  if (!origin) return true;
  
  // Check static origins
  if (corsConfig.staticOrigins.includes(origin)) {
    return true;
  }
  
  // Check Vercel deployment patterns
  if (corsConfig.vercelPatterns.some(pattern => pattern.test(origin))) {
    return true;
  }
  
  // Check development patterns in development environment
  if (process.env.NODE_ENV === 'development') {
    if (corsConfig.developmentPatterns.some(pattern => pattern.test(origin))) {
      return true;
    }
  }
  
  return false;
};

/**
 * CORS options with production-grade configuration
 */
const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      // Log allowed origins in development for debugging
      if (process.env.NODE_ENV === 'development' && origin) {
        console.log(`✅ CORS allowed: ${origin}`);
      }
      return callback(null, true);
    }
    
    // Log rejected origins for security monitoring
    console.warn(`🚫 CORS rejected: ${origin || 'undefined'}`);
    
    const error = new Error(`CORS policy violation: Origin '${origin}' not allowed`);
    error.statusCode = 403;
    callback(error);
  },
  
  // Credentials support for authentication
  credentials: true,
  
  // Allowed HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  
  // Allowed headers
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'X-Requested-With',
    'Cache-Control',
    'Pragma',
    'Expires',
  ],
  
  // Exposed headers for client access
  exposedHeaders: [
    'Content-Length',
    'Date',
    'X-Request-ID',
    'X-Response-Time',
  ],
  
  // Critical: Prevent CORS preflight caching to avoid browser cache issues
  maxAge: 0,
  
  // Handle preflight requests properly
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

/**
 * Middleware to add cache-busting headers for CORS preflight requests
 */
const corsAntiCacheMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Vary': 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
    });
  }
  next();
};

/**
 * Development CORS monitor middleware
 */
const corsMonitorMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const origin = req.get('Origin');
    const method = req.method;
    
    if (method === 'OPTIONS') {
      console.log(`🔍 CORS Preflight: ${method} ${req.path} from ${origin || 'no-origin'}`);
    } else if (origin) {
      console.log(`📡 CORS Request: ${method} ${req.path} from ${origin}`);
    }
  }
  next();
};

module.exports = {
  corsOptions,
  corsAntiCacheMiddleware,
  corsMonitorMiddleware,
  isOriginAllowed,
  corsConfig,
};