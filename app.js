const path = require('path');
const express = require('express');
const morgan = require('morgan');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const tweetRouter = require('./routes/tweetRoutes');

const app = express();

app.enable('trust proxy');

//CORS
app.use(cors());
app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  //redirect to https
  // app.use(function (req, res, next) {
  //   if (req.secure) {
  //     next();
  //   } else {
  //     res.redirect('https://' + req.headers.host + req.url); // request was via http, so redirect to https
  //   }
  // });
}

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    //whitelist: ['size', 'price']
  })
);
app.use(compression());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tweets', tweetRouter);

app.use(globalErrorHandler);

module.exports = app;
