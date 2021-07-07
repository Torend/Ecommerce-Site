const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const address = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  apartment: {
    type: Number,
  },
  floor: {
    type: Number,
  },
  zipCode: {
    type: Number,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  //give different access rights if admin or not
  isAdmin: Boolean,
  phone: {
    type: String,
  },
  address: {
    type: address,
  },
});

//custom method to generate authToken
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.MY_PRIVATE_KEY
  ); //get the private key from the config file -> environment variable
  return token;
};

const user = mongoose.model('user', userSchema);

//function to validate user
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    isAdmin: Joi.boolean(),
    phone: Joi.string().min(9).max(10),
    address: Joi.any(),
  });

  return schema.validate(user);
}

exports.User = user;
exports.validate = validateUser;
