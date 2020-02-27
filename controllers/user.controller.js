const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = (req, res) => {

  let user = new User({
      enterpriseId: req.body.enterpriseId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      email: req.body.email,
      password: req.body.password
      
  });
  
  user.save((err, doc) => {
      if(!err){
        res.status(200).send(doc);
      }
      else{ 
          let errorEmail = err.errors.email;
          let errorPassword = err.errors.password;
          let errorEnterpriseId = err.errors.enterpriseId;
          let errorFirstName = err.errors.firstName;
          let errorLastName = err.errors.lastName;
          //let errorVaidUser = err.errors.vaidUser;

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

          // if(errorVaidUser && errorVaidUser.path === 'password'){
        //     let passLength = errorPassword.properties.value;
        //     res.send( passLength.length < 4 ? 'Password should be more then 4 charactor' : '');
        // }
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
      console.log('err', err);
    } else
        if(!user){
            res.status(401).send('Invalid email');
        }else
          if(user.password !== userdata.password){
            res.status(401).send('Invalid Password');
          }else{
            res.status(200).send(user)
          }
  })
  
}