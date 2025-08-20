const express = require('express');
const { body, validationResult, param, query } = require('express-validator');
const Subservice = require('../models/Subservice');
const Category = require('../models/Category');
const { authMiddleware, requireAdmin } = require('../middleware/auth');
const { upload, handleUploadError, processUploadedFile, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @desc    Get all subservices
// @route   GET /api/subservices
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('sort').optional().isIn(['name', 'price_start', 'rating', 'createdAt', 'displayOrder']).withMessage('Invalid sort field'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc'),
  query('search').optional().isLength({ min: 1 }).withMessage('Search term cannot be empty'),
  query('categoryId').optional().isMongoId().withMessage('Invalid category ID'),
  query('active').optional().custom((value) => {
    return value === true || value === false || value === 'true' || value === 'false';
  }).withMessage('Active must be boolean'),
  query('featured').optional().custom((value) => {
    return value === true || value === false || value === 'true' || value === 'false';
  }).withMessage('Featured must be boolean'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const {
      page = 1,
      limit = 10,
      sort = 'displayOrder',
      order = 'asc',
      search,
      categoryId,
      active = true,
      featured,
      minPrice,
      maxPrice,
    } = req.query;

    const skip = (page - 1) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    // Build query
    let query = {};
    
    if (active !== undefined) {
      // Handle both boolean and string values
      query.isActive = active === true || active === 'true';
    }

    if (featured !== undefined) {
      // Handle both boolean and string values
      query.isFeatured = featured === true || featured === 'true';
    }

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price_start = {};
      if (minPrice !== undefined) query.price_start.$gte = parseFloat(minPrice);
      if (maxPrice !== undefined) query.price_start.$lte = parseFloat(maxPrice);
    }

    const subservices = await Subservice.find(query)
      .sort({ [sort]: sortOrder })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('categoryId', 'name slug');

    const total = await Subservice.countDocuments(query);

    res.json({
      success: true,
      data: {
        subservices,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });

  } catch (error) {
    console.error('Get subservices error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Get single subservice by slug
// @route   GET /api/subservices/slug/:slug
// @access  Public
router.get('/slug/:slug', [
  param('slug').notEmpty().withMessage('Slug is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const subservice = await Subservice.findOne({ slug: req.params.slug })
      .populate('categoryId', 'name slug description');

    if (!subservice) {
      return res.status(404).json({
        success: false,
        message: 'Subservice not found',
      });
    }

    // Increment view count (optional, only for public views)
    if (!req.admin) {
      await subservice.incrementViews();
    }

    res.json({
      success: true,
      data: {
        subservice,
      },
    });

  } catch (error) {
    console.error('Get subservice by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Get single subservice
// @route   GET /api/subservices/:id
// @access  Public
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid subservice ID'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const subservice = await Subservice.findById(req.params.id)
      .populate('categoryId', 'name slug description');

    if (!subservice) {
      return res.status(404).json({
        success: false,
        message: 'Subservice not found',
      });
    }

    // Increment view count (optional, only for public views)
    if (!req.admin) {
      await subservice.incrementViews();
    }

    res.json({
      success: true,
      data: {
        subservice,
      },
    });

  } catch (error) {
    console.error('Get subservice error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Create subservice
// @route   POST /api/subservices
// @access  Private (Admin)
router.post('/', [
  authMiddleware,
  requireAdmin,
  upload.single('image'),
  handleUploadError,
  processUploadedFile,
  body('categoryId')
    .isMongoId()
    .withMessage('Valid category ID is required'),
  body('name')
    .notEmpty()
    .isLength({ min: 2, max: 100 })
    .withMessage('Subservice name must be between 2 and 100 characters'),
  body('description')
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  body('shortDescription')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Short description cannot exceed 200 characters'),
  body('price_start')
    .isFloat({ min: 0 })
    .withMessage('Starting price must be a positive number'),
  body('priceType')
    .optional()
    .isIn(['fixed', 'starting_from', 'hourly', 'consultation'])
    .withMessage('Invalid price type'),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  body('reviews_count')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Review count must be a positive integer'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be boolean'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be boolean'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a positive integer'),
  body('tags')
    .optional()
    .custom((value) => {
      if (Array.isArray(value) || typeof value === 'string') {
        return true;
      }
      throw new Error('Tags must be an array or string');
    }),
  body('features')
    .optional()
    .custom((value) => {
      if (Array.isArray(value) || typeof value === 'string') {
        return true;
      }
      throw new Error('Features must be an array or string');
    }),
  body('requirements')
    .optional()
    .custom((value) => {
      if (Array.isArray(value) || typeof value === 'string') {
        return true;
      }
      throw new Error('Requirements must be an array or string');
    }),
], async (req, res) => {
  try {
    // Debug logging
    console.log('=== CREATE SUBSERVICE DEBUG ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Tags type:', typeof req.body.tags, 'Value:', req.body.tags);
    console.log('Features type:', typeof req.body.features, 'Value:', req.body.features);
    console.log('Requirements type:', typeof req.body.requirements, 'Value:', req.body.requirements);
    console.log('================================');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { categoryId } = req.body;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      return res.status(400).json({
        success: false,
        message: 'Category not found',
      });
    }

    const subserviceData = {
      ...req.body,
      price_start: parseFloat(req.body.price_start),
      rating: parseFloat(req.body.rating || 0),
      reviews_count: parseInt(req.body.reviews_count || 0),
      displayOrder: parseInt(req.body.displayOrder || 1),
      isActive: req.body.isActive === 'true' || req.body.isActive === true,
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
    };

    // Debug the converted data
    console.log('=== CONVERTED DATA DEBUG ===');
    console.log('price_start:', subserviceData.price_start, 'type:', typeof subserviceData.price_start);
    console.log('rating:', subserviceData.rating, 'type:', typeof subserviceData.rating);
    console.log('reviews_count:', subserviceData.reviews_count, 'type:', typeof subserviceData.reviews_count);
    console.log('displayOrder:', subserviceData.displayOrder, 'type:', typeof subserviceData.displayOrder);
    console.log('=================================');

    // Add image data if uploaded
    if (req.fileData) {
      subserviceData.image = req.fileData;
    }

    // Parse JSON fields if they're strings
    if (typeof req.body.tags === 'string') {
      try {
        subserviceData.tags = JSON.parse(req.body.tags);
      } catch (e) {
        subserviceData.tags = req.body.tags.split(',').map(tag => tag.trim());
      }
    }

    if (typeof req.body.features === 'string') {
      try {
        subserviceData.features = JSON.parse(req.body.features);
      } catch (e) {
        subserviceData.features = [];
      }
    }

    if (typeof req.body.requirements === 'string') {
      try {
        subserviceData.requirements = JSON.parse(req.body.requirements);
      } catch (e) {
        subserviceData.requirements = [];
      }
    }

    // Parse metadata if it's a string
    if (typeof req.body.metadata === 'string') {
      try {
        subserviceData.metadata = JSON.parse(req.body.metadata);
      } catch (e) {
        subserviceData.metadata = {};
      }
    }

    const subservice = new Subservice(subserviceData);
    await subservice.save();

    // Populate category info
    await subservice.populate('categoryId', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Subservice created successfully',
      data: {
        subservice,
      },
    });

  } catch (error) {
    console.error('Create subservice error:', error);
    
    if (req.file) {
      deleteFile(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Update subservice
// @route   PUT /api/subservices/:id
// @access  Private (Admin)
router.put('/:id', [
  authMiddleware,
  requireAdmin,
  param('id').isMongoId().withMessage('Invalid subservice ID'),
  upload.single('image'),
  handleUploadError,
  processUploadedFile,
  body('categoryId')
    .optional()
    .isMongoId()
    .withMessage('Valid category ID is required'),
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Subservice name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  body('shortDescription')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Short description cannot exceed 200 characters'),
  body('price_start')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Starting price must be a positive number'),
  body('priceType')
    .optional()
    .isIn(['fixed', 'starting_from', 'hourly', 'consultation'])
    .withMessage('Invalid price type'),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  body('reviews_count')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Review count must be a positive integer'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be boolean'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be boolean'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a positive integer'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const subservice = await Subservice.findById(req.params.id);

    if (!subservice) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      return res.status(404).json({
        success: false,
        message: 'Subservice not found',
      });
    }

    // Check if new category exists (if provided)
    if (req.body.categoryId && req.body.categoryId !== subservice.categoryId.toString()) {
      const category = await Category.findById(req.body.categoryId);
      if (!category) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        
        return res.status(400).json({
          success: false,
          message: 'Category not found',
        });
      }
    }

    // Update fields
    const updateFields = [
      'categoryId', 'name', 'description', 'shortDescription', 'price_start',
      'priceType', 'rating', 'reviews_count', 'notes', 'isActive', 'isFeatured',
      'displayOrder', 'tags', 'features', 'requirements'
    ];

    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'price_start') {
          subservice[field] = parseFloat(req.body[field]);
        } else if (field === 'tags' && typeof req.body[field] === 'string') {
          try {
            subservice[field] = JSON.parse(req.body[field]);
          } catch (e) {
            subservice[field] = req.body[field].split(',').map(tag => tag.trim());
          }
        } else if ((field === 'features' || field === 'requirements') && typeof req.body[field] === 'string') {
          try {
            subservice[field] = JSON.parse(req.body[field]);
          } catch (e) {
            subservice[field] = [];
          }
        } else {
          subservice[field] = req.body[field];
        }
      }
    });

    // Handle image update
    if (req.fileData) {
      // Delete old image if exists
      if (subservice.image && subservice.image.path) {
        deleteFile(subservice.image.path);
      }
      subservice.image = req.fileData;
    }

    await subservice.save();
    await subservice.populate('categoryId', 'name slug');

    res.json({
      success: true,
      message: 'Subservice updated successfully',
      data: {
        subservice,
      },
    });

  } catch (error) {
    console.error('Update subservice error:', error);
    
    if (req.file) {
      deleteFile(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Delete subservice
// @route   DELETE /api/subservices/:id
// @access  Private (Admin)
router.delete('/:id', [
  authMiddleware,
  requireAdmin,
  param('id').isMongoId().withMessage('Invalid subservice ID'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const subservice = await Subservice.findById(req.params.id);

    if (!subservice) {
      return res.status(404).json({
        success: false,
        message: 'Subservice not found',
      });
    }

    // Delete image file if exists
    if (subservice.image && subservice.image.path) {
      deleteFile(subservice.image.path);
    }

    await Subservice.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Subservice deleted successfully',
    });

  } catch (error) {
    console.error('Delete subservice error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Get featured subservices
// @route   GET /api/subservices/featured
// @access  Public
router.get('/featured', [
  query('limit').optional().isInt({ min: 1, max: 20 }).withMessage('Limit must be between 1 and 20'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { limit = 6 } = req.query;

    const subservices = await Subservice.getFeaturedSubservices(parseInt(limit));

    res.json({
      success: true,
      data: {
        subservices,
      },
    });

  } catch (error) {
    console.error('Get featured subservices error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Search subservices
// @route   GET /api/subservices/search
// @access  Public
router.get('/search', [
  query('q').notEmpty().withMessage('Search query is required'),
  query('categoryId').optional().isMongoId().withMessage('Invalid category ID'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const {
      q,
      categoryId,
      minPrice,
      maxPrice,
      page = 1,
      limit = 20,
    } = req.query;

    const skip = (page - 1) * limit;

    const searchOptions = {
      categoryId,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      limit: parseInt(limit),
      skip,
    };

    const subservices = await Subservice.searchSubservices(q, searchOptions);

    // Get total count for pagination
    const totalQuery = {
      $text: { $search: q },
      isActive: true,
    };

    if (categoryId) totalQuery.categoryId = categoryId;
    if (minPrice !== undefined || maxPrice !== undefined) {
      totalQuery.price_start = {};
      if (minPrice !== undefined) totalQuery.price_start.$gte = parseFloat(minPrice);
      if (maxPrice !== undefined) totalQuery.price_start.$lte = parseFloat(maxPrice);
    }

    const total = await Subservice.countDocuments(totalQuery);

    res.json({
      success: true,
      data: {
        subservices,
        searchQuery: q,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });

  } catch (error) {
    console.error('Search subservices error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
