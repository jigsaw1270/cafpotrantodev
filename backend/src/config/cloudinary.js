const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Force HTTPS URLs
});

// Validate configuration
const validateCloudinaryConfig = () => {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  
  if (!cloud_name || !api_key || !api_secret) {
    console.warn('⚠️ Cloudinary credentials not configured. Image uploads will fail.');
    console.warn('Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
    return false;
  }
  
  console.log('✅ Cloudinary configured successfully');
  console.log(`   Cloud Name: ${cloud_name}`);
  return true;
};

// Upload helper function
const uploadToCloudinary = (filePath, folder = 'cafpotranto') => {
  return cloudinary.uploader.upload(filePath, {
    folder: folder,
    resource_type: 'image',
    transformation: [
      { width: 1200, height: 1200, crop: 'limit' }, // Limit max dimensions
      { quality: 'auto', fetch_format: 'auto' }, // Auto optimize quality and format
    ],
  });
};

// Delete helper function
const deleteFromCloudinary = (publicId) => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: 'image',
  });
};

// Get optimized URL
const getOptimizedUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    transformation: [
      { quality: 'auto', fetch_format: 'auto' },
      ...(options.width ? [{ width: options.width, crop: 'scale' }] : []),
      ...(options.height ? [{ height: options.height, crop: 'scale' }] : []),
    ],
    secure: true,
  });
};

module.exports = {
  cloudinary,
  validateCloudinaryConfig,
  uploadToCloudinary,
  deleteFromCloudinary,
  getOptimizedUrl,
};
