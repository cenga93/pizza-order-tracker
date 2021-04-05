const express = require('express');
const router = express.Router();
const { home, posthome } = require('../controllers/default');
const { cart, addItemToCart } = require('../controllers/cart');

router.get('/', home);
router.post('/', posthome);

router.get('/cart', cart);
router.post('/cart', addItemToCart);

module.exports = router;
