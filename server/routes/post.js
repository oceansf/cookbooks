const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

router.get('/feed', (req, res) => {
  Post.find()
    .populate('postedBy', '_id name')
    .sort('-createdAt')
    .then(posts => {
      res.json({ posts });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/createpost', requireLogin, (req, res) => {
  const { title, body, photoUrl } = req.body;
  if (!title || !body || !photoUrl) {
    return res.status(422).json({ error: 'Plase add all the fields' });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: photoUrl,
    postedBy: req.user,
  });
  post
    .save()
    .then(result => {
      res.json({ post: result });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
