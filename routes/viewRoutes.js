const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', viewController.getAllTours);
router.get('/tour/:id', authController.isLoggedIn, viewController.getOneTour);
router.get('/login', authController.isLoggedIn, viewController.login);
router.get('/me', authController.protect, viewController.account);
router.post(
  '/submit-form-data',
  authController.protect,
  viewController.submitData
);

module.exports = router;
