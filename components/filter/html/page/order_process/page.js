const userLocal = JSON.parse(localStorage.getItem('User'));
const cartInfo = document.getElementById('cart-info');
import DUMMY_PRODUCTS from '../../../database/products.js';
const data = DUMMY_PRODUCTS;

let check = true;
const totalPriceDisplay = document.getElementById('totalPriceId');
let totalPrice = 0;
const totalPriceContainer = document.querySelector('.totalPrice');
const footer = document.getElementById('footer');
const menu = document.querySelector('.menu');
const toast = document.querySelector('.toast');
if (userLocal[0].processing.length <= 0) {
  totalPriceContainer.style.display = 'none';
  footer.style.display = 'none';
  menu.style.display = 'none';
  toast.style.display = 'flex';
} else {
  totalPriceContainer.style.display = 'flex';
  footer.style.display = 'flex';
  menu.style.display = 'table';
  toast.style.display = 'none';
}

function displayProductItems() {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < userLocal[0].processing.length; j++) {
      if (data[i].ID === userLocal[0].processing[j].id && check) {
        const cartItem = document.createElement('tr');
        cartItem.classList.add('info-item-container');

        cartItem.innerHTML = `
                    <td class="img">
                        <img src="../../../${data[i].imgSrc}" alt="${data[i].name}">
                        <p id="id">${data[i].ID}</p>    
                    </td>
                    <td class="name">
                       
                        ${data[i].name}
                    </td>
                    <td class="price">${data[i].price}</td>
                    <td class="quantity">
                        <div class="quantity-item">
                            
                            <span id="quantity">${userLocal[0].processing[j].quantity}</span>
                           
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
        totalPrice = totalPrice + priceNumber * parseInt(userLocal[0].processing[j].quantity);
        console.log(priceNumber);
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

let checked = false;
console.log(infoContainer[0]);
infoContainer.forEach((element, index) => {
  const checkbox = element.querySelector('#checkboxId');
  const id = element.querySelector('#id');
  console.log(id);

  const deleteId = document.getElementById('delete');
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      currentSelectProduct.push(id.textContent);
      updateESelect.push(userLocal[0].processing[index]);
      checked = true;
      console.log('true');
    } else {
      for (let i = 0; i < currentSelectProduct.length; i++) {
        if (currentSelectProduct[i] === id.textContent) {
          currentSelectProduct.splice(i, 1);
        }
      }
      checked = false;
    }
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    const checkboxStates = Array.from(checkboxes).map(checkbox => checkbox.checked);

    const allFalse = checkboxStates.every(state => !state);

    if (allFalse) {
      deleteId.style.backgroundColor = '#B5B5B5';
    } else {
      deleteId.style.backgroundColor = '#313131';
    }
  });
  deleteId.addEventListener('click', () => {
    if (checked) {
      const productsToDelete = userLocal[0].processing.filter(product => currentSelectProduct.includes(product.id));

      for (const productToDelete of productsToDelete) {
        const index = userLocal[0].processing.indexOf(productToDelete);
        userLocal[0].processing.splice(index, 1);
      }
      console.log(userLocal[0].processing);

      localStorage.setItem('User', JSON.stringify(userLocal));

      location.reload();
    }
  });
});
window.addEventListener('beforeunload', function (event) {
  userLocal[0].processing = [...new Set(userLocal[0].processing)];
  localStorage.setItem('User', JSON.stringify(userLocal));
});

// function deleteItem() {
//     const infoItems = document.querySelectorAll('.info-item-container');
//     console.log(infoItems);
//     for (let i = 0; i < infoItems.length; i++) {
//         const element = infoItems[i];
//         const deleteBtn = element.querySelector('#delete-cart');
//         const id = element.querySelector('.id');
//         //console.log(deleteBtn)\
//         //console.log(updateCart)
//         deleteBtn.addEventListener('click', () => {
//             cartInfo.removeChild(element);
//             // alert('đã xóa sản phẩm khỏi danh mục giỏ hàng')
//             for (let i = 0; i < userLocal[0].processing.length; i++) {
//                 if (userLocal[0].processing[i] === id.textContent) {
//                     userLocal[0].processing.splice(i, 1);
//                 }
//             }
//             localStorage.setItem('User', JSON.stringify(userLocal))
//         })
//         // const deleteBtn = document.getElementById('delete-cart');
//     }

// }

// deleteItem();
