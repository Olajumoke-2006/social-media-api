const Like = require('../models/Like');
const Post = require('../models/Post');

exports.likePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const existingLike = await Like.findOne({
      user: req.user.id,
      post: postId
    });

    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: 'Post already liked'
      });
    }

    await Like.create({
      user: req.user.id,
      post: postId
    });

    post.like_count += 1;

    await post.save();

    res.json({
      success: true,
      likes: post.like_count
    });
  } catch (err) {
    next(err);
  }
};

exports.unlikePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const like = await Like.findOne({
      user: req.user.id,
      post: postId
    });

    if (!like) {
      return res.status(404).json({
        success: false,
        message: 'Like not found'
      });
    }

    await like.deleteOne();

    const post = await Post.findById(postId);

    if (post && post.like_count > 0) {
      post.like_count -= 1;
      await post.save();
    }

    res.json({
      success: true,
      likes: post.like_count
    });
  } catch (err) {
    next(err);
  }
};