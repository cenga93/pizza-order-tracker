module.exports = (req, res, next) => {
  try {
    if (req.isAuthenticated()) next();
    else {
      req.flash('error', 'Please log in to vies this resource');
      res.redirect('/login');
    }
  } catch (err) {
    req.flash('error', err.message);
  }
};
