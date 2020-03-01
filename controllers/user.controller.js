const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

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

module.exports.incidentlist = (req,res) => {

  let incidentslist = [
    {
      "_id": '1111',
      "name": 'karthik',
      "descriptions": "jsakjsad"
    },
    {
      "_id": '1111',
      "name": 'karthik',
      "descriptions": "jsakjsad"
    },
    {
      "_id": '1111',
      "name": 'karthik',
      "descriptions": "jsakjsad"
    },
    {
      "_id": '1111',
      "name": 'karthik',
      "descriptions": "jsakjsad"
    },
    {
      "_id": '1111',
      "name": 'karthik',
      "descriptions": "jsakjsad"
    }
  ];

  res.json(incidentslist);
}