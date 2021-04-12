const Order = require('../models/order');
const moment = require('moment');
const { validationResult } = require('express-validator');

exports.orders = async (req, res) => {
  await Order.find({ customerId: req.user._id }, null, { sort: { createdAt: -1 } })
    .then((orders) => {
      res.status(200).render('pages/_orders', { orders, moment });
    })
    .catch(({ message }) => {
      res.status(500).json({ message });
    });
};

exports.addOrders = async (req, res) => {
  const { phone, address } = req.body;
  const errors = validationResult(req);

  /**
   * !errors.isEmpty() => exists some errors
   */
  if (!errors.isEmpty()) {
    errors.array().map(({ msg }) => {
      req.flash('error', msg);
    });

    return res.redirect('/cart');
  } else {
    const newOrder = new Order({ customerId: req.user._id, items: req.session.cart.items, phone, address });

    await newOrder
      .save()
      .then(() => {
        delete req.session.cart;
        res.redirect('/orders');
      })
      .catch(({ message }) => {
        res.status(500).json({ message });
      });
  }
};
