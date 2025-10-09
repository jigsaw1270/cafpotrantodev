const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let subDir = 'general';
    
    // Create subdirectories based on the route
    if (req.baseUrl.includes('categories')) {
      subDir = 'categories';
    } else if (req.baseUrl.includes('subservices')) {
      subDir = 'subservices';
    }
    
    const fullPath = path.join(uploadDir, subDir);
    
    // Create subdirectory if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 20);
    
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'));
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 1, // Only allow 1 file per upload
  },
  fileFilter: fileFilter,
});

// Middleware to handle file upload errors
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.',
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Only 1 file allowed.',
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.',
      });
    }
  }
  
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error',
    });
  }
  
  next();
};

// Helper function to delete file
const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Helper function to get file URL
const getFileUrl = (req, file) => {
  if (!file) return null;
  
  // Use production URL in production, or local URL in development
  let baseUrl;
  if (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production') {
    // In production, use the current deployment URL
    baseUrl = `https://${req.get('host')}`;
  } else {
    // In development, force HTTP for localhost to avoid Next.js image issues
    const host = req.get('host');
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
      baseUrl = `http://${host}`;
    } else {
      baseUrl = `${req.protocol}://${host}`;
    }
  }
  
  // Get the relative path from uploads directory
  let relativePath = file.path.replace(/\\/g, '/'); // Convert Windows backslashes to forward slashes
  
  // Remove the uploadDir prefix and ensure we have the correct path structure
  const normalizedUploadDir = path.resolve(uploadDir).replace(/\\/g, '/');
  const normalizedFilePath = path.resolve(file.path).replace(/\\/g, '/');
  
  // Get the path relative to the upload directory
  relativePath = normalizedFilePath.replace(normalizedUploadDir, '');
  
  // Ensure the path starts with a forward slash
  if (!relativePath.startsWith('/')) {
    relativePath = '/' + relativePath;
  }
  
  return `${baseUrl}/uploads${relativePath}`;
};

// Middleware to process uploaded file
const processUploadedFile = (req, res, next) => {
  if (req.file) {
    req.fileData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url: getFileUrl(req, req.file),
    };
  }
  next();
};

module.exports = {
  upload,
  handleUploadError,
  deleteFile,
  getFileUrl,
  processUploadedFile,
};
