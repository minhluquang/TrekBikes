import DUMMY_PRODUCTS from '../../database/products.js';

let productsFromLocal = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));

if (!productsFromLocal) {
  localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(DUMMY_PRODUCTS));
  productsFromLocal = DUMMY_PRODUCTS;
}

const resultSearch = document.querySelector('.search__result');
const inputSearch = document.querySelector('.header__bottom--extention-search input');

inputSearch.addEventListener('input', e => {
  resultSearch.innerHTML = ``;

  if (e.target.value === '') {
    return;
  }

  productsFromLocal.forEach(item => {
    const itemName = item.name.toLowerCase();
    const inputValue = e.target.value.toLowerCase();

    console.log(item);

    if (itemName.includes(inputValue)) {
      const html = `
        <div class="header__bottom--result__item">
          <img src="${item.imgSrc}" alt="${item.name}" />
          <div class="header__bottom--result__item--content">
            <div class="result__item--price">
              <h2>${item.name}</h2>
              <p>${item.price}</p>
            </div>
          </div>
        </div>
      `;

      resultSearch.insertAdjacentHTML('afterbegin', html);
    }
  });
});

inputSearch.addEventListener('keyup', e => {
  if (e.key == 'Enter') {
    inputSearch.value = '';
  }
});
