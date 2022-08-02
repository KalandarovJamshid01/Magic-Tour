const Lang = require('./../models/langModel');
const AppError = require('./../utility/appError');
const catchError = require('./../utility/catchErrorAsync');

const getAllLanguages = catchError(async (req, res, next) => {
  const datas = await Lang.find();
  res.status(200).json({
    result: datas.length,
    status: 'succes',
    data: datas,
  });
});

const getOneLanguage = catchError(async (req, res, next) => {
  const data = await Lang.findById(req.params.id);
  res.status(200).json({
    status: 'Succes',
    data: data,
  });
});

const addLanguage = catchError(async (req, res, next) => {
  const data = await Lang.create(req.body);
  res.status(200).json({
    status: 'Succes',
    data: data,
  });
});

const updateLanguage = catchError(async (req, res, next) => {
  const data = await Lang.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
});

const deleteLanguage = catchError(async (req, res, next) => {
  const data = await Lang.findByIdAndDelete(req.params.id);
});

module.exports = {
  getAllLanguages,
  getOneLanguage,
  addLanguage,
  updateLanguage,
  deleteLanguage,
};
