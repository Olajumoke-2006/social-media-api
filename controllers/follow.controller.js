const Follow = require('../models/Follow');
const User = require('../models/User');

exports.followUser = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    if (followerId === followingId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow yourself'
      });
    }

    const user = await User.findById(followingId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId
    });

    if (existingFollow) {
      return res.status(400).json({
        success: false,
        message: 'Already following user'
      });
    }

    const follow = await Follow.create({
      follower: followerId,
      following: followingId
    });

    res.status(201).json({
      success: true,
      follow
    });
  } catch (err) {
    next(err);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    const follow = await Follow.findOne({
      follower: req.user.id,
      following: req.params.userId
    });

    if (!follow) {
      return res.status(404).json({
        success: false,
        message: 'Follow relationship not found'
      });
    }

    await follow.deleteOne();

    res.json({
      success: true,
      message: 'User unfollowed'
    });
  } catch (err) {
    next(err);
  }
};

exports.getFollowing = async (req, res, next) => {
  try {
    const following = await Follow.find({
      follower: req.user.id
    }).populate(
      'following',
      'username first_name last_name email'
    );

    res.json({
      success: true,
      count: following.length,
      following
    });
  } catch (err) {
    next(err);
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const followers = await Follow.find({
      following: req.user.id
    }).populate(
      'follower',
      'username first_name last_name email'
    );

    res.json({
      success: true,
      count: followers.length,
      followers
    });
  } catch (err) {
    next(err);
  }
};