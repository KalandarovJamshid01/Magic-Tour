const express = require('express');

const router = express.Router({ mergeParams: true });
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.role(['user']),
    reviewController.setTourIdAndUserId,
    reviewController.addReview
  );

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(authController.role(['user', 'admin']), reviewController.updateReview)
  .delete(
    authController.role(['user', 'admin']),
    reviewController.deleteReview
  );

module.exports = router;
