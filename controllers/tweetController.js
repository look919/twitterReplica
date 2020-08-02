const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const Tweet = require('./../models/tweetModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createTweet - factory.createOne(Tweet);
exports.getAllTweets = factory.getAll(Tweet);
exports.getTweet = factory.getOne(Tweet, { path: 'ref' });
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

  const doc = await Tweet.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
