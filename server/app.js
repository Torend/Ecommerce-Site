const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(cors());

const itemRoute = require('./routes/item');
const usersRoute = require('./routes/user');
const orderRoute = require('./routes/order');
app.use('/', itemRoute);
app.use('/users', usersRoute);
app.use('/order', orderRoute);

const port = process.env.port || 8080;
app.listen(port, () => console.log('Server Started'));
