const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    // TODO: ingredients: {
    //   type: String,
    //   required: true,
    // },
    // TODO: instructions: {
    //   type: String,
    //   required: true,
    // },
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: 'User' },
      },
    ],
    ingredients: [{ type: String }],
    instructions: [{ type: String }],
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

mongoose.model('Post', postSchema);
