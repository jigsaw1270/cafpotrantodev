/**
 * Environment configuration and utilities
 * Centralized place for all environment-related configuration
 */

export const env = {
  // API Configuration
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',

  // Site Configuration
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Environment Detection
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Debug Configuration
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  SHOW_DEV_TOOLBAR: process.env.NEXT_PUBLIC_SHOW_DEV_TOOLBAR === 'true',
  LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',

  // Auth Configuration
  BYPASS_AUTH: process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true',
} as const;

// Environment helpers
export const isDevelopment =
  env.ENVIRONMENT === 'development' || env.NODE_ENV === 'development';
export const isProduction =
  env.ENVIRONMENT === 'production' && env.NODE_ENV === 'production';
export const isLocal =
  typeof window !== 'undefined' && window.location.hostname === 'localhost';

// Development features configuration
export const devFeatures = {
  showDebugInfo: isDevelopment && env.SHOW_DEV_TOOLBAR,
  enableTestData: isDevelopment,
  bypassAuth: isDevelopment && env.BYPASS_AUTH,
  verboseLogging: isDevelopment || env.DEBUG_MODE,
  showEnvironmentInfo: isDevelopment,
} as const;

// Logging utility based on environment
export const logger = {
  debug: (...args: any[]) => {
    if (devFeatures.verboseLogging || env.LOG_LEVEL === 'debug') {
      console.log('🐛 [DEBUG]', ...args);
    }
  },

  info: (...args: any[]) => {
    if (!isProduction || ['debug', 'info'].includes(env.LOG_LEVEL)) {
      console.log('ℹ️ [INFO]', ...args);
    }
  },

  warn: (...args: any[]) => {
    if (!isProduction || ['debug', 'info', 'warn'].includes(env.LOG_LEVEL)) {
      console.warn('⚠️ [WARN]', ...args);
    }
  },

  error: (...args: any[]) => {
    console.error('❌ [ERROR]', ...args);
  },
};

// Environment validation
export const validateEnvironment = () => {
  const errors: string[] = [];

  if (!env.API_URL) {
    errors.push('NEXT_PUBLIC_API_URL is not configured');
  }

  if (!env.SITE_URL) {
    errors.push('NEXT_PUBLIC_SITE_URL is not configured');
  }

  if (isProduction && env.DEBUG_MODE) {
    logger.warn('Debug mode is enabled in production environment');
  }

  if (errors.length > 0) {
    logger.error('Environment validation failed:', errors);
    return false;
  }

  logger.info('Environment validation passed', {
    environment: env.ENVIRONMENT,
    apiUrl: env.API_URL,
    siteUrl: env.SITE_URL,
    isDevelopment,
    isProduction,
  });

  return true;
};

// Environment info for debugging
export const getEnvironmentInfo = () => ({
  environment: env.ENVIRONMENT,
  nodeEnv: env.NODE_ENV,
  apiUrl: env.API_URL,
  siteUrl: env.SITE_URL,
  isDevelopment,
  isProduction,
  isLocal,
  debugMode: env.DEBUG_MODE,
  showDevToolbar: env.SHOW_DEV_TOOLBAR,
  logLevel: env.LOG_LEVEL,
  features: devFeatures,
  timestamp: new Date().toISOString(),
});
