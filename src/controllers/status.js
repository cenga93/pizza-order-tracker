module.exports.cart = (req, res) => {
  const errors = req.flash('error');
  res.render('pages/_cart', { errors });
};
