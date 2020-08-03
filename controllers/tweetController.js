const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const Tweet = require('./../models/tweetModel');
const User = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createTweet - factory.createOne(Tweet);
exports.getAllTweets = factory.getAll(Tweet);
exports.getTweet = factory.getOne(Tweet, { path: 'user' });
exports.deleteTweet = factory.deleteOne(Tweet);

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

exports.createTweet = catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.location;
  if (req.user.id !== req.body.user) {
    return next(new AppError('There was an error with verification user', 404));
  }

  const doc = await Tweet.create(req.body);
  const updateUserTweets = await User.findByIdAndUpdate(
    req.user.id,
    { tweets: [...req.user.tweets, doc.id] },
    {
      new: true,
      runValidators: true,
    }
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
