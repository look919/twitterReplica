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

router.route('/:tweetId').delete(tweetController.deleteTweet);

router.use(authController.restrictTo('admin'));

module.exports = router;
