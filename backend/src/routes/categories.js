const express = require('express');
const { body, validationResult, param, query } = require('express-validator');
const Category = require('../models/Category');
const Subservice = require('../models/Subservice');
const { authMiddleware, requireAdmin } = require('../middleware/auth');
const { upload, handleUploadError, processUploadedFile, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @desc    Get all categories (public)
// @route   GET /api/categories
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('sort').optional().isIn(['name', 'createdAt', 'updatedAt', 'displayOrder']).withMessage('Invalid sort field'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc'),
  query('search').optional().isLength({ min: 1 }).withMessage('Search term cannot be empty'),
  query('active').optional().custom((value) => {
    return value === true || value === false || value === 'true' || value === 'false';
  }).withMessage('Active must be boolean'),
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
      active = true,
    } = req.query;

    const skip = (page - 1) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    // Build query
    let query = {};
    
    if (active !== undefined) {
      // Handle both boolean and string values
      query.isActive = active === true || active === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Get categories with stats
    const categories = await Category.find(query)
      .sort({ [sort]: sortOrder })
      .limit(parseInt(limit))
      .skip(skip)
      .lean();

    // Get subservices count for each category
    const categoriesWithStats = await Promise.all(
      categories.map(async (category) => {
        const subservicesCount = await Subservice.countDocuments({ 
          categoryId: category._id, 
          isActive: true 
        });
        
        return {
          ...category,
          subservicesCount,
        };
      })
    );

    // Get total count
    const total = await Category.countDocuments(query);

    res.json({
      success: true,
      data: {
        categories: categoriesWithStats,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid category ID'),
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

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Get subservices count
    const subservicesCount = await Subservice.countDocuments({ 
      categoryId: category._id, 
      isActive: true 
    });

    res.json({
      success: true,
      data: {
        category: {
          ...category.toObject(),
          subservicesCount,
        },
      },
    });

  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private (Admin)
router.post('/', [
  authMiddleware,
  requireAdmin,
  upload.single('image'),
  handleUploadError,
  processUploadedFile,
  body('name')
    .notEmpty()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),
  body('description')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters when provided'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a positive integer'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be boolean'),
], async (req, res) => {
  try {
    console.log('=== CATEGORY CREATION DEBUG ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('FileData:', req.fileData);
    console.log('================================');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      // Delete uploaded file if validation fails
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, description, displayOrder = 0, isActive = true } = req.body;

    const categoryData = {
      name,
      description,
      displayOrder,
      isActive,
    };

    // Add image data if uploaded
    if (req.fileData) {
      categoryData.image = req.fileData;
    }

    const category = new Category(categoryData);
    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: {
        category,
      },
    });

  } catch (error) {
    console.error('Create category error:', error);
    
    // Delete uploaded file if save fails
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category name already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
router.put('/:id', [
  authMiddleware,
  requireAdmin,
  param('id').isMongoId().withMessage('Invalid category ID'),
  upload.single('image'),
  handleUploadError,
  processUploadedFile,
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),
  body('description')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters when provided'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a positive integer'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be boolean'),
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

    const category = await Category.findById(req.params.id);

    if (!category) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const { name, description, displayOrder, isActive } = req.body;

    // Update fields
    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (displayOrder !== undefined) category.displayOrder = displayOrder;
    if (isActive !== undefined) category.isActive = isActive;

    // Handle image update
    if (req.fileData) {
      // Delete old image if exists
      if (category.image && category.image.path) {
        deleteFile(category.image.path);
      }
      category.image = req.fileData;
    }

    await category.save();

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: {
        category,
      },
    });

  } catch (error) {
    console.error('Update category error:', error);
    
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category name already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
router.delete('/:id', [
  authMiddleware,
  requireAdmin,
  param('id').isMongoId().withMessage('Invalid category ID'),
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

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Check if category has subservices
    const subservicesCount = await Subservice.countDocuments({ categoryId: req.params.id });
    
    if (subservicesCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${subservicesCount} subservices. Please delete all subservices first.`,
      });
    }

    // Delete image file if exists
    if (category.image && category.image.path) {
      deleteFile(category.image.path);
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @desc    Get subservices for a category
// @route   GET /api/categories/:id/subservices
// @access  Public
router.get('/:id/subservices', [
  param('id').isMongoId().withMessage('Invalid category ID'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('sort').optional().isIn(['name', 'price_start', 'rating', 'createdAt', 'displayOrder']).withMessage('Invalid sort field'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc'),
  query('active').optional().custom((value) => {
    return value === true || value === false || value === 'true' || value === 'false';
  }).withMessage('Active must be boolean'),
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
      active = true,
    } = req.query;

    // Check if category exists
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const skip = (page - 1) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    const query = { categoryId: req.params.id };
    if (active !== undefined) {
      // Handle both boolean and string values
      query.isActive = active === true || active === 'true';
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
        category: {
          id: category._id,
          name: category.name,
          slug: category.slug,
        },
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
    console.error('Get category subservices error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
