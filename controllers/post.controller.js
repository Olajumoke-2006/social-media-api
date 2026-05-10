const Post = require('../models/Post')

exports.createPost = async (req, res) => {

  try {

    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      author: req.user.id
    })

    res.status(201).json(post)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}