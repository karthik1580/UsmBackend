const mongoose = require('mongoose');
const User = mongoose.model('User');
const Incident = mongoose.model('incident');
const jwt = require('jsonwebtoken');

module.exports.pmo = (req, res) => {
  User.find({}, (err, users) => {
    console.log('users', users);
    res.status(200).send(users);
  })
}

module.exports.pmoById = (req, res) => {
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

// module.exports.updateUserById = (req, res) => {
//   User.findOneAndUpdate({id: req.body._id}, (err, filterData) => {     
//     if(!err) {
//       res.status(200).send(filterData);
//     }else{
//       console.log("Data fetching error");
//     };    
//   });
// }

module.exports.pmoUpdateUserById = (req, res) => {
  console.log('req.params-------------', req.body);
  let updateUserObj = {
      status: req.body.status,
      workstation: req.body.workstation,
      update_on: new Date()
  }
  Incident.findByIdAndUpdate( req.body._id, 
        { $set: updateUserObj },
        { new: true }, 
        function(err, updateUser) {          
          if(!err){
            res.status(200).send(updateUser);
            console.log("password updating successfully");
          }else{
            console.log("Data updating error");
          }
        }
    )
}