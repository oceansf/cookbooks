const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [{type: ObjectId, ref: "User"}],
  following: [{type: ObjectId, ref: "User"}],
  resetToken: String,
  expireToken: Date,
});

mongoose.model('User', userSchema);
