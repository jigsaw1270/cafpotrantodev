const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Category name cannot exceed 100 characters'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  image: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String,
    url: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
  metadata: {
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
  },
  subservicesCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes - only for fields that don't have unique: true
categorySchema.index({ isActive: 1 });
categorySchema.index({ displayOrder: 1 });

// Virtual for subservices
categorySchema.virtual('subservices', {
  ref: 'Subservice',
  localField: '_id',
  foreignField: 'categoryId',
});

// Pre-save middleware to generate slug
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim('-'); // Remove leading/trailing hyphens
  }
  next();
});

// Static method to get active categories
categorySchema.statics.getActiveCategories = function() {
  return this.find({ isActive: true }).sort({ displayOrder: 1, name: 1 });
};

// Static method to get category with subservices count
categorySchema.statics.getCategoriesWithStats = function() {
  return this.aggregate([
    { $match: { isActive: true } },
    {
      $lookup: {
        from: 'subservices',
        localField: '_id',
        foreignField: 'categoryId',
        as: 'subservices'
      }
    },
    {
      $addFields: {
        subservicesCount: { $size: '$subservices' },
        activeSubservicesCount: {
          $size: {
            $filter: {
              input: '$subservices',
              cond: { $eq: ['$$this.isActive', true] }
            }
          }
        }
      }
    },
    {
      $project: {
        subservices: 0 // Remove the subservices array from output
      }
    },
    { $sort: { displayOrder: 1, name: 1 } }
  ]);
};

// Instance method to update subservices count
categorySchema.methods.updateSubservicesCount = async function() {
  const Subservice = mongoose.model('Subservice');
  const count = await Subservice.countDocuments({ 
    categoryId: this._id, 
    isActive: true 
  });
  
  this.subservicesCount = count;
  return this.save();
};

// Instance method to generate SEO metadata
categorySchema.methods.generateSEOMetadata = function() {
  if (!this.metadata.seoTitle) {
    this.metadata.seoTitle = `${this.name} - CafPotranto Legal Services`;
  }
  
  if (!this.metadata.seoDescription) {
    this.metadata.seoDescription = this.description.substring(0, 160);
  }
  
  return this.save();
};

module.exports = mongoose.model('Category', categorySchema);
