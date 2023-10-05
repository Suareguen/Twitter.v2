const Post = require("../models/posts.model.js");
const User = require('../models/users.model.js')


const getAllTweets = async (req, res) => {
  try {
    const tweets = await Post.findAll();
    return res.status(200).json({ tweets });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const getOneTweet = async (req, res) => {
  try {
    const tweet = await Post.findByPk(req.params.tweetId);
    if (tweet) {
      return res.status(200).json({ tweet });
    } else {
      return res.status(404).send("Tweet not found");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTweet = async (req, res) => {
  try {
    const tweet = await Post.create(req.body);
    const user = await User.findOne({
      where: {
        id: res.locals.user.id
      }
    })
    
    await user.addTweet(tweet);

    return res.status(200).json({ tweet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTweet = async (req, res) => {
  try {
    const tweet = await Post.update(req.body, {
      where: {
        id: req.params.tweetId,
      },
    });
    return res.status(200).json({ message: "Tweet Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweet = await Post.destroy({
      where: { id: req.params.tweetId },
    });
    if (tweet) {
      return res.status(200).json({ message: "Tweet deleted" });
    } else {
      return res.status(404).json({ message: "Tweet not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTweets,
  getOneTweet,
  createTweet,
  updateTweet,
  deleteTweet,
};
