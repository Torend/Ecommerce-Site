const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
  },
  site: {
    type: String,
  },
});

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: brandSchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qnt: {
    type: Number,
    required: true,
    min: 0,
  },
  master: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: [String],
    required: true,
  },
  colors: {
    type: [{ id: String, hexCode: String }],
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
  },
  specs: {
    type: [String],
  },
  videos: {
    type: [String],
  },
  site: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  additionalInfo: {
    type: String,
  },
});

module.exports = mongoose.model('item', itemSchema);
