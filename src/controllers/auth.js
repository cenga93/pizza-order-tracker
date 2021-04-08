const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');

// login page || GET
exports.login = (req, res) => {
  res.render('pages/_login', {
    action: '/login',
    method: 'POST',
    layout: 'layout/_sign',
  });
};

// registration page || GET
exports.register = (req, res) => {
  res.render('pages/_register', {
    action: '/register',
    method: 'POST',
    layout: 'layout/_sign',
  });
};

// registration page || POST
exports.addUser = (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (firstname && lastname && email && password) {
    User.exists({ email: email })
      .then((user) => {
        if (user) {
          // email exist
          req.flash('error', 'Email already taken');
          return res.status(409).redirect('/register');
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              req.flash('error', 'Sometheng went wrong');
              return res.status(500).redirect('/register');
            } else {
              // new user
              const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                password: hash,
                firstname: firstname,
                lastname: lastname,
              });

              newUser
                .save()
                .then(() => {
                  res.status(201).redirect('/login');
                })
                .catch((err) => {
                  res.status(500).json({ error: err.message });
                });
            }
          });
        }
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  } else {
    req.flash('error', 'All fields are required');
    return res.redirect('/register');
  }
};

// login page || POST
exports.loginUser = (req, res, next) => {
  // custom callback
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.flash('error', info.message);
      return next(err);
    }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        req.flash('error', info.message);
        return next(err);
      }

      return res.redirect('/');
    });
  })(req, res, next);
};

// logout user
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    else res.redirect('/login');
  });
};
