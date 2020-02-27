const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/userlist', userCtrl.userList);

module.exports = router;
