const express = require('express');
const router = express.Router();
const { login, register, addUser, loginUser, logout } = require('../controllers/auth');
const checkAuth = require('../middleware/auth');

router.get('/login', checkAuth, login);
router.get('/register', checkAuth, register);
router.post('/register', addUser);
router.post('/login', loginUser);
router.post('/logout', logout);

module.exports = router;
