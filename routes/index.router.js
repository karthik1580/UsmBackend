const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const adminCtrl = require('../controllers/admin.controller');
const pmoCtrl = require('../controllers/pmo.controller');
//const User = mongoose.model('User');

//User Access
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.get('/user', userCtrl.userslist);
router.get('/user/:id', userCtrl.userslist);

router.get('/admin', adminCtrl.users);
router.get('/admin/:id', adminCtrl.userById);
router.put('/admin/:id', adminCtrl.updateUserById);

router.get('/pmo', pmoCtrl.pmo);

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
