const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

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
  let updateUserObj = {
      isVaidUser: req.body.isValid,
      created_on: new Date()
  }
  User.findByIdAndUpdate( req.params.id, 
        { $set: updateUserObj },
        { new: true }, 
        function(err, updateUser) {          
          if(!err){
            res.status(200).send(updateUser);
            console.log("Data updating successfully");
          }else{
            console.log("Data updating error");
          }
        }
    )
}

 module.exports.updateUserResetPwd = (req, res) => {
  let updateUserObj = {
      password: 'support',
      created_on: new Date()
  }
  User.findByIdAndUpdate( req.params.id, 
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

module.exports.userDeleteById = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deleteUser) => {
    if(!err){
      res.status(200).json(deleteUser);
    }else{ 
      res.status(400).send('Error deleting selected user');
    }
  })
}


module.exports.userById = (req, res) => {
  //console.log('res', res);
  // User.findByIdAndUpdate({id: userdata._id}, req.body, (err, user) => {
  //   console.log('update user', user);
  //   console.log('update err', err);
  //   res.status(200).send(user);
  // })  
}

// function verifyToken(req, res, next){
//   if(!req.headers.authorization){
//       return res.status(401).send('Unautorized request');
//   }
//   let token = req.headers.authorization.split(' ')[1];
//   if(token === 'null'){
//     return res.status(401).send('Unautorized request');
//   }
//   let payload = jwt.verify(token, 'secretKey');
//   if(!payload){
//     return res.status(401).send('Unautorized request');
//   }
//   req.userId = payload.subject;
//   next();
// }