const mongoose = require('mongoose');

let IncidentSchema = new mongoose.Schema({
  userMapId: {
    type: String
  },
  enterpriseId: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  role: {
    type: String
  },
  email: {
    type: String
  },
  description: {
    type: String
  },
  createdDate: {
    type: Date
  }
});