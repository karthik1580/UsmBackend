const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const adminCtrl = require('../controllers/admin.controller');
const pmoCtrl = require('../controllers/pmo.controller');
const User = mongoose.model('User');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/userlist', userCtrl.userslist);
router.get('/userlist', userCtrl.userslist);
//router.post('/userlistDate', userCtrl.userslistdate);
router.get('/incidentlist1', (req,res) => {
    let userslist = [
      {
        "_id": '1111',
        "name": 'karthik',
        "descriptions": "jsakjsad"
      },
      {
        "_id": '1111',
        "name": 'karthik',
        "descriptions": "jsakjsad"
      },
      {
        "_id": '1111',
        "name": 'karthik',
        "descriptions": "jsakjsad"
      },
      {
        "_id": '1111',
        "name": 'karthik',
        "descriptions": "jsakjsad"
      },
      {
        "_id": '1111',
        "name": 'karthik',
        "descriptions": "jsakjsad"
      }
    ];
  
    res.json(userslist);
  });

module.exports = router;
