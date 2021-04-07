const express = require('express');
const router = express.Router();
const { login, register, addUser, loginUser } = require('../controllers/auth');

router.get('/login', login);
router.get('/register', register);

router.post('/register', addUser);
router.post('/login', loginUser);

module.exports = router;
