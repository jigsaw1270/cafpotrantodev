const mongoose = require('mongoose');

const subserviceSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category ID is required'],
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Subservice name is required'],
    trim: true,
    maxlength: [100, 'Subservice name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Subservice description is required'],
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters'],
  },
  price_start: {
    type: Number,
    required: [true, 'Starting price is required'],
    min: [0, 'Price cannot be negative'],
  },
  priceType: {
    type: String,
    enum: ['fixed', 'starting_from', 'hourly', 'consultation'],
    default: 'starting_from',
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0,
  },
  reviews_count: {
    type: Number,
    min: [0, 'Review count cannot be negative'],
    default: 0,
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
  },
  slug: {
    type: String,
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
  isFeatured: {
    type: Boolean,
    default: false,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  features: [{
    name: String,
    description: String,
    isIncluded: {
      type: Boolean,
      default: true,
    },
  }],
  requirements: [{
    name: String,
    description: String,
    isRequired: {
      type: Boolean,
      default: true,
    },
  }],
  estimatedDuration: {
    value: Number,
    unit: {
      type: String,
      enum: ['hours', 'days', 'weeks', 'months'],
      default: 'days',
    },
  },
  metadata: {
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
  },
  stats: {
    views: {
      type: Number,
      default: 0,
    },
    inquiries: {
      type: Number,
      default: 0,
    },
    bookings: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    getters: true,
  },
  toObject: { 
    virtuals: true,
    getters: true,
  },
});

// Compound indexes
subserviceSchema.index({ categoryId: 1, isActive: 1 });
subserviceSchema.index({ categoryId: 1, displayOrder: 1 });
subserviceSchema.index({ name: 1, categoryId: 1 });
subserviceSchema.index({ slug: 1, categoryId: 1 });
subserviceSchema.index({ isFeatured: 1, isActive: 1 });
subserviceSchema.index({ rating: -1, reviews_count: -1 });
subserviceSchema.index({ price_start: 1 });

// Text search index
subserviceSchema.index({
  name: 'text',
  description: 'text',
  shortDescription: 'text',
  tags: 'text',
});

// Virtual for category
subserviceSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

// Virtual for formatted price
subserviceSchema.virtual('formattedPrice').get(function() {
  const price = this.price_start;
  const formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  
  switch (this.priceType) {
    case 'fixed':
      return formatter.format(price);
    case 'starting_from':
      return `From ${formatter.format(price)}`;
    case 'hourly':
      return `${formatter.format(price)}/hour`;
    case 'consultation':
      return 'Consultation required';
    default:
      return formatter.format(price);
  }
});

// Virtual for average rating display
subserviceSchema.virtual('ratingDisplay').get(function() {
  if (this.reviews_count === 0) return 'No reviews';
  return `${this.rating}/5 (${this.reviews_count} reviews)`;
});

// Pre-save middleware to generate slug
subserviceSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim('-'); // Remove leading/trailing hyphens
  }
  
  // Generate short description if not provided
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.substring(0, 150) + '...';
  }
  
  next();
});

// Post-save middleware to update category subservices count
subserviceSchema.post('save', async function() {
  const Category = mongoose.model('Category');
  const category = await Category.findById(this.categoryId);
  if (category) {
    await category.updateSubservicesCount();
  }
});

// Post-remove middleware to update category subservices count
subserviceSchema.post('remove', async function() {
  const Category = mongoose.model('Category');
  const category = await Category.findById(this.categoryId);
  if (category) {
    await category.updateSubservicesCount();
  }
});

// Static method to get subservices by category
subserviceSchema.statics.getByCategoryId = function(categoryId, options = {}) {
  const {
    isActive = true,
    limit = 10,
    skip = 0,
    sort = { displayOrder: 1, name: 1 },
    populate = false,
  } = options;
  
  let query = this.find({ categoryId, isActive }).limit(limit).skip(skip).sort(sort);
  
  if (populate) {
    query = query.populate('categoryId', 'name slug');
  }
  
  return query;
};

// Static method to get featured subservices
subserviceSchema.statics.getFeaturedSubservices = function(limit = 6) {
  return this.find({ isFeatured: true, isActive: true })
    .populate('categoryId', 'name slug')
    .sort({ rating: -1, reviews_count: -1 })
    .limit(limit);
};

// Static method to search subservices
subserviceSchema.statics.searchSubservices = function(searchTerm, options = {}) {
  const {
    categoryId,
    minPrice,
    maxPrice,
    limit = 20,
    skip = 0,
  } = options;
  
  const query = {
    $text: { $search: searchTerm },
    isActive: true,
  };
  
  if (categoryId) {
    query.categoryId = categoryId;
  }
  
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price_start = {};
    if (minPrice !== undefined) query.price_start.$gte = minPrice;
    if (maxPrice !== undefined) query.price_start.$lte = maxPrice;
  }
  
  return this.find(query, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .populate('categoryId', 'name slug')
    .limit(limit)
    .skip(skip);
};

// Instance method to increment view count
subserviceSchema.methods.incrementViews = function() {
  this.stats.views += 1;
  return this.save();
};

// Instance method to increment inquiry count
subserviceSchema.methods.incrementInquiries = function() {
  this.stats.inquiries += 1;
  return this.save();
};

// Instance method to update rating
subserviceSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating * this.reviews_count) + newRating;
  this.reviews_count += 1;
  this.rating = totalRating / this.reviews_count;
  return this.save();
};

module.exports = mongoose.model('Subservice', subserviceSchema);
