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

router.use(authController.restrictTo('admin'));
router.route('/:id').delete(tweetController.deleteTweet);

module.exports = router;
