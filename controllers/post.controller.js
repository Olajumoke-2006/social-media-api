const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      content,
      tags
    } = req.body;

    const post =
      await Post.create({
        title,
        content,
        tags,
        author: req.user.id
      });

    res.status(201).json({
      success: true,
      post
    });
  } catch (err) {
    next(err);
  }
};

exports.publishPost = async (
  req,
  res,
  next
) => {
  try {
    const post =
      await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({
        success: false
      });

    if (
      post.author.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false
      });
    }

    post.state = 'published';

    await post.save();

    res.json({
      success: true,
      post
    });
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (
  req,
  res,
  next
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 20;

    const skip =
      (page - 1) * limit;

    const query = {
      state: 'published'
    };

    if (req.query.search) {
      query.$or = [
        {
          title: {
            $regex: req.query.search,
            $options: 'i'
          }
        },
        {
          tags: {
            $regex: req.query.search,
            $options: 'i'
          }
        }
      ];
    }

    let sort = {
      createdAt: -1
    };

    if (req.query.sort) {
      sort = {
        [req.query.sort]: -1
      };
    }

    const posts =
      await Post.find(query)
        .populate(
          'author',
          'username first_name last_name'
        )
        .sort(sort)
        .skip(skip)
        .limit(limit);

    res.json({
      success: true,
      page,
      posts
    });
  } catch (err) {
    next(err);
  }
};

exports.getSinglePost =
async (req, res, next) => {
  try {
    const post =
      await Post.findOne({
        _id: req.params.id,
        state: 'published'
      }).populate(
        'author',
        'username first_name last_name email'
      );

    if (!post) {
      return res.status(404).json({
        success: false
      });
    }

    res.json({
      success: true,
      post
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePost =
async (req, res, next) => {
  try {
    const post =
      await Post.findById(req.params.id);

    if (
      post.author.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false
      });
    }

    Object.assign(post, req.body);

    await post.save();

    res.json({
      success: true,
      post
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost =
async (req, res, next) => {
  try {
    const post =
      await Post.findById(req.params.id);

    if (
      post.author.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Deleted'
    });
  } catch (err) {
    next(err);
  }
};