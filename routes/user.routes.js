const router = require('express').Router();

const auth =
require('../middleware/auth.middleware');

const {
  getMyPosts,
  getFeed
} = require('../controllers/user.controller');

router.get(
  '/me/posts',
  auth,
  getMyPosts
);

router.get(
  '/feed',
  auth,
  getFeed
);

module.exports = router;