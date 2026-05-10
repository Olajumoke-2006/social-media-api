const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')

const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require('../controllers/follow.controller')

router.post('/:id/follow', auth, followUser)

router.delete('/:id/unfollow', auth, unfollowUser)

router.get('/:id/followers', auth, getFollowers)

router.get('/:id/following', auth, getFollowing)

module.exports = router