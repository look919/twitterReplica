const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const Tweet = require('./../models/tweetModel');
const User = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTweet - factory.createOne(Tweet);
exports.getAllTweets = factory.getAll(Tweet);
exports.getTweet = factory.getOne(Tweet, { path: 'user' });

//const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});
const s3 = new aws.S3();

upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'twitterreplica',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: `user-${req.user.id}-${Date.now()}.jpeg` });
    },
    key: function (req, file, cb) {
      cb(null, `user-${req.user.id}-${Date.now()}.jpeg`);
    },
  }),
  fileFilter: multerFilter,
});

exports.uploadImage = upload.single('photo');

const updateModelOptions = {
  new: true,
  runValidators: true,
};

exports.createTweet = catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.location;

  if (req.user.id !== req.body.user) {
    return next(new AppError('There was an error with verification user', 404));
  }

  const doc = await Tweet.create(req.body);
  if (req.body.ref) {
    const updateRefferedTweet = await Tweet.findById(req.body.ref);
    await Tweet.findByIdAndUpdate(
      req.body.ref,
      { comments: [...updateRefferedTweet.comments, doc._id] },
      updateModelOptions
    );
  }
  const updateUserTweets = await User.findByIdAndUpdate(
    req.user.id,
    { tweets: [...req.user.tweets, doc.id] },
    updateModelOptions
  );

  if (!updateUserTweets) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteTweet = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.body.user) {
    return next(new AppError('There was an error with verification user', 404));
  }

  const doc = await Tweet.findByIdAndDelete(req.params.tweetId);

  const userTweetsAfterDelete = req.user.tweets.filter(
    (tweet) => tweet.id !== req.params.tweetId
  );

  const updateUserTweets = await User.findByIdAndUpdate(
    req.user.id,
    { tweets: userTweetsAfterDelete },
    updateModelOptions
  );

  if (
    !updateUserTweets ||
    userTweetsAfterDelete.length === req.user.tweets.length
  ) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updateUserTweets.tweets,
      doc,
    },
  });
});

exports.addLikeToTweet = catchAsync(async (req, res, next) => {
  const updateTweetLikes = await Tweet.findByIdAndUpdate(
    req.body.tweet._id,
    { likes: [...req.body.tweet.likes, req.user._id] },
    updateModelOptions
  );
  if (!updateTweetLikes) {
    return next(new AppError('No document found with that ID', 404));
  }

  const updateUserTweetLikes = await User.findByIdAndUpdate(
    req.user.id,
    { likes: [...req.user.likes, updateTweetLikes._id] },
    updateModelOptions
  );

  if (!updateUserTweetLikes) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updateTweetLikes,
    },
  });
});

exports.deleteLikeFromTweet = catchAsync(async (req, res, next) => {
  const updateTweetLikes = await Tweet.findByIdAndUpdate(
    req.body.tweet._id,
    { likes: req.body.tweet.likes.filter((like) => like !== req.user._id) },
    updateModelOptions
  );
  if (!updateTweetLikes) {
    return next(new AppError('No document found with that ID', 404));
  }

  const updateUserTweetLikes = await User.findByIdAndUpdate(
    req.user.id,
    { likes: req.user.likes.filter((like) => like !== req.body.tweet._id) },
    updateModelOptions
  );

  if (!updateUserTweetLikes) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updateTweetLikes,
    },
  });
});
