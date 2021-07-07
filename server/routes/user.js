const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/admin', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.isAdmin) res.send('Allowed');
  else res.send('Not Allowed');
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send('Cannot find user');
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = user.generateAuthToken();
      return res.send(token);
    } else res.status(401).send('Not Allowed');
  } catch {
    return res.status(500).send();
  }
});

router.post('/signup', async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    phone: req.body.phone,
    address: req.body.address,
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
