const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
const productList = document.getElementById('productList');
const data = DUMMY_PRODUCTS;
console.log(DUMMY_PRODUCTS);

const toastSaveProduct = document.querySelector('.toast-save-product');
const toast = document.querySelectorAll('.toast');
const toastContainer = document.querySelector('.toast-container');
const navItemProcess = document.getElementById('nav-item-process');

const overlayAddCart = document.getElementById('overlay-add-cart');
const overlayid = document.getElementById('overlayid');

const overlayLike = document.getElementById('overlayLike');

const overlayBuyNow = document.getElementById('overlay-buy-now');

const userLocal = JSON.parse(localStorage.getItem('User'));
console.log(userLocal);

if(userLocal.length < 1){
  console.log("khong co user dang nhap!")
}

const navItemCart = document.getElementById('nav-item-cart');
const navItemHeart = document.getElementById('nav-item-heart');
let productsPerPage = 10;
let currentPage = 1;

const clickBuy = () => {
  const id = overlayid.textContent;
  localStorage.setItem('currentIdbuy', JSON.stringify(id));
};
let quantity = 0;

const clickAddCart = () => {
  for (let i = 0; i < userLocal.cart.length; i++) {
    if (userLocal.cart[i].id === overlayid.textContent) {
      quantity = parseInt(userLocal.cart[i].quantity);
      break;
    }
  }

  const process = {
    id: overlayid.textContent,
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
    userLocal[0].cart.push(process);
    quantity = 0;
  }

  // alert("Ngày " + ngay + "/" + thang + "/" + nam + " lúc " + gio + ":" + phut + ":" + giay)
  localStorage.setItem('User', JSON.stringify(userLocal));
  const itemCart = document.createElement('p');
  itemCart.classList.add('item-cart');
  itemCart.innerText = `${userLocal.cart.length}`;
  navItemCart.appendChild(itemCart);
};

overlayAddCart.addEventListener('click', () => {
  clickAddCart();
});
overlayBuyNow.addEventListener('click', () => {
  clickBuy();
});

toast.forEach(e => {
  const exitToast = e.querySelector('.exit');
  exitToast.addEventListener('click', () => {
    toastContainer.style.display = 'none';
    e.style.display = 'none';
  });
});

let checkLikeOverlay = true;

function clickSave(like) {
  const id = overlay.querySelector('#overlayid');
  var index = 0;
  for (let i = 0; i < userLocal.like.length; i++) {
    if (userLocal.like[i] === id.textContent) {
      checkLikeOverlay = false;
      checkLike = false;
      index = i;
      break;
    }
    if (userLocal.like[i] !== id.textContent) {
      checkLike = true;
      checkLikeOverlay = true;
    }
  }
  var like;
  const productItem = document.querySelectorAll('.product-item');
  for (let i = 0; i < productItem.length; i++) {
    let pId = productItem[i].querySelector('.id');
    if (id.textContent === pId.textContent) {
      like = productItem[i].querySelector('#like');
    }
  }
  console.log(like);

  const toastText = toastContainer.querySelector('h3');

  console.log(checkLikeOverlay);
  if (checkLikeOverlay) {
    like.style.color = 'red';
    checkLike = false;
    checkLikeOverlay = !checkLikeOverlay;
    toastContainer.style.display = 'flex';
    toastText.innerText = 'Đã thêm vào danh mục yêu thích';
    toastSaveProduct.style.display = 'flex';
    userLocal.like.push(id.textContent);
    checkLikeOverlay = !checkLikeOverlay;
  } else {
    toastText.innerText = 'Đã xóa khỏi danh mục yêu thích';
    toastContainer.style.display = 'flex';
    toastSaveProduct.style.display = 'flex';
    overlayLike.style.color = 'gray';
    like.style.color = 'gray';
    checkLike = true;
    checkLikeOverlay = !checkLikeOverlay;
    userLocal.like.splice(index, 1);
  }
  const itemHeart = document.createElement('p');
  itemHeart.classList.add('item-heart');
  itemHeart.innerText = `${userLocal.like.length}`;
  navItemHeart.appendChild(itemHeart);
  const updateLike = [...new Set(userLocal.like)];
  userLocal.like = updateLike;
  localStorage.setItem('User', JSON.stringify(userLocal));
}

overlayLike.addEventListener('click', () => {
  clickSave();
});

function displayQuantityCart() {

  if (userLocal[0]?.processing.length) {
    const itemProcess = document.createElement('p');
    itemProcess.classList.add('item-process');
    itemProcess.innerText = `${userLocal.processing.length}`;
    navItemProcess.appendChild(itemProcess);
  }
}
displayQuantityCart();

function displayItem(startIndex, endIndex) {
  productList.innerHTML = '';
  for (let i = startIndex; i < endIndex; i++) {
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
                        
                        <button id="buy-now">
                                Mua ngay
                        </button>
                        
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
    } else {
      return;
    }
  }
}
displayItem(0, productsPerPage);

const itemCart = document.createElement('p');
itemCart.classList.add('item-cart');
itemCart.innerText = `${userLocal.cart.length}`;
navItemCart.appendChild(itemCart);
const overlay = document.getElementById('overlay');

navItemCart.appendChild(itemCart);
const itemHeart = document.createElement('p');
itemHeart.classList.add('item-heart');
itemHeart.innerText = `${userLocal.like.length}`;
navItemHeart.appendChild(itemHeart);

function updateEvent() {
  const productItems = document.querySelectorAll('.product-item');

  for (let i = 0; i < productItems.length; i++) {
    const Element = productItems[i];
    const addCart = Element.querySelector('#add-cart');
    const id = Element.querySelector('.id');
    const colorDots = Element.querySelector('.dot');

    let checkLike = true;

    const like = Element.querySelector('#like');
    const ElementImg = Element.querySelector('img');
    const ElementInfo = Element.querySelector('.overlay-click');

    ElementInfo.addEventListener('click', () => {
      overlay.style.display = 'flex';
      const overlayImg = overlay.querySelector('img');
      console.log(overlayImg);
      const closeToggle = overlay.querySelector('#close-toggler');
      const overlayName = overlay.querySelector('.name');
      const overlayPrice = overlay.querySelector('#overlay-price');

      const id = Element.querySelector('.id');
      const overlayid = overlay.querySelector('#overlayid');
      overlayid.innerHTML = id.textContent;
      closeToggle.addEventListener('click', () => {
        overlay.style.display = 'none';
        toastContainer.style.display = 'none';
      });
      overlayName.innerHTML = `${Element.querySelector('h3').textContent}`;
      overlayImg.src = `${ElementImg.src}`;
      overlayPrice.innerHTML = `${Element.querySelector('p').textContent}`;

      for (let i = 0; i < userLocal.like.length; i++) {
        if (userLocal.like[i] == id.textContent) {
          checkLikeOverlay = false;
          checkLike = false;
        }
      }
    });
    for (let i = 0; i < userLocal.like.length; i++) {
      if (userLocal.like[i] === id.textContent) {
        like.style.color = 'red';
      }
    }
    addCart.addEventListener('click', () => {
      for (let i = 0; i < userLocal.cart.length; i++) {
        if (userLocal.cart[i].id === id.textContent) {
          quantity = parseInt(userLocal.cart[i].quantity);
          break;
        }
      }
      console.log(quantity);
      quantity = quantity + 1;
      alert('đã thêm vao giỏ hàng');

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

      localStorage.setItem('User', JSON.stringify(userLocal));
      const itemCart = document.createElement('p');
      itemCart.classList.add('item-cart');
      itemCart.innerText = `${userLocal.cart.length}`;
      navItemCart.appendChild(itemCart);
    });
    like.addEventListener('click', () => {
      for (let i = 0; i < userLocal.like.length; i++) {
        if (userLocal.like[i] === id.textContent) {
          checkLike = false;
          like.style.color = 'red';
          userLocal.like.splice(i, 1);
        }
      }
      if (checkLike) {
        like.style.color = 'red';

        checkLike = !checkLike;
        userLocal.like.push(id.textContent);
      } else {
        like.style.color = '#A0A0A0';
        overlayLike.style.color = '#A0A0A0';
        checkLike = !checkLike;
      }
      const updateLike = [...new Set(userLocal.like)];

      const itemHeart = document.createElement('p');
      itemHeart.classList.add('item-heart');
      itemHeart.innerText = `${userLocal.like.length}`;
      navItemHeart.appendChild(itemHeart);
      userLocal.like = updateLike;
      console.log(userLocal);
      localStorage.setItem('User', JSON.stringify(userLocal));
    });
  }
}
updateEvent();

var totalPages = Math.ceil(data.length / 10);
const ITEMS_PER_PAGE = 10;
var maxPagesToShow = 5;


function generatePagination() {
  var pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  var prevBtn = document.createElement('a');
  prevBtn.href = 'javascript:void(0);';
  prevBtn.innerHTML = '&laquo;';
  prevBtn.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      generatePagination();
      loadData();
    }
  });
  pagination.appendChild(prevBtn);

  var startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  var endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (var i = startPage; i <= endPage; i++) {
    var pageLink = document.createElement('a');
    pageLink.href = 'javascript:void(0);';
    pageLink.innerHTML = i;

    if (i === currentPage) {
      pageLink.classList.add('active');
    }

    pageLink.addEventListener('click', function () {
      currentPage = parseInt(this.innerHTML);
      generatePagination();
      loadData();
    });

    pagination.appendChild(pageLink);
  }

  // Nút Next
  var nextBtn = document.createElement('a');
  nextBtn.href = 'javascript:void(0);';
  nextBtn.innerHTML = '&raquo;';
  nextBtn.addEventListener('click', function () {
    if (currentPage < totalPages) {
      currentPage++;
      generatePagination();
      loadData();
    }
  });
  pagination.appendChild(nextBtn);
}

function loadData() {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  displayItem(startIndex, endIndex);
  updateEvent();
  console.log('Loading data for page ' + currentPage);
}

generatePagination();

loadData();