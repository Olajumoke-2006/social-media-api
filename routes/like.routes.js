const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')

const {
  likePost,
  unlikePost
} = require('../controllers/like.controller')

router.post('/:id/like', auth, likePost)

router.delete('/:id/unlike', auth, unlikePost)

module.exports = router