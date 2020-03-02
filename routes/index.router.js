const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const adminCtrl = require('../controllers/admin.controller');
const pmoCtrl = require('../controllers/pmo.controller');
const jwt = require('jsonwebtoken');
//const User = mongoose.model('User');

//User Access
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.get('/user', userCtrl.userslist);
router.get('/user/:id', userCtrl.userslist);

router.get('/admin', adminCtrl.users);
//router.get('/admin/:id', adminCtrl.userById);
router.put('/admin/:id', adminCtrl.updateUserById);
router.delete('/admin/:id', adminCtrl.userDeleteById);

router.get('/pmo', pmoCtrl.pmo);


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


// router.get('/incidentlist1', (req,res) => {
//     let userslist = [
//       {
//         "_id": '1111',
//         "name": 'karthik',
//         "descriptions": "jsakjsad"
//       },
//       {
//         "_id": '1111',
//         "name": 'karthik',
//         "descriptions": "jsakjsad"
//       },
//       {
//         "_id": '1111',
//         "name": 'karthik',
//         "descriptions": "jsakjsad"
//       },
//       {
//         "_id": '1111',
//         "name": 'karthik',
//         "descriptions": "jsakjsad"
//       },
//       {
//         "_id": '1111',
//         "name": 'karthik',
//         "descriptions": "jsakjsad"
//       }
//     ];
  
//     res.json(userslist);
//   });

module.exports = router;
