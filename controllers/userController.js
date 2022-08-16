const User = require('../models/userModel');
const catchErrorAsync = require('../utility/catchAsync');
const bcrypt = require('bcryptjs');
const AppError = require('../utility/appError');
const authController = require('./authController');
const multer = require('multer');
const sharp = require('sharp');
const {
  deleteOne,
  updateOne,
  addOne,
  getOne,
  getAll,
} = require('./handlerController');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users/');
//   },
//   filename: (req, file, cb) => {
//     // user-23482348032984-423423243
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    return cb(null, true);
  } else {
    return cb(new AppError('You only upload images!', 400));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadImage = upload.single('photo');

const resize = (req, res, next) => {
  console.log('sddfsfsf:' + req.file);
  if (!req.file) {
    return next();
  }
  console.log('Hello');
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg()
    .toFile('public/img/users');
  next();
};

const getAllUsers = getAll(User);
const getUserById = getOne(User);
const addUser = addOne(User);
const updateUser = updateOne(User);
const deleteUser = deleteOne(User);

const updateMePassword = catchErrorAsync(async (req, res, next) => {
  // 1) Eski parolni tekshirishib kuramiz
  console.log(req.user);
  if (req.body.oldPassword == req.body.newPassword) {
    return next(
      new AppError('Yangi va eski parollar bir xil bulmasligi kerak!', 404)
    );
  }

  if (!req.body.oldPassword) {
    return next(new AppError('Siz eski parolni kiritishingiz shart!', 401));
  }

  const user = await User.findById(req.user.id).select('+password');
  console.log(user);
  const tekshir = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!tekshir) {
    return next(new AppError('Notugri eski parolni kiritdingiz!', 401));
  }

  // 2) Yangi parolni saqlaymiz.
  if (req.body.newPassword != req.body.newPasswordConfirm) {
    return next(
      new AppError(
        'Siz ikki xil parol kiritib quydingiz, Iltimos qayta tekshiring!',
        401
      )
    );
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  user.passwordChangedDate = Date.now();
  await user.save();

  // 3) Yangi JWT berish
  console.log('User:' + user);

  const token = authController.createToken(user._id);

  authController.saveTokenCookie(token, res, req);

  res.status(200).json({
    status: 'success',
    token: token,
  });
});

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const updateMe = catchErrorAsync(async (req, res, next) => {
  // 1) Malumotlarni yangilash
  console.log(req.file);
  console.log(req.body);

  const user = await User.findById(req.user.id);

  console.log(user);
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.photo = req.file.filename || user.photo;

  const newUser = await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});

const deleteMe = catchErrorAsync(async (req, res, next) => {
  // 1) User ni topamiz

  const user = await User.findById(req.user.id).select('active password');

  // 2) Passwordni tekshirish
  const tekshir = bcrypt.compare(req.body.password, user.password);

  if (!tekshir) {
    return next(new AppError('Siz parolni xato kiritdingiz!', 401));
  }

  user.active = false;
  await user.save({ validateBeforeSave: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  updateMePassword,
  updateMe,
  deleteMe,
  getMe,
  uploadImage,
  resize,
};
