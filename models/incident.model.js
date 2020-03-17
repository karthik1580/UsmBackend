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
  role: {
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
  status: {
    type: String
  },
  workstation: {
    type: String
  },
  isOpen: {
    type: Boolean
  },
  isOpenStatus: {
    type: Boolean
  },
  isClosed: {
    type: Boolean
  },
  isResolved: {
    type: Boolean
  },
  isClarification: {
    type: Boolean
  },
  isCheckBox: {
    type: Boolean
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('incident', IncidentSchema);
//test