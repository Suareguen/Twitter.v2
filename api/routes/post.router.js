const router = require("express").Router();
const {
  getAllTweets,
  getOneTweet,
  createTweet,
  updateTweet,
  deleteTweet,
} = require("../controllers/post.controller.js");


router.get("/", getAllTweets);
router.get("/:tweetId", getOneTweet);

router.post("/", createTweet);

router.put("/:tweetId", updateTweet);

router.delete("/:tweetId", deleteTweet);


module.exports = router;
