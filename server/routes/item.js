const express = require('express');
const router = express.Router();
const Items = require('../models/item');
const Category = require('../models/category');
const {
  filterByCategory,
  sortItems,
  sliceItems,
  getNumOfPages,
} = require('./serverFunctions');

router.get('/item/:id', async (req, res) => {
  try {
    let item = await Items.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Cannot find the item' });
    else return res.json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/item/qnt/:id', async (req, res) => {
  try {
    let item = await Items.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Cannot find the item' });
    else return res.json(item.qnt);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/items/:category/:sort/:page', async (req, res) => {
  try {
    let items = await Items.find();
    items = filterByCategory(items, req.params.category);
    items = sortItems(items, req.params.sort);

    const numOfPages = getNumOfPages(items);
    items = sliceItems(items, req.params.page);

    let categories = await Category.findOne({ name: req.params.category });
    if (!categories) categories = [];
    else categories = categories.subCategory;

    return res.json({
      items: items,
      categories: categories,
      numOfPages: numOfPages,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/items/names', async (req, res) => {
  try {
    let items = await Items.find().select(['name']);
    if (!items) return res.status(404).json({ message: 'No items' });
    else return res.json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// router.get('/category/:category', async (req, res) => {
//   try {
//     categories = await Category.find({ name: req.params.category });
//     if (categories.length === 0) return res.json([]);
//     else return res.json(categories[0].subCategory);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// });

router.get('/shipmentCost', (req, res) => {
  // Category.create({
  //   name: 'אוזניות',
  //   subCategory: ['אוזניות אלחוטיות', 'אוזניות חוטיות'],
  // });
  return res.json(req.params);
});

module.exports = router;
