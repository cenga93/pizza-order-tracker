const express = require('express');
const router = express.Router();
const { home, cart } = require('../controllers/default');

router.get('/', home);
router.get('/cart', cart);

module.exports = router;
