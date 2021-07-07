const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Item = require('../models/item');
const moment = require('moment');

router.post('/', async (req, res) => {
  //  update the stock
  for (const item of req.body.items) {
    try {
      const dbItem = await Item.findById(item.id);
      if (dbItem.qnt < item.amount) return res.status(500).send('Out of stock');
      await Item.findByIdAndUpdate(item.id, { qnt: dbItem.qnt - item.amount });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  //  create and save order
  order = new Order({
    items: req.body.items,
    shipmentCost: req.body.shipmentCost,
    itemsCost: req.body.totalItemsPrice,
    totalCost:
      parseFloat(req.body.shipmentCost) + parseFloat(req.body.totalItemsPrice),
    userDetails: req.body.userDetails,
    time: moment().format('DD/MM/YYYY H:mm:ss'),
  });
  try {
    await order.save();
    res.send('Success');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
