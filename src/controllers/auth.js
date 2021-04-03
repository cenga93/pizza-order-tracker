// login page
exports.login = (req, res) => {
  res.render('pages/_login', { layout: 'layout/_sign' });
};

// registration page
exports.register = (req, res) => {
  res.render('pages/_register', { layout: 'layout/_sign' });
};
