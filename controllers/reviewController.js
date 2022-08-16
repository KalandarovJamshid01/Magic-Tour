const Review = require('../models/reviewModel');

const {
  deleteOne,
  updateOne,
  addOne,
  getOne,
  getAll,
} = require('./handlerController');

const getAllReview = getAll(Review);
const getReviewById = getOne(Review);
const addReview = addOne(Review);
const updateReview = updateOne(Review);
const deleteReview = deleteOne(Review);

const setTourIdAndUserId = (req, res, next) => {
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};

module.exports = {
  getAllReview,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
  setTourIdAndUserId,
};
