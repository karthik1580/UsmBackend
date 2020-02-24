const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true,  useUnifiedTopology: true }, (err) => {
  if(!err) {
    console.log('Mongodb connected successfully');
  } else {
    console.log('Error in Mongodb Connection');
  }
});

require('../models/user.model');

module.exports = mongoose;

