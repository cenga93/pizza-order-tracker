/**
 * ****** | with [axios] app.min.js +12,3kB | *******
 */
const addToCartButton = document.querySelectorAll('.products__button');
const singleOrder = document.querySelector('.orderID') ? document.querySelector('.orderID') : null;
const steps = [...document.querySelectorAll('.single-order__item')];

class Cart {
  updateCart(selectedPizza) {
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
  }
}

class Order {
  adminOrder() {
    const orderTable = document.querySelector('#adminOrderTableBody');

    let orders = [];
    let template;

    $.ajax({
      type: 'GET',
      url: '/admin/orders',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => {
        orders = res;
        template = this.generateMarkUp(orders);
        orderTable.innerHTML = template;
      })
      .catch((err) => {
        console.log('ERROR', err.message);
      });
  }

  generateMarkUp(orders) {
    return orders
      .map(({ address, status, _id, customerId: { firstname, lastname }, phone }) => {
        return `
          <tr> 
            <td class="border px-3">${_id}</td>
            <td class="border px-3">${firstname} ${lastname}</td>
            <td class="border px-3">${address}</td>
            <td class="border px-3">   
              <form action="/admin/orders/status" method="POST" > 
                <input type="hidden" name="orderId" value=${_id} />
                <select class="form-select" onchange="this.form.submit()" name="status">
                  <option selected disabled>select one</option>  
                  <option value="order_placed" ${status === 'order_placed' ? 'selected' : ''}>Placed</option>
                  <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Confirmed</option> 
                  <option value="prepared" ${status === 'prepared' ? 'selected' : ''}>Prepared</option>
                  <option value="delivered" ${status === 'delivered' ? 'selected' : ''}>Delivered</option>
                  <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
              </form>
            </td>  
            <td class="border px-3">${phone}</td>
            <td class="border px-3">placeno || nije placeno</td>
          </tr>`;
      })
      .join('');
  }

  updateStatus(order) {
    let completed = true;
    let timeBox = document.createElement('div');
    timeBox.classList.add('single-order__time-box');

    steps.map((step) => {
      step.classList.remove('single-order__item--completed');
      step.classList.remove('single-order__item--current');
    });

    steps.map((step) => {
      let data = step.dataset.step;

      completed && step.classList.add('single-order__item--completed');

      if (data === order.status) {
        completed = false;
        timeBox.innerText = order.updatedAt;
        step.appendChild(timeBox);
        step.nextElementSibling && step.nextElementSibling.classList.add('single-order__item--current');
      }
    });
  }
}

// ********************************************************
window.addEventListener('DOMContentLoaded', () => {
  const cart = new Cart();
  const order = new Order();

  // set prev page in localstore
  window.addEventListener('click', () => {
    localStorage.setItem('currentPage', window.location.href);
  });

  // cart click event
  addToCartButton.forEach((btn) => {
    btn.addEventListener('click', () => {
      cart.updateCart(btn.dataset.pizza);
    });
  });

  // if  location is host/admin/orders
  if (window.location.pathname === '/admin/orders') {
    order.adminOrder();
  }

  order.updateStatus(JSON.parse(singleOrder.value));

  // SOCKET IO
  let socket = io();
  let orderID = JSON.parse(singleOrder.value).customerId;

  if (singleOrder) {
    socket.emit('join', `order_${orderID}`);
  }

  socket.on('statusChanged', (data) => {
    const updatedOrder = { ...singleOrder };
    updatedOrder.updatedAt = new Date().toISOString();
    updatedOrder.status = data.status;
    order.updateStatus(updatedOrder);
  });
});
