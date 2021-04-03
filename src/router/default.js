const express = require('express');
const router = express.Router();
const { home, cart } = require('../controllers/default');
const { login, register } = require('../controllers/auth');

router.get('/', home);
router.get('/cart', cart);
router.get('/login', login);
router.get('/register', register);

module.exports = router;
