// cart page
module.exports.cart = (req, res) => {
  res.render('pages/_cart');
};

module.exports.addItemToCart = (req, res) => {
  const { _id, price } = req.body;

  // if not exist cart object
  if (!req.session.cart) {
    req.session.cart = {
      items: {},
      totalQty: 0,
      totalPrice: 0,
    };
  }

  let cart = req.session.cart;

  if (!cart.items[_id]) {
    cart.items[_id] = {
      item: req.body,
      qty: 1,
    };
    cart.totalQty += 1;
    cart.totalPrice += price;
  } else {
    cart.items[_id].qty += 1;
    cart.totalQty += 1;
    cart.totalPrice += price;
  }
  return res.json({ data: req.session.cart });
};
