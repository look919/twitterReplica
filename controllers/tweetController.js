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
exports.updateTweet = factory.updateOne(Tweet);

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

exports.getTweets = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate('likes')
    .populate('retweets')
    .populate({
      path: 'following',
      select:
        'name at photo tweets likes retweets following followers description town link city',
      populate: 'likes retweets',
    });

  user.tweets = user.tweets.slice(Math.max(user.tweets.length - 10, 0));

  const followedPeople = user.following.map((followedPerson) => {
    followedPerson.tweets = followedPerson.tweets.slice(
      Math.max(followedPerson.tweets.length - 10, 0)
    );
    followedPerson.likes = followedPerson.likes.slice(
      Math.max(followedPerson.likes.length - 3, 0)
    );

    followedPerson.retweets = followedPerson.retweets.slice(
      Math.max(followedPerson.retweets.length - 3, 0)
    );

    //organising data
    //removing comments to another tweets
    followedPerson.tweets = followedPerson.tweets.filter((tweet) => {
      return !tweet.ref;
    });
    //setting up retweets
    followedPerson.retweets.forEach((retweet) => {
      retweet.retweet = true;
      retweet.actionUserName = followedPerson.name;
      retweet.actionUserAt = followedPerson.at;
    });
    //setting up likes
    followedPerson.likes.forEach((like) => {
      like.liked = true;
      like.actionUserName = followedPerson.name;
      like.actionUserNameAt = followedPerson.at;
    });

    return [
      ...followedPerson.tweets,
      ...followedPerson.retweets,
      ...followedPerson.likes,
    ];
  });

  const followedPeopleAndMe = [...user.tweets].concat(...followedPeople);

  res.status(201).json({
    status: 'success',
    data: {
      data: followedPeopleAndMe,
    },
  });
});

exports.createTweet = catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.location;

  if (req.user.id !== req.body.user) {
    return next(new AppError('There was an error with verification user', 404));
  }

  const doc = await Tweet.create(req.body);

  doc.user = req.user;

  // 1) if its a comment to another tweet
  if (req.body.ref && !req.body.retweet) {
    const updateRefferedTweet = await Tweet.findById(req.body.ref);
    updateRefferedTweet.comments = [...updateRefferedTweet.comments, doc._id];
    updateRefferedTweet.save();
  } else if (req.body.ref && req.body.retweet) {
    // 2) if its actual retweet
    const updateRefferedTweet = await Tweet.findById(req.body.ref);
    updateRefferedTweet.retweets = [
      ...updateRefferedTweet.retweets,
      req.user._id,
    ];
    updateRefferedTweet.save();
  }

  //update user
  const updateUserTweets = await User.findByIdAndUpdate(
    req.user._id,
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

  const updateUserTweets = await User.findByIdAndUpdate(
    req.user.id,
    {
      tweets: req.user.tweets.filter(
        (tweet) => tweet.id !== req.params.tweetId
      ),
    },
    updateModelOptions
  );

  if (!updateUserTweets) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.addRetweet = catchAsync(async (req, res, next) => {
  const updateTweetRetweets = await Tweet.findById(req.body.tweet._id);
  if (!updateTweetRetweets) {
    return next(new AppError('No document found with that ID', 404));
  }
  updateTweetRetweets.retweets = [
    ...updateTweetRetweets.retweets,
    req.user._id,
  ];

  const updateUserTweetRetweets = await User.findByIdAndUpdate(
    req.user.id,
    { retweets: [...req.user.retweets, updateTweetRetweets._id] },
    updateModelOptions
  );
  if (!updateUserTweetRetweets) {
    return next(new AppError('No document found with that ID', 404));
  }

  await updateTweetRetweets.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: updateTweetRetweets,
    },
  });
});

exports.deleteRetweet = catchAsync(async (req, res, next) => {
  const updateTweetRetweets = await Tweet.findById(req.body.tweet._id);
  if (!updateTweetRetweets) {
    return next(new AppError('No document found with that ID', 404));
  }
  console.log(updateTweetRetweets.retweets[0], req.user.id);
  updateTweetRetweets.retweets = updateTweetRetweets.retweets.filter(
    (id) => JSON.stringify(id) !== JSON.stringify(req.user._id)
  );

  const updateUserTweetRetweets = await User.findByIdAndUpdate(
    req.user.id,
    {
      retweets: req.user.retweets.filter(
        (tweet) => tweet !== req.body.tweet._id
      ),
    },
    updateModelOptions
  );
  if (!updateUserTweetRetweets) {
    return next(new AppError('No document found with that ID', 404));
  }

  await updateTweetRetweets.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: updateTweetRetweets,
    },
  });
});

exports.addLikeToTweet = catchAsync(async (req, res, next) => {
  const updateTweetLikes = await Tweet.findById(req.body.tweet._id);
  updateTweetLikes.likes = [...updateTweetLikes.likes, req.user._id];
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

  await updateTweetLikes.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: updateTweetLikes,
    },
  });
});

exports.deleteLikeFromTweet = catchAsync(async (req, res, next) => {
  const updateTweetLikes = await Tweet.findById(req.body.tweet._id);
  if (!updateTweetLikes) {
    return next(new AppError('No document found with that ID', 404));
  }
  updateTweetLikes.likes = updateTweetLikes.likes.filter(
    (id) => JSON.stringify(id) !== JSON.stringify(req.user._id)
  );

  const updateUserTweetLikes = await User.findByIdAndUpdate(
    req.user.id,
    { likes: req.user.likes.filter((like) => like !== req.body.tweet._id) },
    updateModelOptions
  );
  if (!updateUserTweetLikes) {
    return next(new AppError('No document found with that ID', 404));
  }

  await updateTweetLikes.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: updateTweetLikes,
    },
  });
});
