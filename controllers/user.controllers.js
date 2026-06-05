const Post = require('../models/Post');
const Follow = require('../models/Follow');

exports.getMyPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const query = {
      author: req.user.id
    };

    if (req.query.state) {
      query.state = req.query.state;
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      page,
      count: posts.length,
      posts
    });
  } catch (err) {
    next(err);
  }
};

exports.getFeed = async (req, res, next) => {
  try {
    const follows = await Follow.find({
      follower: req.user.id
    });

    const followedUsers = follows.map(
      follow => follow.following
    );

    followedUsers.push(req.user.id);

    const posts = await Post.find({
      author: {
        $in: followedUsers
      },
      state: 'published'
    })
      .populate(
        'author',
        'username first_name last_name'
      )
      .sort({
        createdAt: -1
      });

    res.json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (err) {
    next(err);
  }
};