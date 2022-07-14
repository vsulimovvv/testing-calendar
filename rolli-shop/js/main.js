function calcCartPrice() {
  const cartItems = document.querySelectorAll('.cart-item');
  const toalPriceEl = document.querySelector('.total-price');
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const amountEl = item.querySelector('[data-counter]');
    const priceEl = item.querySelector('.price__currency');

    const currentPrice =
      parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
    totalPrice += currentPrice;
    
    toalPriceEl.innerText = totalPrice;
  });
}

function toggleCartStatus() {
  const cartWrapper = document.querySelector('.cart-wrapper');
  const cartEmptyBadge = document.querySelector('[data-cart-empty]');
  const cartOrderForm = document.querySelector('#order-form');
  const cartTotal = document.querySelector('.cart-total');

  if (cartWrapper.children.length > 0) {
    cartEmptyBadge.style.display = 'none';
    cartTotal.style.display = 'block';
    cartOrderForm.style.display = 'block';
  } else {
    cartEmptyBadge.style.display = 'block';
    cartTotal.style.display = 'none';
    cartOrderForm.style.display = 'none';
  }
}

window.addEventListener('click', (e) => {
  let counter;

  if (
    e.target.dataset.action === 'minus' ||
    e.target.dataset.action === 'plus'
  ) {
    const counterWrapper = e.target.closest('.counter-wrapper');
    counter = counterWrapper.querySelector('[data-counter]');
  }

  if (e.target.dataset.action === 'plus') {
    counter.innerText = ++counter.innerText;
  }

  if (e.target.dataset.action === 'minus') {
    // * Проверка на товар, который находится в корзине

    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    } else if (
      e.target.closest('.cart-wrapper') &&
      parseInt(counter.innerText) === 1
    ) {
      e.target.closest('.cart-item').remove();

      // * Отоброжение корзины (пустая или нет)
      toggleCartStatus();

      // * Подсчет общей стоимости
      calcCartPrice();
    }
  }

  // * Проверка на + или - внутри корзины
  if (
    e.target.hasAttribute('data-action') &&
    e.target.closest('.cart-wrapper')
  ) {
    // * Подсчет общей стоимости
    calcCartPrice();
  }
});

// * Cart
const cartWrapper = document.querySelector('.cart-wrapper');

window.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-cart')) {
    const card = e.target.closest('.card');

    // * Собираем данные карточки
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector('.product-img').getAttribute('src'),
      title: card.querySelector('.item-title').innerText,
      itemsInBox: card.querySelector('[data-items-in-box]').innerText,
      wight: card.querySelector('.price__weight').innerText,
      price: card.querySelector('.price__currency').innerText,
      counter: card.querySelector('[data-counter]').innerText,
    };

    // * Проверка на уникальность товара
    const itemInCart = cartWrapper.querySelector(
      `[data-id="${productInfo.id}"]`
    );

    if (itemInCart) {
      const counterEl = itemInCart.querySelector('[data-counter]');
      counterEl.innerText =
        parseInt(counterEl.innerText) + parseInt(productInfo.counter);
    } else {
      const cartItemHtml = `
      <div class="cart-item" data-id="${productInfo.id}">
        <div class="cart-item__top">
          <div class="cart-item__img">
            <img src="${productInfo.imgSrc}" alt="${productInfo.title}" />
          </div>
          <div class="cart-item__desc">
            <div class="cart-item__title">${productInfo.title}</div>
            <div class="cart-item__weight">${productInfo.itemsInBox}. / ${productInfo.wight}.</div>
            <div class="cart-item__details">
              <div class="items items--small counter-wrapper">
                <div class="items__control" data-action="minus">
                  -
                </div>
                <div class="items__current" data-counter="">${productInfo.counter}</div>
                <div class="items__control" data-action="plus">+</div>
              </div>

              <div class="price">
                <div class="price__currency">${productInfo.price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;

      cartWrapper.insertAdjacentHTML('beforeend', cartItemHtml);
    }

    // * Сброс счетчика на 1
    card.querySelector('[data-counter]').innerText = '1';

    // * Отоброжение корзины (пустая или нет)
    toggleCartStatus();

    // * Подсчет общей стоимости
    calcCartPrice();
  }
});
