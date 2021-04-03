const express = require('express');
const router = express.Router();
const { home, cart, login, register } = require('../controllers/default');

router.get('/', home);
router.get('/cart', cart);
router.get('/login', login);
router.get('/register', register);

module.exports = router;
