const express = require('express');
const router = express.Router();
const { home } = require('../controllers/default');

router.get('/', home);

module.exports = router;
