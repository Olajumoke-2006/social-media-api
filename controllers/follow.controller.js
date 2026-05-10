const Follow = require('../models/Follow')
const User = require('../models/User')

exports.followUser = async (req, res) => {

  try {

    const follower = req.user.id
    const following = req.params.id

    if (follower === following) {
      return res.status(400).json({
        message: 'You cannot follow yourself'
      })
    }

    const userExists = await User.findById(following)

    if (!userExists) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const alreadyFollowing = await Follow.findOne({
      follower,
      following
    })

    if (alreadyFollowing) {
      return res.status(400).json({
        message: 'Already following user'
      })
    }

    await Follow.create({
      follower,
      following
    })

    res.status(201).json({
      message: 'User followed successfully'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

exports.unfollowUser = async (req, res) => {

  try {

    const follower = req.user.id
    const following = req.params.id

    await Follow.findOneAndDelete({
      follower,
      following
    })

    res.status(200).json({
      message: 'User unfollowed successfully'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

exports.getFollowers = async (req, res) => {

  try {

    const followers = await Follow.find({
      following: req.params.id
    }).populate(
      'follower',
      'username first_name last_name'
    )

    res.status(200).json(followers)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

exports.getFollowing = async (req, res) => {

  try {

    const following = await Follow.find({
      follower: req.params.id
    }).populate(
      'following',
      'username first_name last_name'
    )

    res.status(200).json(following)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}