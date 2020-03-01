const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports.pmo = (req, res) => {
    User.find({}, (err, users) => {
      res.status(200).send(users);
    })
  }