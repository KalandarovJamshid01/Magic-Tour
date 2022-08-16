// review /  rating / createdAt / ref to tour / ref to user

const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      minlength: [2, 'You enter more words!'],
      required: [true, 'You should not empty'],
    },
    rating: {
      type: Number,
      min: [1, 'You enter at least 1 rating'],
      max: [5, 'You enter maximum 5 rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'tours',
      required: [true, 'Review must belong to any tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: [true, 'Review must belong to any user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.averageStatsRatings = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        avgRatings: { $avg: '$rating' },
        allReview: { $sum: 1 },
      },
    },
  ]);
  console.log(stats);

  await Tour.findByIdAndUpdate(tourId, {
    ratingsAverage: stats[0].avgRatings,
    ratingsQuantity: stats[0].allReview,
  });
};

// findByIdAndUpdate
// findByIdAndDelete
// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = this.findOne();
//   next();
// });

reviewSchema.post('save', function () {
  this.constructor.averageStatsRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();

  next();
});

reviewSchema.post(/^findOneAnd/, async function (error, res, next) {
  console.log('SAlom: ' + this.r);
  await this.r.constructor.averageStatsRatings(this.r.tour);
});

const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;
