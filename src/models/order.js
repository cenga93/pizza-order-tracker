const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    },
    items: {
      type: Object,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: 'order_placed',
    },
  },
  { timestamps: true }
);

// Create order collection
const Order = new mongoose.model('orders', orderSchema);

module.exports = Order;
