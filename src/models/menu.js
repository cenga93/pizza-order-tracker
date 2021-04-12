const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  img: {
    type: String,
    required: true,
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
