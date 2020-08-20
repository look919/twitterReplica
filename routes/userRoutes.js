const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/auth', authController.isLoggedIn);

router.post('/signup', authController.signup);
router.patch('/activate', authController.activate);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.route('/:userAt').get(userController.getProfile);

//USERS AUTHENTICATED
router.use(authController.protect);
router.patch('/updatepassword', authController.updatePassword);
router.patch('/follow', userController.followUser);
router.patch('/unfollow', userController.unFollowUser);

//RESTRICTED TO ADMIN
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
