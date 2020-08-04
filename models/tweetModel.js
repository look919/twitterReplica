const mongoose = require('mongoose');

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
    default: Date.now(),
  },
  comments: {
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
  retweet: {
    type: Boolean,
    default: false,
  },
  ref: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet',
  },
});

tweetSchema.pre(/^find/, function (next) {
  if (!this.ref) return next();

  this.populate({
    path: 'ref',
  });

  next();
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
