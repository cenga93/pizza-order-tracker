const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// login page
exports.login = (req, res) => {
  res.render('pages/_login', { layout: 'layout/_sign' });
};

// registration page || GET
exports.register = (req, res) => {
  res.render('pages/_register', {
    action: '/register',
    method: 'POST',
    layout: 'layout/_sign',
  });
};

// registration || POST
exports.addUser = (req, res) => {
  User.exists({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'Main exists',
        });
      } else {
        if (req.body.firstname && req.body.lastname && req.body.email && req.body.password) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
              });

              newUser
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    message: 'User created',
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        } else {
          req.flash('error', 'All fields are required !');
          res.redirect('register');
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
