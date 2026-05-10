const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')

const {
  createPost
} = require('../controllers/post.controller')

router.post('/', auth, createPost)

module.exports = router