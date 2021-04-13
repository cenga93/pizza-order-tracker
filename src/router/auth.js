const express = require('express');
const router = express.Router();
const isUser = require('../middleware/isUser');
const validationRules = require('../middleware/validationRules');
const { login, register, addUser, loginUser, logout } = require('../controllers/auth');

router.get('/login', isUser.guest, login);
router.get('/register', isUser.guest, register);

router.post('/register', validationRules.register(), addUser);
router.post('/login', validationRules.login(), loginUser);
router.post('/logout', logout);

module.exports = router;
