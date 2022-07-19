const Tour = require('./../models/tourModel');

const catchAsyncError = require('./../utility/catchAsync');
const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require('./handlerController');

const options = {
  path: 'guides',
  select: '-role -_id -passwordChangedDate',
};
const options2 = {
  path: 'reviews',
};

const getAllTours = (req, res, next) => {
  getAll(req, res, next, Tour, options, options2);
};

// Get Tour by Id
const getTourById = (req, res, next) => {
  getOne(req, res, next, Tour, options, options2);
};
// Add Tour
const addTour = (req, res, next) => {
  add(req, res, next, Tour);
};

// Update Tour
const updateTour = (req, res, next) => {
  update(req, res, next, Tour);
};

// Delete Tour
const deleteTour = (req, res, next) => {
  deleteData(req, res, next, Model);
};

const tourStats = catchAsyncError(async (req, res) => {
  const data = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numberTours: { $sum: 1 },
        urtachaNarx: { $avg: '$price' },
        engArzonNarx: { $min: '$price' },
        engQimmatNarx: { $max: '$price' },
        urtachaReyting: { $avg: '$ratingsAverage' },
      },
    },
    { $sort: { urtachaNarx: -1 } },
    { $project: { _id: 0 } },
  ]);
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: data,
  });
});

// Yilni tanlay (2021)
//

const tourReportYear = catchAsyncError(async (req, res) => {
  const data = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${req.params.year}-01-01`),
          $lte: new Date(`${req.params.year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        tourlarSoni: { $sum: 1 },
        tourNomi: { $push: '$name' },
      },
    },
    { $addFields: { qaysiOyligi: '$_id' } },
    { $project: { _id: 0 } },
    { $sort: { tourlarSoni: -1 } },
    { $limit: 2 },
  ]);
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: data,
  });
});

module.exports = {
  getAllTours,
  addTour,
  getTourById,
  updateTour,
  deleteTour,
  tourStats,
  tourReportYear,
};
