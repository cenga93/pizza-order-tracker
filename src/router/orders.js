const express = require('express');
const router = express.Router();
const isUser = require('../middleware/isUser');
const validationRules = require('../middleware/validationRules');
const { orders, addOrders, single } = require('../controllers/orders');

router.get('/orders/:id', single);
router.get('/orders', isUser.user, orders);

router.post('/orders', validationRules.addOrder(), addOrders);

module.exports = router;
