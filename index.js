const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongodb');
});
mongoose.connection.on('error', err => {
  console.log('Error connecting', err);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow_Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
