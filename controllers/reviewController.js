const Review = require('./../models/reviewModel');
const appError = require('./../utility/appError');
const catchError = require('./../utility/catchAsync');

const getAllReview = catchError(async (req, res, next) => {
  let reviews;
  if (!req.params.id) {
    reviews = await Review.find()
      .populate({
        path: 'user',
        select: 'name',
      })
      .populate({
        path: 'tour',
        select: 'name',
      });
  } else {
    reviews = await Review.find({ tour: req.params.id });
  }
  res.status(200).json({
    status: 'success',
    data: reviews,
  });
});

const addReview = catchError(async (req, res, next) => {
  let reviews;

  if (!req.params.id) {
    reviews = await Review.create(req.body);
  } else {
    const tourId = req.params.id;
    reviews = await Review.create({
      review: req.body.review,
      rating: req.body.rating,
      tour: tourId,
      user: req.body.user,
    });
  }
  res.status(200).json({
    statsu: 'success',
    data: reviews,
  });
});

module.exports = { addReview, getAllReview };
