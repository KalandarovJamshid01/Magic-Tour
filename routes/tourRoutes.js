const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRouter');

const router = express.Router();

// nested route
router.use('/:tourId/reviews', reviewRouter);

router.use(
  '/the-best-3-tours',
  (req, res, next) => {
    req.query.sort = '-price';
    req.query.limit = 3;
    next();
  },
  tourController.getAllTours
);

router
  .route('/stats')
  .get(
    authController.protect,
    authController.role(['admin']),
    tourController.tourStats
  );
router
  .route('/report/:year')
  .get(
    authController.protect,
    authController.role(['admin']),
    tourController.tourReportYear
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.role(['admin', 'team-lead']),
    tourController.addTour
  );
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(
    authController.protect,
    authController.role(['admin', 'team-lead']),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.role(['admin', 'team-lead']),
    tourController.deleteTour
  );

module.exports = router;
