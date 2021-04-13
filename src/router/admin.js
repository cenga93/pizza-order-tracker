const express = require('express');
const router = express.Router();
const { admin, changeStatus } = require('../controllers/admin');
const isUser = require('../middleware/isUser');

// GET /admin/orders
router.get('/orders', isUser.admin, admin);
router.post('/orders/status', changeStatus);

module.exports = router;
