const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/orders', (req, res) => {
  const { phone, address } = req.body;

  if (phone && address) {
    const newOrder = new Order({ customerId: req.user._id, items: req.session.cart.items, phone, address });

    newOrder
      .save()
      .then((result) => {
        console.log(result);
      })
      .catch(({ message }) => {
        res.status(500).json({ message });
      });
  }
});

module.exports = router;
