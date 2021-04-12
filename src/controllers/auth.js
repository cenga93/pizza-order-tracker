const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const { validationResult } = require('express-validator');

// const _redirectURL = (req) => {
//   return req.user.role === 'admin' ? '/admin/orders' : '/orders';
// };

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
  const errors = req.flash('error');

  res.render('pages/_register', {
    action: '/register',
    method: 'POST',
    layout: 'layout/_sign',
    errors,
  });
};

// registration page || POST
exports.addUser = (req, res) => {
  const errors = validationResult(req);

  /**
   * !errors.isEmpty() => exists some errors
   */
  if (!errors.isEmpty()) {
    errors.array().map(({ msg }) => {
      req.flash('error', msg);
    });

    return res.redirect('/register');
  } else {
    const { firstname, lastname, email, password } = req.body;

    if (firstname && lastname && email && password) {
      User.exists({ email: email })
        .then((user) => {
          // email exist
          if (user) {
            req.flash('error', 'Email already taken');
            return res.status(409).redirect('/register');
          } else {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                req.flash('error', 'Sometheng went wrong');
                return res.status(500).redirect('/register');
              } else {
                // create new user
                const newUser = new User({ _id: new mongoose.Types.ObjectId(), password: hash, email, firstname, lastname });
                // save new user
                newUser
                  .save()
                  .then((result) => {
                    const registeredEmail = result.email;
                    req.flash('success', registeredEmail);
                    return res.status(201).redirect('/login');
                  })
                  .catch((err) => {
                    return res.status(500).json({ error: err.message });
                  });
              }
            });
          }
        })
        .catch((err) => {
          return res.json({ error: err.message });
        });
    } else {
      req.flash('error', 'All fields are required');
      return res.redirect('/register');
    }
  }
};

// login page || POST
exports.loginUser = (req, res, next) => {
  const errors = validationResult(req);

  /**
   * !errors.isEmpty() => exists some errors
   */
  if (!errors.isEmpty()) {
    errors.array().map(({ msg }) => {
      req.flash('error', msg);
    });
    return res.redirect('/login');
  } else {
    // custom callback
    passport.authenticate('local', (err, user, { message }) => {
      if (!user) {
        req.flash('error', message);
        return res.redirect('/login');
      }

      if (err) {
        req.flash('error', message);
        return next(err);
      }

      req.logIn(user, (err) => {
        if (err) {
          req.flash('error', message);
          return next(err);
        }
        return res.redirect(req.body.currentPage);
      });
    })(req, res, next);
  }
};

// logout user
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw new Error(err);
    else res.redirect('/login');
  });
};
