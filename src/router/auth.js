const express = require('express');
const router = express.Router();
const { login, register, addUser } = require('../controllers/auth');

router.get('/login', login);
router.get('/register', register);
router.post('/register', addUser);

module.exports = router;
