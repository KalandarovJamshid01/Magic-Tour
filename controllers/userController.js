const User = require('../models/userModel');
const catchErrorAsync = require('../utility/catchAsync');
const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require('./handlerController');

const getAllUsers = (req, res, next) => {
  getAll(req, res, next, User);
};
const getUserById = (req, res, next) => {
  getOne(req, res, next, User);
};
const addUser = (req, res, next) => {
  add(req, res, next, User);
};
const updateUser = (req, res, next) => {
  update(req, res, next, User);
};

const deleteUser = (req, res, next) => {
  deleteData(req, res, next, User);
};
const updateMe = catchErrorAsync(async (req, res, next) => {
  //1) user password not changed

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'You must not change password by this URL. Please change password url',
        404
      )
    );
  }

  const user = await User.findById(req.user.id);

  // 2) update user info
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.photo = req.body.photo || user.photo;
  // 3) save info into database
  const userUpdateInfo = await User.findByIdAndUpdate(req.user.id, user, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Your data has been updated',
    data: userUpdateInfo,
  });
});

const deleteMe = catchErrorAsync(async (req, res, next) => {
  //1)User update Active schema
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateMe,
  deleteUser,
  deleteMe,
  updateUser,
};
