const mongoose = require('mongoose');
const moment = require('moment');

const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'tweet user is required'],
  },
  message: {
    type: String,
    required: [true, 'tweet message is required'],
  },
  imgOrGif: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: moment(),
  },
  retweet: {
    type: Boolean,
    default: false,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  ref: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet',
  },
  actionUserName: String,
  actionUserAt: String,
  comments: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet',
      },
    ],
    default: [],
  },
  retweets: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet',
      },
    ],
    default: [],
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
});

tweetSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-tweets name photo at description following followers',
  });

  next();
});

tweetSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'ref',
  });

  next();
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
