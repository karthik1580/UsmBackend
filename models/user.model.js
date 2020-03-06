const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  enterpriseId: {
    type: String, 
    required: 'First name should not empty'
  },
  firstName: {
    type: String, 
    required: 'First name should not empty',
    trim: true
  },
  lastName: {
    type: String, 
    required: 'Last name should not empty'
  },
  role: {
    type: String
  },
  email: {
    type: String, 
    required: 'Email should not empty',
    unique: true,
    trim: true,
    uniqueValidator: false
  },  
  password: {
    type: String, 
    required: 'Password should not empty', 
    trim: true, 
    minlength: [4, 'Password should not lessthen 4 char']
  },
  saltSecret: {
    type: String
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  isVaidUser: {
    type: Boolean
  },
  newPassword: {
    type: String
  }
});
// Reference for salt secret
// let userSchema = new mongoose.Schema({
//   password: {}
//   saltSecret: {type: String}
// });

userSchema.plugin(uniqueValidator);

userSchema.path('password').validate((val) => {
  return val.length > 3;
}, 'password is not valid');

userSchema.path('email').validate((val) => {
  emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegx.test(val);
}, 'Invalid e-mail');

userSchema.pre('save', function(next) { 
  bcrypt.genSalt(10, (err, salt) => {   
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });    
  });
});

userSchema.method.verifyPassword = function(pwd){
  return bcrypt.compareSync(pwd, this.password);
}

// userSchema.method.generateJwt(() => {
//   return jwt.sign({ _id: this._id },
//   process.env.JWT_SECRET  
//   )
// });
mongoose.model('User', userSchema);