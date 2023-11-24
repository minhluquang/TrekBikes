const userLocal = JSON.parse(localStorage.getItem('User'));
const cartInfo = document.getElementById('cart-info');
const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
const productList = document.getElementById('productList');

const data = DUMMY_PRODUCTS.filter(item => userLocal.like.includes(item.ID));

console.log(data);

let quantity = 0;
function displayItem() {
  let checkLike = true;
  var index = 0;
  productList.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].imgSrc !== undefined && data[i].name !== undefined && data[i].price !== undefined) {
      let colors = data[i].dataColors;

      let productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
                       <div class = "id">${data[i].ID}</div>
                         <div class="imgSrc">
                         <img src="/${data[i].imgSrc}">
                         <div class="overlay-hover">
                         
                        <div class="top-button">                  
                            <i class="fa-solid fa-cart-plus" id="add-cart"></i>                        
                            <i class="fa-solid fa-heart" id="like"></i>
                        </div>
                        <div class="overlay-click">
                        
                        <a href="../paymentpage/page.html" id="buy-now">
                                Mua ngay
                        </a>
                        
                        </div>

                                
                         </div>
                         </div>
                        <div class="product-information">
                            <div class="color-dots">${colors.map(
                              color => `<div class="dot-items" style="background-color: ${color};"></div>`
                            )}</div>
                            <h3>${data[i].name}</h3>
                            <p>Price: ${data[i].price}</p>
                        </div>
                    `;
      productList.appendChild(productItem);
      checkLike = false;

      const like = productItem.querySelector('#like');
      const addCart = productItem.querySelector('#add-cart');
      const butNow = productItem.querySelector('#buy-now');
      const id = productItem.querySelector('.id');
      like.style.color = 'red';
      like.addEventListener('click', () => {
        userLocal.like.forEach((element, index) => {
          if (element === id.textContent) {
            userLocal.like.splice(index, 1);
          }
        });
        localStorage.setItem('User', JSON.stringify(userLocal));
        location.reload();
      });
      addCart.addEventListener('click', () => {
        for (let i = 0; i < userLocal.cart.length; i++) {
          if (userLocal.cart[i].id === id.textContent) {
            quantity = parseInt(userLocal.cart[i].quantity);
            break;
          }
        }

        quantity = quantity + 1;
        alert('đã thêm vao giỏ hàng');
        var currentTime = new Date();
        var ngay = currentTime.getDate();
        var thang = currentTime.getMonth() + 1;
        var nam = currentTime.getFullYear();
        var gio = currentTime.getHours();
        var phut = currentTime.getMinutes();
        var giay = currentTime.getSeconds();

        const processAt = {
          id: id.textContent,
          time: `${gio}:${phut}:${giay}`,
          date: `${ngay}/${thang}/${nam} `
        };
        const process = {
          id: id.textContent,
          quantity: quantity
        };

        // alert(quantity);
        let found = false;

        if (userLocal.cart.length > 0) {
          for (let i = 0; i < userLocal.cart.length; i++) {
            if (process.id === userLocal.cart[i].id) {
              userLocal.cart[i].quantity = quantity;
              found = true;
              break;
            }
          }
        }
        if (!found) {
          userLocal.cart.push(process);
          quantity = 0;
        }
        userLocal.createCartAt.push(processAt);
        localStorage.setItem('User', JSON.stringify(userLocal));
      });
      butNow.addEventListener('click', () => {
        localStorage.setItem('currentIdbuy', JSON.stringify(id.textContent));
      });
    } else {
      return;
    }
  }
}
displayItem();