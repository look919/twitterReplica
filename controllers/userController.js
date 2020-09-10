const User = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, { path: 'room' });
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};
const updateModelOptions = {
  new: true,
  runValidators: true,
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.files) {
    if (req.files.photo) req.body.photo = req.files.photo[0].location;
    if (req.files.backgroundImage)
      req.body.backgroundImage = req.files.backgroundImage[0].location;
  }

  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'name',
    'at',
    'photo',
    'backgroundImage',
    'description',
    'link',
    'city'
  );

  // 3) Update user document
  const updatedUser = await User.findOneAndUpdate(
    { at: req.user.at },
    filteredBody,
    updateModelOptions
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.followUser = catchAsync(async (req, res, next) => {
  const updateUserFollowingUsers = await User.findByIdAndUpdate(
    req.user._id,
    { following: [...req.user.following, req.body.user._id] },
    updateModelOptions
  );

  if (!updateUserFollowingUsers) {
    return next(new AppError('No document found with that ID', 404));
  }

  const updateAnotherUserFollowers = await User.findById(req.body.user._id);

  if (!updateAnotherUserFollowers) {
    return next(new AppError('No document found with that ID', 404));
  }
  updateAnotherUserFollowers.followers = [
    ...updateAnotherUserFollowers.followers,
    req.user._id,
  ];
  updateAnotherUserFollowers.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: updateUserFollowingUsers,
    },
  });
});
exports.unFollowUser = catchAsync(async (req, res, next) => {
  const updateFollowingUsers = await User.findByIdAndUpdate(
    req.user._id,
    {
      //_id is an object so i need to replace it to string for that purpose
      following: req.user.following.filter(
        (id) => JSON.stringify(id) !== JSON.stringify(req.body.user._id)
      ),
    },
    updateModelOptions
  );

  if (!updateFollowingUsers) {
    return next(new AppError('No document found with that ID', 404));
  }

  const updateAnotherUserFollowers = await User.findById(req.body.user._id);
  if (!updateAnotherUserFollowers) {
    return next(new AppError('No document found with that ID', 404));
  }

  updateAnotherUserFollowers.followers = updateAnotherUserFollowers.followers.filter(
    (id) => JSON.stringify(id) !== JSON.stringify(req.user._id)
  );
  await updateAnotherUserFollowers.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: updateFollowingUsers,
    },
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ at: req.params.userAt.toLowerCase() })
    .populate('tweets')
    .populate('likes')
    .populate('retweets');

  if (user) {
    //organising data

    //setting up retweets
    user.retweets.forEach((retweet) => {
      retweet.retweet = true;
      retweet.actionUserName = user.name;
      retweet.actionUserAt = user.at;
    });
    //setting up likes
    user.likes.forEach((like) => {
      like.liked = true;
      like.actionUserName = user.name;
      like.actionUserNameAt = user.at;
    });

    user.tweets = [...user.tweets, ...user.retweets, ...user.likes];
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});
