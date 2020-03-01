const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports.users = (req, res) => {
    User.find({}, (err, users) => {
      if(!err)
        res.status(200).send(users)
      else
        console.log("Data fetching error");
    })
}

module.exports.userById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(!err)
      res.status(200).send(user)
    else
      console.log("Data fetching error");
  })
}

module.exports.updateUserById = (req, res) => {
  console.log("Karthik");
  User.findByIdAndUpdate(
        req.params.id, 
        { $set: { 
                  enterpriseId: req.body.enterpriseId,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  role: req.body.role,
                  email: req.body.email,
                  password: req.body.password,
                  isVaidUser: true,
                  created_on: new Date()
                }
        },{
          new: true
        }, 
        (err, updateUser) => {          
          //return !err ? res.status(200).send(update) : console.log(err);
          console.log("inside data updating");
          if(!err){
            res.status(200).send(updateUser);
            console.log("Data updating successfully");
          }
          else
            console.log("Data updating error");
        }
    )
}

// module.exports.updateUser = (req, res) => {
//   console.log('res', res);
//   User.findByIdAndUpdate({id: userdata._id}, req.body, (err, user) => {
//     console.log('update user', user);
//     console.log('update err', err);
//     res.status(200).send(user);
//   })  
// }