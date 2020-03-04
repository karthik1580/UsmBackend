const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Incident = mongoose.model('incident');

module.exports.createIncident = (req, res) => {

  let incident = new Incident({
      title: req.body.title,
      email: req.body.email,
      issueType: req.body.issueType,
      description: req.body.description,
      enterpriseId: req.body.enterpriseId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      isVaidUser: true,
      isOpen: req.body.isOpen,
      isResolved: req.body.isResolved,
      isClarification: req.body.isClarification,
      created_on: new Date()
      
  });
  
  incident.save((err, newIncidient) => {
      if(!err){
          res.status(200).send(newIncidient);
      }else{ 
          let errorTitle = err.errors.title;
          let errorDescription = err.errors.description;

          if(errorTitle && error.path === 'title'){
            res.send("Title should not empty");
          }

          if(errorDescription && error.path === 'description'){
            res.send("Description should not empty");
          }
      }
  });
}

module.exports.getAllIncident = (req, res) => {
  Incident.find({} ,(err, data) => {
    // return (!err) ? res.status(200).send(data) : console.log("Data fetching error");
    if(!err){
      res.status(200).send(data)
    }else{
      console.log("Data fetching error");
    }
  });
}

// module.exports.getIncidentById = (req, res) => {
//   Incident.findById(req.params.userMapId, (err, data) => {
//     return !err ? res.status(200).send(data) : console.log("Data fetching error");
//   });
// }