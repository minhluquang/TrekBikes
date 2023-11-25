const DUMMY_API = JSON.parse(localStorage.getItem('DUMMY_API'))
const cartInfo = document.getElementById('cart-info');
const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
const data = DUMMY_PRODUCTS;


let check = true;
const totalPriceDisplay = document.getElementById('totalPriceId');
let totalPrice = 0;
const totalPriceContainer = document.querySelector('.totalPrice');
const footer = document.getElementById('footer');
const menu = document.querySelector('.menu');
const toast = document.querySelector('.toast');
if (DUMMY_API[0].cart.length <= 0) {
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
    for (let j = 0; j < DUMMY_API[0].cart.length; j++) {

      for (let k = 0; k < DUMMY_API[0].cart[j].product.length; k++) {
        if (data[i].ID === DUMMY_API[0].cart[j].product[k].id && check) {
          const cartItem = document.createElement('tr');
          cartItem.classList.add('info-item-container');

          cartItem.innerHTML = `
                      <td class="img">
                          <img src="${data[i].imgSrc}" alt="${data[i].name}">
                          <p id="id">${data[i].ID}</p>    
                      </td>
                      <td class="name">
                        
                          ${data[i].name}
                      </td>
                      <td class="price">${data[i].price}</td>
                      <td class="quantity">
                          <div class="quantity-item">
                              
                              <span id="quantity">${DUMMY_API[0].cart[j].product[k].quantity}</span>
                            
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
          totalPrice = totalPrice + priceNumber * parseInt(DUMMY_API[0].cart[j].product[k].quantity);
          console.log(priceNumber);
          cartInfo.appendChild(cartItem);
        }


      }
    }
  }
  const priceString = totalPrice.toLocaleString();
  totalPriceDisplay.innerText = priceString + ' ' + 'VND';
}
displayProductItems();

const cancel = document.getElementById('delete');

cancel.addEventListener('click',()=>{
  const inputArray = document.querySelectorAll('input');
  inputArray.forEach((element,index)=>{
    if(element.checked){
      const parrentInput = inputArray[index].parentElement;
      const boxParrentInput = parrentInput.parentElement;
      const blockParrentInput = boxParrentInput.parentElement;
      const cartItem = blockParrentInput.parentElement;
      const id = cartItem.querySelector("#id").textContent
      for (let i = 0; i < DUMMY_API[0].cart.length; i++) {
        for (let j = 0; j < DUMMY_API[0].cart[i].product.length; j++) {
          if( DUMMY_API[0].cart[i].product[j].id === id){
            DUMMY_API[0].cart[i].product.splice(j,1);
          }
        }
        
      }

    }

  })
  localStorage.setItem('DUMMY_API',JSON.stringify(DUMMY_API));
  location.reload();
  console.log(DUMMY_API[0].cart[0].product)

})



