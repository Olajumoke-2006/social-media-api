const Like = require('../models/Like')
const Post = require('../models/Post')

exports.likePost = async (req, res) => {

  try {

    const user = req.user.id
    const post = req.params.id

    const existingLike = await Like.findOne({
      user,
      post
    })

    if (existingLike) {
      return res.status(400).json({
        message: 'Post already liked'
      })
    }

    await Like.create({
      user,
      post
    })

    await Post.findByIdAndUpdate(post, {
      $inc: { like_count: 1 }
    })

    res.status(201).json({
      message: 'Post liked successfully'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

exports.unlikePost = async (req, res) => {

  try {

    const user = req.user.id
    const post = req.params.id

    const existingLike = await Like.findOne({
      user,
      post
    })

    if (!existingLike) {
      return res.status(400).json({
        message: 'Post not liked'
      })
    }

    await Like.findOneAndDelete({
      user,
      post
    })

    await Post.findByIdAndUpdate(post, {
      $inc: { like_count: -1 }
    })

    res.status(200).json({
      message: 'Post unliked successfully'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}