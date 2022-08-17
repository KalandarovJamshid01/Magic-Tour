const AppError = require('../utility/appError');
const catchAsyncError = require('./../utility/catchErrorAsync');
const FeatureAPI = require('../utility/featureApi');

const deleteOne = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('Document was not found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'This document has been deleted',
    });
  });
};

const updateOne = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('Document was not found with that ID', 404));
    }
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });
};

const addOne = (Model) => {
  return catchAsyncError(async (req, res) => {
    const data = req.body;
    const doc = await Model.create(data);
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
};

const getOne = (Model, populatePath) => {
  return catchAsyncError(async (req, res, next) => {
    let doc;
    if (populatePath) {
      doc = await Model.findById(req.params.id).populate(populatePath);
    } else {
      doc = await Model.findById(req.params.id);
    }

    if (!doc) {
      return next(new AppError('Document not found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
};

const getAll = (Model) => {
  return catchAsyncError(async (req, res) => {
    let filter = {};
    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    }

    const query = new FeatureAPI(req.query, Model)
      .filter()
      .sorting()
      .field()
      .pagination();

    const doc = query.databaseQuery;

    // Indexes
    // const data = await doc.find(filter).explain();

    const data = await doc.find(filter);
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: data,
    });
  });
};

module.exports = { deleteOne, updateOne, addOne, getOne, getAll };
