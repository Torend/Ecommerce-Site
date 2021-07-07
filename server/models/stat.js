const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  purchased: {
    type: Number,
    required: true,
  },
  priceAvg: {
    type: Number,
    required: true,
  },
  addedTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('stat', statSchema);
