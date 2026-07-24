const Page = require('../models/Page');

// @desc    Get all pages (Admin)
// @route   GET /api/v1/pages
// @access  Private
exports.getPages = async (req, res, next) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: pages.length,
      data: pages
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single page by ID
// @route   GET /api/v1/pages/:id
// @access  Private
exports.getPage = async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    res.status(200).json({
      success: true,
      data: page
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single page by slug (Public)
// @route   GET /api/v1/pages/slug/:slug
// @access  Public
exports.getPageBySlug = async (req, res, next) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, status: 'published' });
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found or not published' });
    }
    res.status(200).json({
      success: true,
      data: page
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new page
// @route   POST /api/v1/pages
// @access  Private
exports.createPage = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;
    
    // Ensure slug is unique
    const existingPage = await Page.findOne({ slug: req.body.slug });
    if (existingPage) {
      return res.status(400).json({ success: false, message: 'Slug already exists' });
    }

    const page = await Page.create(req.body);
    res.status(201).json({
      success: true,
      data: page
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update page
// @route   PUT /api/v1/pages/:id
// @access  Private
exports.updatePage = async (req, res, next) => {
  try {
    let page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }

    req.body.updatedBy = req.user.id;

    page = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: page
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete page
// @route   DELETE /api/v1/pages/:id
// @access  Private
exports.deletePage = async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }

    await page.deleteOne();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
