const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports.pmo = (req, res) => {
  User.find({}, (err, users) => {
    console.log('users', users);
    res.status(200).send(users);
  })
}

module.exports.pmoById = (req, res) => {
  console.log('req.body', req.body);

  User.findOne({id: req.body._id}, (err, filterData) => {     
    if(!err) {
      res.status(200).send(filterData);
    }else{
      console.log("Data fetching error");
    };    
  });
  //User.
  // User.findById({_id: req.params._id}, (err, users) => {
  //   console.log('users', users);
  //   res.status(200).send(users);
  // })
}