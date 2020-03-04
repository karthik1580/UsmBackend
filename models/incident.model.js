const mongoose = require('mongoose');

let IncidentSchema = new mongoose.Schema({
  userMapId: {
    type: String
  },
  title: {
    type: String
  },
  email: {
    type: String
  },
  issueType: {
    type: String
  },
  description: {
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
  isVaidUser: {
    type: Boolean
  },
  isOpen: {
    type: Boolean
  },
  isResolved: {
    type: Boolean
  },
  isClarification: {
    type: Boolean
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('incident', IncidentSchema);