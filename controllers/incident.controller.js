const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Incident = mongoose.model('incident');
const User = mongoose.model('User');

module.exports.createIncident = (req, res) => {
  this.findByEmailId(req, res);
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

module.exports.getIncidentById = (req, res) => {  
  //let id = "56e6dd2eb4494ed008d595bd";
  Incident.findById({_id: id}, (err, incident) => {
    return !err ? res.status(200).send(incident) : console.log("Data fetching error");
  });
}

module.exports.findByEmailId = (req, res) => {
  User.findOne({email: req.body.referenceEmail}, (err, filterData) => {     
    if(!err) {
      consol.log('filterData', filterData);
      this.saveNewIncident(filterData, req.body, res);
    }else{
      console.log("Data fetching error");
    };    
  });
};

module.exports.saveNewIncident = (filterObj, incidentData, res) => {
  // console.log("---------filterData--------",filterObj);

  let incident = new Incident({
      userMapId: filterObj._id,
      email: filterObj.email,
      enterpriseId: filterObj.enterpriseId,
      firstName: filterObj.firstName,
      lastName: filterObj.lastName,
      isVaidUser: filterObj.isVaidUser,
      isOpen: true,
      isResolved: false,
      isClarification: false,
      created_on: new Date(),
      
      title: incidentData.incidentTitle,
      issueType: incidentData.incidentType,
      description: incidentData.incidentDescription,
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








/*

module.exports.createIncident = (req, res) => {
  this.findByEmailId(req, res);
  // let incident = new Incident({
  //     title: req.body.incidentTitle,
  //     email: req.body.referenceEmail,
  //     issueType: req.body.incidentType,
  //     description: req.body.incidentDescription,
  //     enterpriseId: req.body.enterpriseId,
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     isVaidUser: true,
  //     isOpen: true,
  //     isResolved: false,
  //     isClarification: false,
  //     created_on: new Date()
      
  // });
  
  // incident.save((err, newIncidient) => {
  //     if(!err){
  //         res.status(200).send(newIncidient);
  //     }else{ 
  //         let errorTitle = err.errors.title;
  //         let errorDescription = err.errors.description;

  //         if(errorTitle && error.path === 'title'){
  //           res.send("Title should not empty");
  //         }

  //         if(errorDescription && error.path === 'description'){
  //           res.send("Description should not empty");
  //         }
  //     }
  // });
}
*/