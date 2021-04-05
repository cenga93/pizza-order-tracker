// import axios from 'axios';
/**
 * ****** | without axios app.min.js  5,8kB | *******
 * ****** | with axios app.min.js 17,3kB | *******
 */
const addToCartButton = document.querySelectorAll('.products__button');
const cartCounter = document.querySelector('.nav-counter');

const updateCart = (selectedPizza) => {
  $.post({
    traditional: true,
    url: '/cart',
    contentType: 'application/json',
    data: selectedPizza,
    dataType: 'json',
    success: function ({ data }) {
      cartCounter.innerText = data.totalQty;
    },
  });
};

addToCartButton.forEach((btn) => {
  btn.addEventListener('click', () => {
    updateCart(btn.dataset.pizza);
  });
});
