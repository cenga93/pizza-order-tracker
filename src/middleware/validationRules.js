const { check } = require('express-validator');

exports.register = () => [
  check('firstname', 'Firstname must be minimum 3 characters').trim().isLength({ min: 3 }),
  check('lastname', 'Lastname must be minimum 3 characters').trim().isLength({ min: 3 }),
  check('email', 'Email incorrect').trim().isEmail().toLowerCase().normalizeEmail(),
  check('password', 'Password must be min 5 characters').trim().isLength({ min: 5 }),
];

exports.login = () => [
  check('email', 'Email incorrect').trim().isEmail().toLowerCase(),
  check('password', 'Password must be minimum 5 characters').trim().isLength({ min: 5 }),
];

exports.addOrder = () => [
  check('phone', 'Phone must be minimum 5 characters').trim().toLowerCase().notEmpty().isLength({ min: 3 }),
  check('address', 'Password must be minimum 5 characters').toLowerCase().notEmpty().isLength({ min: 3 }),
];
