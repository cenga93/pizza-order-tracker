// import axios from 'axios';

/**
 * ****** | without axios app.min.js  5,8kB | *******
 * ****** | with axios app.min.js 17,3kB | *******
 */
const addToCartButton = document.querySelectorAll('.products__button');

addToCartButton.forEach((btn) => {
  btn.addEventListener('click', () => {
    updateCart(btn.dataset.pizza);
  });
});

const updateCart = (selectedPizza) => {
  $.post({
    traditional: true,
    url: '/cart',
    contentType: 'application/json',
    data: selectedPizza,
    dataType: 'json',
    error: function (err) {
      throw new Error(err);
    },
  })
    .then((data) => {
      let cartCounter = document.querySelector('.nav-counter');

      if (cartCounter == null) {
        cartCounter = document.createElement('span');
        cartCounter.classList.add('nav-counter');
        cartCounter.classList.add('mr-1');
        cartCounter.classList.add('text-light');
        cartCounter.innerText = data.data.totalQty;
        let parent = document.querySelectorAll('.navbar__item--cart a')[0];
        parent.prepend(cartCounter);
      } else {
        cartCounter.innerText = data.data.totalQty;
      }
      alert('Add item to cart');
    })
    .catch((err) => {
      throw new Error(err);
    });
};
