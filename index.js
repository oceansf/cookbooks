const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require('./config/keys');

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

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
