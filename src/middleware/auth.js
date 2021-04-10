module.exports = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) next();
    else {
      req.flash('error', 'Please log in...');
      res.redirect('/');
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
