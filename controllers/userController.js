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

exports.updateMe = catchAsync(async (req, res, next) => {
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
    'tweet',
    'likes',
    'following',
    'followers'
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

const updateModelOptions = {
  new: true,
  runValidators: true,
};

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
