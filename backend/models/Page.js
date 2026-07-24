const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  styles: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  visibility: {
    type: Boolean,
    default: true
  }
});

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title can not be more than 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Please add a slug'],
    unique: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  seoTitle: String,
  seoDescription: String,
  featuredImage: String,
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  blocks: [blockSchema],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Page', pageSchema);
