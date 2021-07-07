const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: {
    type: [{ id: String, name: String, amount: Number, price: Number }],
    required: true,
  },
  shipmentCost: {
    type: Number,
    required: true,
  },
  itemsCost: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  time: { type: String, required: true },
  userDetails: {},
});

module.exports = mongoose.model('order', orderSchema);
