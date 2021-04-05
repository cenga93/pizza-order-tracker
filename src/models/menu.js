const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    require: true,
  },
});

// Create meun collection
const Menu = new mongoose.model('pizzas', menuSchema);

module.exports = Menu;
