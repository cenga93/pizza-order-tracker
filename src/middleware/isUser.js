// is user ADMIN logged
exports.admin = (req, res, next) => {
  try {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    return res.status(500).json({ message });
  }
};

// is user logged
exports.user = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    return res.status(500).json({ message });
  }
};

// user is not logged / guest
exports.guest = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      req.flash('error', 'Please log in...');
      return res.redirect('/');
    }
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};
