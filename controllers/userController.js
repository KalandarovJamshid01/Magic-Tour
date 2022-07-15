const User = require('../models/userModel');
const catchErrorAsync = require('../utility/catchAsync');

const getAllUsers = catchErrorAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    userInfo: req.user,
    data: users,
  });
});

const addUser = catchErrorAsync(async (req, res) => {
  const data = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: data,
  });
});

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

const updateUser = catchErrorAsync(async (req, res, next) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json({
    status: 'success',
    data: data,
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

const getUserById = catchErrorAsync(async (req, res) => {
  const data = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: data,
  });
});
const deleteUser = catchErrorAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'User has been deleted',
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
