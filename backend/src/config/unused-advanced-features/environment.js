/**
 * Environment configuration and validation
 * Provides type-safe environment variable access with validation
 */

/**
 * Environment configuration schema
 */
const envConfig = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: parseInt(process.env.PORT) || 5000,
  API_VERSION: process.env.API_VERSION || '1.0.0',
  
  // Database configuration
  MONGODB_URI: process.env.MONGODB_URI,
  
  // Authentication
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  
  // Admin configuration
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@cafpatronatoaz.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  
  // File upload limits
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
  MAX_FILES: parseInt(process.env.MAX_FILES) || 10,
  
  // Cloudinary configuration
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  
  // Security
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  
  // Deployment
  VERCEL: process.env.VERCEL === '1',
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

/**
 * Required environment variables for different environments
 */
const requiredEnvVars = {
  production: [
    'MONGODB_URI',
    'JWT_SECRET',
    'ADMIN_PASSWORD',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ],
  development: [
    'MONGODB_URI',
    'JWT_SECRET',
  ],
  test: [
    'MONGODB_URI',
    'JWT_SECRET',
  ],
};

/**
 * Validates required environment variables
 */
const validateEnvironment = () => {
  const environment = envConfig.NODE_ENV;
  const required = requiredEnvVars[environment] || requiredEnvVars.production;
  
  const missing = required.filter(key => !envConfig[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error(`\n💡 Current environment: ${environment}`);
    console.error('Please check your .env file or environment configuration.\n');
    process.exit(1);
  }
  
  // Validate specific configurations
  validateSpecificConfigs();
  
  console.log(`✅ Environment validation passed for: ${environment}`);
};

/**
 * Validates specific configuration values
 */
const validateSpecificConfigs = () => {
  // Validate MongoDB URI format
  if (envConfig.MONGODB_URI && !envConfig.MONGODB_URI.startsWith('mongodb')) {
    console.error('❌ Invalid MONGODB_URI format. Must start with "mongodb"');
    process.exit(1);
  }
  
  // Validate JWT secret strength
  if (envConfig.JWT_SECRET && envConfig.JWT_SECRET.length < 32) {
    console.warn('⚠️  JWT_SECRET should be at least 32 characters long for security');
  }
  
  // Validate rate limiting values
  if (envConfig.RATE_LIMIT_MAX_REQUESTS < 1) {
    console.error('❌ RATE_LIMIT_MAX_REQUESTS must be greater than 0');
    process.exit(1);
  }
  
  // Validate file size limits
  if (envConfig.MAX_FILE_SIZE > 50 * 1024 * 1024) { // 50MB
    console.warn('⚠️  MAX_FILE_SIZE is quite large. Consider security implications.');
  }
};

/**
 * Gets environment-specific configuration
 */
const getEnvironmentConfig = () => {
  return {
    ...envConfig,
    isDevelopment: envConfig.NODE_ENV === 'development',
    isProduction: envConfig.NODE_ENV === 'production',
    isTest: envConfig.NODE_ENV === 'test',
    isVercel: envConfig.VERCEL,
  };
};

/**
 * Logs current environment configuration (safe for production)
 */
const logEnvironmentInfo = () => {
  const safeConfig = {
    NODE_ENV: envConfig.NODE_ENV,
    PORT: envConfig.PORT,
    API_VERSION: envConfig.API_VERSION,
    VERCEL: envConfig.VERCEL,
    RATE_LIMIT_WINDOW_MS: envConfig.RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_REQUESTS: envConfig.RATE_LIMIT_MAX_REQUESTS,
    MAX_FILE_SIZE: `${(envConfig.MAX_FILE_SIZE / 1024 / 1024).toFixed(1)}MB`,
    MAX_FILES: envConfig.MAX_FILES,
    BCRYPT_ROUNDS: envConfig.BCRYPT_ROUNDS,
    // Hide sensitive values
    MONGODB_URI: envConfig.MONGODB_URI ? '***configured***' : '❌ missing',
    JWT_SECRET: envConfig.JWT_SECRET ? '***configured***' : '❌ missing',
    ADMIN_PASSWORD: envConfig.ADMIN_PASSWORD ? '***configured***' : '❌ missing',
    CLOUDINARY_CLOUD_NAME: envConfig.CLOUDINARY_CLOUD_NAME ? '***configured***' : '❌ missing',
  };
  
  console.log('🔧 Environment Configuration:');
  console.table(safeConfig);
};

module.exports = {
  envConfig,
  validateEnvironment,
  getEnvironmentConfig,
  logEnvironmentInfo,
  requiredEnvVars,
};