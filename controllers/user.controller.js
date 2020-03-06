const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

module.exports.register = (req, res) => {

  let user = new User({
      enterpriseId: req.body.enterpriseId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      email: req.body.email,
      password: req.body.password,
      isVaidUser: req.body.isVaidUser,
      created_on: new Date()
      
  });
  
  user.save((err, regUser) => {
      if(!err){
          //let payload = { subject: regUser._id };
          //let token = jwt.sign(payload, 'secretKey');
          //res.status(200).send({token});
           console.log('regUser', regUser);
          res.status(200).send(regUser);
      }
      else{ 
          let errorEmail = err.errors.email;
          let errorPassword = err.errors.password;
          let errorEnterpriseId = err.errors.enterpriseId;
          let errorFirstName = err.errors.firstName;
          let errorLastName = err.errors.lastName;

          if(errorEmail && (errorEmail.path === 'email')){
            res.send(errorEmail.properties.type === 'unique' ? 'Duplicate email id' : 'Invalid email');
          }

          if(errorEnterpriseId && (errorEnterpriseId.path === 'enterpriseId')){
            if(errorEnterpriseId.properties.value === '')
              res.send('Enterprise Id should not empty');
          }

          if(errorFirstName && (errorFirstName.path === 'firstName')){
            if(errorFirstName.properties.value === '')
                res.send('First name should not empty');
          } 

          if(errorLastName && (errorLastName.path === 'lastName')){
            if(errorLastName.properties.value === '')
                res.send('Last name should not empty');
          } 

          if(errorPassword && errorPassword.path === 'password'){
              let passLength = errorPassword.properties.value;
              res.send( passLength.length < 4 ? 'Password should be more then 4 charactor' : '');
          }
      }
  });
}

module.exports.login = (req, res) => {
  let userdata = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne({email: userdata.email}, (err, user) => {
    if(err){
      res.status(401).send(err);
    } else if(!user) {
      res.status(401).send('Unauthorized user please contact administrator ');
    } else {
      if(user.password !== userdata.password){
        res.status(401).send('Invalid Password');
      } else {
          if(user.isVaidUser){
            let payload = { subject: user._id };
            let token = jwt.sign(payload, 'Jwt_SecretKey');
            res.status(200).send({token});
          }else{
            res.status(401).send('Administrator is not yet approve your request');
          }
      }
    }
  }) 
}

module.exports.userslist = (req,res) => {
  User.find({}, (err, userList) => {
      if(!err)
        res.status(200).send(userList)
      else
        console.log("Data fetching error");
      
    });
}
module.exports.usersUserById = (req,res) => {
  id = "56e6dd2eb4494ed008d595bd";
  User.findById({_id: id}, (err, userList) => {
      if(!err)
        res.status(200).send(userList)
      else
        console.log("Data fetching error");
      
    });
}

module.exports.authenticate = (req, res, next) => {
  password.authenticate('local', this.passConfig(err, user, info)(req, res));
}

module.exports.findByUserEmailId = (req, res) => {
  User.findOne({email: req.params.id}, (err, filterData) => {     
    if(!err) {
      res.status(200).send(filterData);
    }else{
      console.log("Data fetching error");
    };    
  });
}

module.exports.userPasswordUpdate = (filterData, res) => {
  
  let updateUserObj = {
      "_id": filterData._id,
      "enterpriseId": filterData.enterpriseId,
      "firstName": filterData.firstName,
      "lastName": filterData.lastName,
      "role": filterData.role,
      "email": filterData.email,
      "password": filterData.password,
      "isVaidUser": filterData.isVaidUser,
      created_on: new Date()
  }
  User.findByIdAndUpdate( filterData._id, 
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



