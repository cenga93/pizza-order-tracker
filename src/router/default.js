const express = require('express');
const router = express.Router();
const { home, posthome } = require('../controllers/default');
const { login, register } = require('../controllers/auth');
const { cart, addItemToCart } = require('../controllers/cart');

router.get('/', home);
router.get('/login', login);
router.get('/register', register);
router.post('/', posthome);

router.get('/cart', cart);
router.post('/cart', addItemToCart);

module.exports = router;
