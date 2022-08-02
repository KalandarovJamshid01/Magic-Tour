const AppError = require('./../utility/appError');
const catchErrorAsync = require('./../utility/catchAsync');
const Tour = require('./../models/tourModel');
const Review = require('./../models/reviewModel');
const getAllTour = async (req, res, next) => {
  try {
    const datas = await Tour.find();
    console.log(datas);
    res.status(200).render('overview', {
      tours: datas,
    });
  } catch (error) {
    res.status(200).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const getOneTour = async (req, res, next) => {
  try {
    const data = await Tour.findById(req.params.id)
      .populate('guides')
      .populate('reviews');
    const reviews = await Review.find({ tour: req.params.id }).populate('user');
    console.log(reviews);
    res.status(200).render('tour', {
      tour: data,
      reviews: reviews,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    res.status(200).render('login');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllTour, getOneTour, login };
