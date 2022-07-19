const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRoutes = require('./../routes/reviewRouter');

const router = express.Router();

router.use(
  '/the-best-3-tours',
  (req, res, next) => {
    req.query.sort = '-price';
    req.query.limit = 3;
    next();
  },
  tourController.getAllTours
);

router.route('/stats').get(tourController.tourStats);
router.route('/report/:year').get(tourController.tourReportYear);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(authController.protect, tourController.addTour);

router.use('/:id/reviews', reviewRoutes);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
