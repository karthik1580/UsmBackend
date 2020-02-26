const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = (req, res, next) => {

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
        res.send(doc);
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

//module.exports = register;