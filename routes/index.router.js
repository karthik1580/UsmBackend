const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const adminCtrl = require('../controllers/admin.controller');
const pmoCtrl = require('../controllers/pmo.controller');
const incidentCtrl = require('../controllers/incident.controller');
const jwt = require('jsonwebtoken');
//const User = mongoose.model('User');

//User Access
//router.post('/authenticate', userCtrl.authenticate);
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/login/:id', userCtrl.getUserDetailsEmailId);

router.get('/user', userCtrl.userslist);
router.get('/user/:id', userCtrl.usersUserById);
router.put('/user/:id', adminCtrl.updateUserResetPwd);

router.get('/resetPass/:id', userCtrl.findByUserEmailId);
router.put('/resetPass/:id', userCtrl.userPasswordUpdate);

router.get('/admin', adminCtrl.users);
//router.get('/admin/:id', adminCtrl.userById);
router.put('/admin/:id', adminCtrl.updateUserById);
router.delete('/admin/:id', adminCtrl.userDeleteById);

router.get('/pmo', pmoCtrl.pmo);
router.get('/pmo/:id', pmoCtrl.pmoById);
router.put('/pmo/:id', pmoCtrl.pmoUpdateUserById);

router.post('/incident', incidentCtrl.createIncident);
router.get('/incident', incidentCtrl.getAllIncident);
router.get('/incident/:id', incidentCtrl.getIncidentById);
//router.put('/incident:id', incidentCtrl.updateIncidentById);

//router.put('/resetPwd/:id', userCtrl.userPasswordUpdate);


function verifyToken(req, res, next){
    debugger;
    if(!req.headers.authorization){
        return res.status(401).send('Unautorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
      return res.status(401).send('Unautorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload){
      return res.status(401).send('Unautorized request');
    }
    req.userId = payload.subject;
    next();
  }

module.exports = router;
