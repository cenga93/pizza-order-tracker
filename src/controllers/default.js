exports.home = (req, res) => {
  res.render('pages/_home');
};

exports.cart = (req, res) => {
  res.render('pages/_cart');
};

exports.login = (req, res) => {
  res.render('pages/_login', { layout: 'layout/_sign' });
};

exports.register = (req, res) => {
  res.render('pages/_register');
};
