const mongoose = require('mongoose');

const langSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  uz: {
    type: String,
    required: true,
  },
  eng: {
    type: String,
    required: true,
  },
  ru: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});




const Lang = mongoose.model('langs', langSchema);

module.exports = Lang;
