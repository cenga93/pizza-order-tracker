const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');
const validationRules = require('../middleware/validationRules');
const { login, register, addUser, loginUser, logout } = require('../controllers/auth');

router.get('/login', checkAuth, login);
router.get('/register', checkAuth, register);
router.post('/register', validationRules.register(), addUser);
router.post('/login', validationRules.login(), loginUser);
router.post('/logout', logout);

module.exports = router;
