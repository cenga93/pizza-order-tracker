const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastname: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      require: true,
      minLength: 5,
    },
    rule: {
      type: String,
      default: 'customer',
    },
  },
  { timestamps: true }
);

// Create user collection
const User = new mongoose.model('users', userSchema);

module.exports = User;
