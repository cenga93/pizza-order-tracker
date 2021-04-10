const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // match user
      User.findOne({ email: email })
        .then((user) => {
          /**
           * 1. done is callback function
           * 2. null is error
           * 3. false is user
           */
          if (!user) {
            return done(null, false, { message: 'No exist user with this email' });
          }

          //
          /**
           * password match
           * isMAtch is boolean
           */
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              return res.json({ error: err.message });
            } else if (isMatch) {
              return done(null, user, { message: 'Logged in' });
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch((err) => {
          return res.json({ error: err.message });
        });
    })
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
};
