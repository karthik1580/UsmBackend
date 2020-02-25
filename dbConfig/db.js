const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) {
    console.log('Mongodb connected successfully');
  } else {
    console.log('Error in Mongodb Connection');
  }
});

require('../models/user.model');

module.exports = mongoose;

