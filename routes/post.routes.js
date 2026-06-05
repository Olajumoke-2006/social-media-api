const router = require('express').Router();

const auth =
require('../middleware/auth.middleware');

const controller =
require('../controllers/post.controller');

router.get('/', controller.getPosts);
router.get('/:id', controller.getSinglePost);

router.post('/', auth,
controller.createPost);

router.put('/:id', auth,
controller.updatePost);

router.delete('/:id', auth,
controller.deletePost);

router.patch('/:id/publish',
auth,
controller.publishPost);

module.exports = router;