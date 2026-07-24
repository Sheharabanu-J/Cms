const express = require('express');
const {
  getPages,
  getPage,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage
} = require('../controllers/pageController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route to fetch a page by its slug for the public-frontend
router.get('/slug/:slug', getPageBySlug);

// Protected admin routes
router.route('/')
  .get(protect, getPages)
  .post(protect, createPage);

router.route('/:id')
  .get(protect, getPage)
  .put(protect, updatePage)
  .delete(protect, deletePage);

module.exports = router;
