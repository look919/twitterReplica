const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const tweetController = require('./../controllers/tweetController');

const router = express.Router();

router.get('/auth', authController.isLoggedIn);
router.route('/:userAt').get(userController.getProfile);
router.route('/').get(userController.getAllUsers);

router.post('/signup', authController.signup);
router.patch('/activate', authController.activate);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

//USERS AUTHENTICATED
router.use(authController.protect);
router.patch('/follow', userController.followUser);
router.patch('/unfollow', userController.unFollowUser);

router.use(authController.restrictTo('admin', 'user'));
router.patch(
  '/updateMe',
  tweetController.uploadUserPhotos,
  userController.updateMe
);
router.patch('/updatepassword', authController.updatePassword);

//RESTRICTED TO ADMIN
router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
