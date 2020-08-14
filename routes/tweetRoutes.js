const express = require('express');
const tweetController = require('./../controllers/tweetController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/:id').get(tweetController.getTweet);

//RESTRICTED TO ADMIN
router.use(authController.protect);
router
  .route('/')
  .get(tweetController.getAllTweets)
  .post(tweetController.uploadImage, tweetController.createTweet);

router.route('/:tweetId').patch(tweetController.deleteTweet);
router.route('/:tweetId/retweet').patch(tweetController.addRetweet);
router.route('/:tweetId/delete-retweet').patch(tweetController.deleteRetweet);
router.route('/:tweetId/like').patch(tweetController.addLikeToTweet);
router
  .route('/:tweetId/delete-like')
  .patch(tweetController.deleteLikeFromTweet);

router.use(authController.restrictTo('admin'));
module.exports = router;
