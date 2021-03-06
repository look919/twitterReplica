const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const randomize = require('randomatic');
const validator = require('validator');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'login is required'],
    unique: [true, 'login already taken'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: [true, 'name already taken'],
  },
  at: {
    type: String,
    unique: [true, '@ already taken'],
  },
  photo: {
    type: String,
    default:
      'https://twitterreplica.s3.eu-central-1.amazonaws.com/default_profile.png',
  },
  backgroundImage: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'test'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'password confirm is required'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
    select: false,
  },
  description: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: moment(),
  },
  city: String,
  link: String,
  following: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  followers: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  tweets: {
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
        ref: 'Tweet',
      },
    ],
    default: [],
  },
  activationCode: {
    type: String,
    default: randomize('0', 4),
  },
  activated: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  // Runs only when create @
  if (this.at) return next();

  (this.at = `@${this.name.toLowerCase().replace(/ /g, '')}`), next();
});
userSchema.pre('save', async function (next) {
  // Runs only when password gets modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'tweets',
  });

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
