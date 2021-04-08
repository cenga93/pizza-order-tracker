const Menu = require('../models/menu');
const mongoose = require('mongoose');

// index
module.exports.home = async (req, res) => {
  try {
    // .select('name price _id productImg')
    const pizzas = await Menu.find().exec();

    if (pizzas.length) res.status(200).render('pages/_home', { pizzas });
    else res.status(404).json({ message: 'Not found records' });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

// POST pizza (home page) ** NOT COMPLETE
module.exports.posthome = (req, res) => {
  const { img, name, price, size } = req.body;
  const newPizza = new Menu({ _id: new mongoose.Types.ObjectId(), img, name, price, size });

  newPizza
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log('Neka greska');
    });
};
