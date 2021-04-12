const Order = require('../models/order');

exports.admin = async (req, res) => {
  await Order.find({ status: { $ne: 'completed' } }, null, { sort: { createdAt: -1 } })
    .populate('customerId', '-password')
    .exec((err, orders) => {
      if (req.xhr) {
        return res.json(orders);
      } else {
        return res.render('pages/_adminOrders');
      }
    });
};

exports.changeStatus = async (req, res) => {
  const { orderId, status } = req.body;
  await Order.updateOne({ _id: orderId }, { status })
    .then(() => {
      return res.redirect('/admin/orders');
    })
    .catch((err) => {
      console.log(err);
    });
};
