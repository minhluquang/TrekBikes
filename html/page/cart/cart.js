const userLocal = JSON.parse(localStorage.getItem('User'));
const cartInfo = document.getElementById('cart-info');
const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
const DUMMY_API = JSON.parse(localStorage.getItem('DUMMY_API'));

const data = DUMMY_PRODUCTS;
const accountData = JSON.parse(localStorage.getItem('accounts'));
function generateRandomId() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var id = '';

  for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}
function getIdUser() {
  return userLocal.id;
}

let check = true;
const totalPriceDisplay = document.getElementById('totalPriceId');
let totalPrice = 0;

const menu = document.getElementById('menu');
const toast = document.getElementById('toast');

if (userLocal.cart.length <= 0) {
  footer.style.display = 'none';
  menu.style.display = 'none';
  toast.style.display = 'flex';
} else {
  footer.style.display = 'flex';
  menu.style.display = 'table';
  toast.display = 'none';
}

function returnPathImg(element) {
  let pathImg = element.imgSrc;
  if (pathImg.startsWith('database')) {
    pathImg = '../../../' + pathImg;
  }
  return pathImg;
}

function displayProductItems() {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < userLocal.cart.length; j++) {
      if (data[i].ID === userLocal.cart[j].id && check) {
        const cartItem = document.createElement('tr');
        cartItem.classList.add('info-item-container');
        cartItem.innerHTML = `
                    <td class="img"><img src="${returnPathImg(data[i])}" alt="${data[i].name}"></td>
                    <td class="name">
                       
                        ${data[i].name}
                    </td>
                    <td class="price">${data[i].price}</td>
                    <td class="quantity">
                        <div class="quantity-item">
                            <button class="decrement" id="decrement">-</button>
                            <span id="quantity">${userLocal.cart[j].quantity}</span>
                            <button class="increment" id="increment">+</button>
                        </div>
                    </td>
                    <td >
                        <div class="checkbox">
                            <p class="id">${data[i].ID}</p>
                            <label class="checkbox-container">
                                <input type="checkbox" id="checkboxId">
                                <span class="checkmark"></span>
                            </label>

                        </div>
                    </td>
                `;

        const priceString = data[i].price;
        const priceNumber = parseFloat(priceString.replace(/\D/g, ''));
        totalPrice = totalPrice + priceNumber * parseInt(userLocal.cart[j].quantity);

        cartInfo.appendChild(cartItem);
      }
    }
  }
  const priceString = totalPrice.toLocaleString();
  totalPriceDisplay.innerText = priceString + ' ' + 'VND';
}

displayProductItems();

const infoContainer = document.querySelectorAll('.info-item-container');
let currentSelectProduct = [];
let updateESelect = [];
const dialog = document.getElementById('dialog');
const container = document.getElementById('container');

const totalPricePay = document.getElementById('totalPricePay');
const confirmButton = document.getElementById('confirmButton');
const database = [];

for (let i = 0; i < userLocal.cart.length; i++) {
  for (let j = 0; j < data.length; j++) {
    if (userLocal.cart[i].id === data[j].ID) {
      database.push(data[j]);
    }
  }
}
let chekcbuy = true;
console.log(userLocal.cart);
let checked = false;
var currentPrice = 0;
infoContainer.forEach((element, index) => {
  const decrement = element.querySelector('#decrement');
  const increment = element.querySelector('#increment');
  const quantityDisplay = element.querySelector('#quantity');
  const checkbox = element.querySelector('#checkboxId');
  const id = element.querySelector('.id');
  const buyId = document.getElementById('buy');
  const price = element.querySelector('.price');

  const selectAllButton = document.getElementById('selectAllButton');

  const deleteId = document.getElementById('delete');
  decrement.addEventListener('click', () => {
    if (parseInt(userLocal.cart[index].quantity) > 0 && userLocal.cart[index].quantity != null) {
      userLocal.cart[index].quantity = parseInt(userLocal.cart[index].quantity) - 1;
      quantityDisplay.innerText = userLocal.cart[index].quantity;
    }
    if (parseInt(userLocal.cart[index].quantity) <= 0) {
      userLocal.cart.splice(index, 1);
      cartInfo.removeChild(element);
      localStorage.setItem('User', JSON.stringify(userLocal));
    }
    const priceFloat = parseFloat(price.textContent.replace(/\D/g, ''));
    const totalPrice = parseFloat(totalPriceDisplay.textContent.replace(/\D/g, ''));

    const currentPrice = totalPrice - priceFloat;
    totalPriceDisplay.innerText = currentPrice.toLocaleString() + ' ' + 'VND';

    localStorage.setItem('User', JSON.stringify(userLocal));
    // alert(id.textContent);
  });

  increment.addEventListener('click', () => {
    userLocal.cart[index].quantity = parseInt(userLocal.cart[index].quantity) + 1;
    quantityDisplay.innerText = userLocal.cart[index].quantity;
    console.log(userLocal.cart[index].quantity);
    localStorage.setItem('User', JSON.stringify(userLocal));
    const priceFloat = parseFloat(price.textContent.replace(/\D/g, ''));
    const totalPrice = parseFloat(totalPriceDisplay.textContent.replace(/\D/g, ''));

    const currentPrice = totalPrice + priceFloat;
    totalPriceDisplay.innerText = currentPrice.toLocaleString() + ' ' + 'VND';

    localStorage.setItem('User', JSON.stringify(userLocal));
    // alert(id.textContent);
  });

  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      currentSelectProduct.push(id.textContent);
      updateESelect.push(userLocal.cart[index]);
      checked = true;
      const priceFloat = parseFloat(price.textContent.replace(/\D/g, ''));
      currentPrice += priceFloat * parseInt(quantityDisplay.textContent);
      console.log(currentPrice);
      totalPriceDisplay.innerText = '0';

      // localStorage.setItem('updateSelect', JSON.stringify(updateESelect));
    } else {
      for (let i = 0; i < currentSelectProduct.length; i++) {
        if (currentSelectProduct[i] === id.textContent) {
          currentSelectProduct.splice(i, 1);
        }
      }
      checked = false;
      totalPriceDisplay.innerText = '0';
      const priceFloat = parseFloat(price.textContent.replace(/\D/g, ''));
      if (currentPrice > 0) {
        currentPrice -= priceFloat * parseInt(quantityDisplay.textContent);
      }
      console.log(currentPrice);
    }
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var totalPrice = 0;
    totalPrice += currentPrice;

    totalPriceDisplay.innerText = totalPrice.toLocaleString() + ' ' + 'VND';

    const checkboxStates = Array.from(checkboxes).map(checkbox => checkbox.checked);

    const allFalse = checkboxStates.every(state => !state);

    if (allFalse) {
      deleteId.style.backgroundColor = '#B5B5B5';
    } else {
      deleteId.style.backgroundColor = '#313131';
    }
  });

  let checkSelect = true;
  let checkBuyAll = false;

  selectAllButton.addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    updateESelect = userLocal.cart;
    if (checkSelect) {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
      });
      checked = true;

      deleteId.style.backgroundColor = '#313131';

      selectAllButton.innerText = 'delete Select All';
      checkSelect = false;
      for (let i = 0; i < userLocal.cart.length; i++) {
        currentSelectProduct.push(userLocal.cart[i].id);
      }
    } else {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      checked = false;

      deleteId.style.backgroundColor = '#B5B5B5';
      selectAllButton.innerText = 'select all';

      checkSelect = true;
      currentSelectProduct = [];
    }
    console.log(currentSelectProduct);
    checkBuyAll = true;
  });

  deleteId.addEventListener('click', () => {
    if (checked) {
      const productsToDelete = userLocal.cart.filter(product => currentSelectProduct.includes(product.id));

      for (const productToDelete of productsToDelete) {
        const index = userLocal.cart.indexOf(productToDelete);
        userLocal.cart.splice(index, 1);
      }

      localStorage.setItem('User', JSON.stringify(userLocal));

      location.reload();
    }
  });

  buyId.addEventListener('click', () => {
    if (checked) {
      var totalPrice = 0;
      var priceString;
      var priceNumber;
      for (let i = 0; i < database.length; i++) {
        for (let j = 0; j < updateESelect.length; j++) {
          if (database[i].ID === updateESelect[j].id) {
            console.log(database[i].price);
            priceString = database[i].price;
            priceNumber = parseFloat(priceString.replace(/\D/g, ''));
            totalPrice = totalPrice + priceNumber * parseInt(updateESelect[j].quantity);
          }
        }
      }
      console.log(updateESelect);
      const idContainer = document.createElement('p');
      idContainer.classList.add('idContainer');
      idContainer.innerText = id.textContent;
      dialog.style.display = 'flex';
      // container.style.display = 'block';
      container.appendChild(idContainer);

      totalPrice = totalPrice.toLocaleString();
      totalPricePay.innerText = 'Tổng số tiền' + ':' + ' ' + totalPrice + 'VND';
    }
  });
  confirmButton.addEventListener('click', function () {
    const customerName = document.getElementById('customername');
    const customerAddress = document.getElementById('customeraddress');
    if (customerName.value === '' && customerName.value === '') {
      return;
    }
    if (chekcbuy && customerName.value !== '' && customerAddress !== '') {
      var currentTime = new Date();

      for (let index = 0; index < updateESelect.length; index++) {
        const element = updateESelect[index];
        const processing = {
          idOrder: generateRandomId(),
          dateCreate: currentTime,
          dateCancel: '',
          product: [
            {
              id: element.id,
              quantity: element.quantity,
              processed: false
            }
          ]
        };
        for (let i = 0; i < DUMMY_API.length; i++) {
          if (DUMMY_API[i].idUser === getIdUser()) {
            DUMMY_API[i].cart.push(processing);
          }
        }

        // DUMMY_API[0].cart.push(processing);
      }
      console.log(userLocal.cart);
      console.log(updateESelect);
      if (checkBuyAll) {
        userLocal.cart = [];
        checkBuyAll = false;
      }
      for (let k = 0; k < updateESelect.length; k++) {
        for (let j = 0; j < userLocal.cart.length; j++) {
          if (userLocal.cart[j].id === updateESelect[k].id) {
            userLocal.cart.splice(j, 1);
          }
        }
      }
      for (let i = 0; i < accountData.length; i++) {
        if (accountData[i].id === userLocal.id) {
          accountData[i].cart = userLocal.cart;
        }
      }

      localStorage.setItem('User', JSON.stringify(userLocal));
      localStorage.setItem('accounts', JSON.stringify(accountData));
      console.log(DUMMY_API);
      localStorage.setItem('DUMMY_API', JSON.stringify(DUMMY_API));

      chekcbuy = false;
      return;
    }
    location.reload();
  });
});
window.addEventListener('beforeunload', function (event) {
  userLocal.processing = [...new Set(userLocal.processing)];
  localStorage.setItem('User', JSON.stringify(userLocal));
});

const input = document.getElementById('input');

const searchValue = document.getElementById('searchValue');
const submitBtn = document.getElementById('submit-btn');
const inputSearch = JSON.parse(localStorage.getItem('inputSearch'));
// input.addEventListener('input', event => {
//   event.preventDefault();
//   if (input.value.length < 0 || input.value === '') {
//     searchValue.style.display = 'none';
//   } else {
//     searchValue.style.display = 'block';
//     const inputValue = input.value.toLowerCase();

//     inputSearch[0] = inputValue;
//     localStorage.setItem('inputSearch', JSON.stringify(inputSearch));
//     const matchingNames = database.filter(e => e.name.toLowerCase().includes(inputValue));
//     if (event.key === 'enter') {
//       alert('tên sản phẩm');
//     }
//     if (inputValue === '') {
//       searchValue.innerHTML = '';
//       searchValue.style.border = 'none';
//       return;
//     }
//     searchValue.innerHTML = '';
//     matchingNames.forEach(e => {
//       const searchInfoValue = document.createElement('div');
//       searchInfoValue.classList.add('searchItem');
//       searchInfoValue.innerHTML = `
//                  <img src="/${e.imgSrc}">
//                 <p>${e.name}</p>
//             `;
//       searchValue.appendChild(searchInfoValue);
//       searchValue.style.border = '1px solid gray';
//     });
//   }
// });

const table = document.getElementById('order_status_table');
const allTh = table.querySelectorAll('th');
allTh.forEach((e, index) => {
  e.addEventListener('click', () => {
    if (index == 0) {
      location.reload();
    }
    if (index == 1) {
      console.log('panding');
      cartInfo.innerHTML = '';
      handlePanding();
    }
    if (index == 2) {
      console.log('onDeliverery');
      cartInfo.innerHTML = '';
      handleOnDelivery();
    }
    allTh.forEach(e => (e.style.backgroundColor = '#eee'));
    e.style.backgroundColor = '#45a049';
    e.style.color = '#333';
  });
});

function handleOnDelivery() {
  const cartInfo = document.getElementById('cart-info');
  var tmp = 0;
  for (let i = 0; i < DUMMY_API.length; i++) {
    if (DUMMY_API[i].idUser === getIdUser()) {
      tmp = i;
    }
  }
  let check = false;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < DUMMY_API[tmp].cart.length; j++) {
      for (let k = 0; k < DUMMY_API[tmp].cart[j].product.length; k++) {
        if (DUMMY_API[tmp].cart[j].product[k].processed === true) {
          check = true;
        }
      }
    }
  }
  if (check) {
    footer.style.display = 'none';
    menu.style.display = 'table';
    toast.style.display = 'none';
  } else {
    footer.style.display = 'none';
    menu.style.display = 'none';
    toast.style.display = 'flex';
  }
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < DUMMY_API[tmp].cart.length; j++) {
      for (let k = 0; k < DUMMY_API[tmp].cart[j].product.length; k++) {
        if (data[i].ID === DUMMY_API[tmp].cart[j].product[k].id && check) {
          const cartItem = document.createElement('tr');

          if (DUMMY_API[tmp].cart[j].product[k].processed === true) {
            cartItem.classList.add('info-item-container');

            cartItem.innerHTML = `
                          <td class="img"><img src="${returnPathImg(data[i])}" alt="${data[i].name}"></td>
                          <td class="name">
                             
                              ${data[i].name}
                          </td>
                          <td class="price">${data[i].price}</td>
                          <td class="quantity">
                              <div class="quantity-item">
                                  
                                  <span id="quantity">${DUMMY_API[tmp].cart[j].product[k].quantity}</span>
                                 
                              </div>
                          </td>
                          <td >
                              <div class="checkbox">
                                  <p class="id">${data[i].ID}</p>
                                  
      
                              </div>
                          </td>
                      `;

            cartInfo.appendChild(cartItem);
            console.log(cartInfo);
          }
        }
      }
    }
  }
}

function handlePanding() {
  var tmp = 0;
  for (let i = 0; i < DUMMY_API.length; i++) {
    if (DUMMY_API[i].idUser === getIdUser()) {
      tmp = i;
      console.log(i);
    }
  }
  const cartInfo = document.getElementById('cart-info');
  // console.log(tmp)
  if (DUMMY_API[tmp].cart.length > 0) {
    footer.style.display = 'none';
    menu.style.display = 'table';
    toast.style.display = 'none';
  } else {
    footer.style.display = 'none';
    menu.style.display = 'none';
    toast.style.display = 'flex';
  }
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < DUMMY_API[tmp].cart.length; j++) {
      for (let k = 0; k < DUMMY_API[tmp].cart[j].product.length; k++) {
        if (data[i].ID === DUMMY_API[tmp].cart[j].product[k].id && check) {
          const cartItem = document.createElement('tr');

          if (DUMMY_API[tmp].cart[j].product[k].processed === false) {
            cartItem.classList.add('info-item-container');

            cartItem.innerHTML = `
                          <td class="img"><img src="${returnPathImg(data[i])}" alt="${data[i].name}"></td>
                          <td class="name">
                             
                              ${data[i].name}
                          </td>
                          <td class="price">${data[i].price}</td>
                          <td class="quantity">
                              <div class="quantity-item">
                                  
                                  <span id="quantity">${DUMMY_API[tmp].cart[j].product[k].quantity}</span>
                                 
                              </div>
                          </td>
                          <td >
                              <div class="checkbox">
                                  <p class="id">${data[i].ID}</p>
                                  <label class="checkbox-container">
                                      <button id="cancelPanding"> Hủy đơn </button>
                                  </label>
      
                              </div>
                          </td>
                      `;

            cartInfo.appendChild(cartItem);
            console.log(cartInfo);
            const cancelOrder = cartItem.querySelector('#cancelPanding');
            console.log(cancelOrder);
            cancelOrder.addEventListener('click', () => {
              DUMMY_API[tmp].cart.splice(j, 1);
              localStorage.setItem('DUMMY_API', JSON.stringify(DUMMY_API));
              location.reload();
            });
          }
        }
      }
    }
  }
}
