import DUMMY_PRODUCTS from '../../database/products';
const productList = document.getElementById('productList');

const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const item2 = document.getElementById('prev-item2');
const item1 = document.getElementById('prev-item1');
const id1 = document.getElementById('id1');
const id2 = document.getElementById('id2');
const pageStart = document.getElementById('page-start');
const pageEnd = document.getElementById('page-end');

if (!localStorage.getItem('codeHasRunBefore')) {
  console.log('Mã đã chạy lần đầu tiên');
  const liked = [];
  localStorage.setItem('liked', JSON.stringify(liked));
  const carts = [];
  localStorage.setItem('Carts', JSON.stringify(carts));

  localStorage.setItem('codeHasRunBefore', 'true');
} else {
  console.log('Mã không chạy nữa');
}

const liked = [];
// localStorage.setItem('liked', JSON.stringify(liked))
const cartLocal = JSON.parse(localStorage.getItem('Carts'));
const likeLocal = JSON.parse(localStorage.getItem('liked'));

const carts = [];
// localStorage.setItem('Carts', JSON.stringify(carts))
const navItemCart = document.getElementById('nav-item-cart');
let productsPerPage = 10;
let currentPage = 1;

function displayItem(startIndex, endIndex) {
  productList.innerHTML = '';

  for (let i = startIndex; i < endIndex; i++) {
    if (
      DUMMY_PRODUCTS[i].imgSrc !== undefined &&
      DUMMY_PRODUCTS[i].name !== undefined &&
      DUMMY_PRODUCTS[i].price !== undefined
    ) {
      let colors = DUMMY_PRODUCTS[i].dataColors;
      console.log(colors);
      let productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
                       <div class = "id">${DUMMY_PRODUCTS[i].ID}</div>
                         <div class="imgSrc">
                         <img src="${DUMMY_PRODUCTS[i].imgSrc}">
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
                            <h3>${DUMMY_PRODUCTS[i].name}</h3>
                            <p>Price: ${DUMMY_PRODUCTS[i].price}</p>
                        </div>
                    `;
      productList.appendChild(productItem);
    } else {
      return;
    }
  }
}
displayItem(0, productsPerPage);

const itemHeart = document.createElement('p');
itemHeart.classList.add('item-cart');
itemHeart.innerText = `${cartLocal.length}`;
const overlay = document.getElementById('overlay');

navItemCart.appendChild(itemHeart);

function updateEvent() {
  const productItems = document.querySelectorAll('.product-item');
  for (let i = 0; i < productItems.length; i++) {
    const Element = productItems[i];
    const addCart = Element.querySelector('#add-cart');
    const id = Element.querySelector('.id');

    const like = Element.querySelector('#like');
    const ElementImg = Element.querySelector('img');
    const ElementInfo = Element.querySelector('.overlay-click');
    let checkLike = true;
    ElementInfo.addEventListener('click', () => {
      overlay.style.display = 'flex';
      const overlayImg = overlay.querySelector('#overlay-img');
      const closeToggle = overlay.querySelector('#close-toggler');
      const overlayName = overlay.querySelector('.name');
      const overlayPrice = overlay.querySelector('.price-info');
      const overlayLike = overlay.querySelector('#overlayLike');
      const overlayAddCart = overlay.querySelector('#overlay-add-cart');
      const overlayBuyNow = overlay.querySelector('#overlay-buy-now');
      const boughtOverlay = overlay.querySelector('.bought-overlay');
      const id = Element.querySelector('.id');
      closeToggle.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
      overlayName.innerHTML = `${Element.querySelector('h3').textContent}`;
      overlayImg.src = `${ElementImg.src}`;
      overlayPrice.innerHTML = `${Element.querySelector('p').textContent}`;
      let checkLikeOverlay = true;
      for (let i = 0; i < likeLocal.length; i++) {
        if (likeLocal[i] == id.textContent) {
          checkLikeOverlay = false;
          checkLike = false;
          overlayLike.style.color = 'red';
        }
      }
      overlayLike.addEventListener('click', () => {
        for (let i = 0; i < likeLocal.length; i++) {
          if (likeLocal[i] == id.textContent) {
            checkLikeOverlay = false;
            checkLike = false;
            overlayLike.style.color = 'red';
            likeLocal.splice(i, 1);
          }
        }
        if (checkLikeOverlay) {
          overlayLike.style.color = 'red';
          like.style.color = 'red';
          checkLike = false;
          checkLikeOverlay = !checkLikeOverlay;
          likeLocal.push(id.textContent);
        } else {
          overlayLike.style.color = 'gray';
          like.style.color = 'gray';
          checkLike = true;
          checkLikeOverlay = !checkLikeOverlay;
        }
        const updateLike = [...new Set(likeLocal)];
        localStorage.setItem('liked', JSON.stringify(updateLike));
      });

      overlayBuyNow.addEventListener('click', () => {
        boughtOverlay.style.display = 'flex';
        const boughtClose = boughtOverlay.querySelector('#bought-close-icon');
        boughtClose.addEventListener('click', () => {
          boughtOverlay.style.display = 'none';
        });
        const cartP = boughtOverlay.querySelector('p');
        cartP.innerHTML = 'đang chờ thanh toán';
      });
      overlayAddCart.addEventListener('click', () => {
        carts.push(id.textContent);
        cartLocal.push(id.textContent);
        const itemHeart = document.createElement('p');
        itemHeart.classList.add('item-cart');
        itemHeart.innerText = `${cartLocal.length}`;
        // alert("đã thêm vào giỏ hàng")
        console.log(navItemCart);
        navItemCart.appendChild(itemHeart);
        localStorage.setItem('Carts', JSON.stringify(cartLocal));
        const boughtClose = boughtOverlay.querySelector('#bought-close-icon');
        boughtClose.addEventListener('click', () => {
          boughtOverlay.style.display = 'none';
        });
      });
    });
    for (let i = 0; i < likeLocal.length; i++) {
      if (likeLocal[i] === id.textContent) {
        like.style.color = 'red';
      }
    }

    addCart.addEventListener('click', () => {
      carts.push(id.textContent);
      cartLocal.push(id.textContent);
      const itemHeart = document.createElement('p');
      itemHeart.classList.add('item-cart');
      itemHeart.innerText = `${cartLocal.length}`;
      alert('đã thêm vào giỏ hàng');
      console.log(navItemCart);
      navItemCart.appendChild(itemHeart);
      localStorage.setItem('Carts', JSON.stringify(cartLocal));
    });

    like.addEventListener('click', () => {
      for (let i = 0; i < likeLocal.length; i++) {
        if (likeLocal[i] === id.textContent) {
          checkLike = false;
          like.style.color = 'red';
          likeLocal.splice(i, 1);
        }
      }
      if (checkLike) {
        like.style.color = 'red';
        overlayLike.style.color = 'red';
        checkLike = !checkLike;
        likeLocal.push(id.textContent);
      } else {
        like.style.color = 'gray';
        overlayLike.style.color = 'gray';
        checkLike = !checkLike;
      }
      const updateLike = [...new Set(likeLocal)];
      localStorage.setItem('liked', JSON.stringify(updateLike));
    });
  }
}
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    displayItem(startIndex, endIndex);

    if (currentPage == 1) {
      id1.style.backgroundColor = '#333';
      id1.style.color = 'white';
      id2.style.backgroundColor = 'white';
      id2.style.color = 'black';
      id3.style.backgroundColor = 'white';
      id3.style.color = 'black';
      console.log('current == 1 vi tri 1');
    }
    if (currentPage < 3) {
      if (currentPage == 2) {
        id2.innerText = '2';
        id3.innerText = '3';
        id1.innerText = '1';
        id1.style.backgroundColor = 'white';
        id1.style.color = 'black';
        id2.style.backgroundColor = '#333';
        id2.style.color = 'white';
        id3.style.backgroundColor = 'white';
        id3.style.color = 'black';
        console.log('current == 2');
      }
      if (currentPage == 1) {
        id1.style.backgroundColor = '#333';
        id1.style.color = 'white';
        id2.style.backgroundColor = 'white';
        id2.style.color = 'black';
        id3.style.backgroundColor = 'white';
        id3.style.color = 'black';
        console.log('current == 1');
      }
      if (currentPage == 3) {
        id2.innerText = '2';
        id3.innerText = '3';
        id1.innerText = '1';
        id3.style.backgroundColor = '#333';
        id3.style.color = 'white';
        id1.style.backgroundColor = 'white';
        id1.style.color = 'black';
        id2.style.backgroundColor = 'white';
        id2.style.color = 'black';
        console.log('current == 3');
      }
      item1.style.display = 'none';
      pageStart.style.display = 'none';
    } else {
      id2.style.backgroundColor = '#333';
      id2.style.color = 'white';
      id1.style.backgroundColor = 'white';
      id1.style.color = 'black';
      id3.style.backgroundColor = 'white';
      id3.style.color = 'black';
      id2.innerText = `${currentPage}`;
      id3.innerText = `${currentPage + 1}`;
      id1.innerText = `${currentPage - 1}`;
    }
    if (currentPage == 3) {
      item1.style.display = 'none';
    }
    if (currentPage < 8) {
      item2.style.display = 'block';
      pageEnd.style.display = 'block';
    }
    if (currentPage >= 7) {
      item2.style.display = 'none';
    }
  }

  updateEvent();
});
pageStart.addEventListener('click', () => {
  displayItem(0, productsPerPage);
  pageStart.style.display = 'none';
  pageEnd.style.display = 'block';
  currentPage = 1;
  item1.style.display = 'none';
  item2.style.display = 'block';
  id2.innerText = '2';
  id3.innerText = '3';
  id1.innerText = '1';
  id1.style.backgroundColor = '#333';
  id1.style.color = 'white';
  id2.style.backgroundColor = 'white';
  id2.style.color = 'black';
  id3.style.backgroundColor = 'white';
  id3.style.color = 'black';

  updateEvent();
});
pageEnd.addEventListener('click', () => {
  displayItem(80, 90);
  pageEnd.style.display = 'none';
  pageStart.style.display = 'block';
  item1.style.display = 'block';
  item2.style.display = 'none';
  console.log('clicked');
  currentPage = 9;
  id2.innerText = '8';
  id3.innerText = '9';
  id1.innerText = '7';
  id1.style.backgroundColor = 'white';
  id1.style.color = 'black';
  id2.style.backgroundColor = 'white';
  id2.style.color = 'black';
  id3.style.backgroundColor = '#333';
  id3.style.color = 'white';

  updateEvent();
});
nextPageButton.addEventListener('click', () => {
  const totalPages = Math.ceil(data.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    displayItem(startIndex, endIndex);

    if (currentPage == 9) {
      id3.style.backgroundColor = '#333';
      id3.style.color = 'white';
      id1.style.backgroundColor = 'white';
      id1.style.color = 'black';
      id2.style.backgroundColor = 'white';
      id2.style.color = 'black';
    } else {
      id2.style.backgroundColor = '#333';
      id2.style.color = 'white';
      id1.style.backgroundColor = 'white';
      id1.style.color = 'black';
      id3.style.backgroundColor = 'white';
      id3.style.color = 'black';
      id2.innerText = `${currentPage}`;
      id3.innerText = `${currentPage + 1}`;
      id1.innerText = `${currentPage - 1}`;
    }
    if (currentPage == 3) {
      item1.style.display = 'none';
      pageStart.style.display = 'block';
    }
    if (currentPage > 3 && currentPage < 7) {
      item1.style.display = 'block';
      pageStart.style.display = 'block';
    }
    if (currentPage >= 7) {
      item2.style.display = 'none';
      pageEnd.style.transform = 'translateX(-1100%)';
    }
    if (currentPage >= 8) {
      item2.style.display = 'none';

      pageEnd.style.display = 'none';
    }
    console.log(currentPage);
    console.log('startIndex' + startIndex);
    console.log('endIndex' + endIndex);
  }

  updateEvent();
});

updateEvent();

// for (let i = 0; i < data.length; i++) {
//     if (data[i].name != 'undefined') {

//         let productItem = document.createElement('div');
//         productItem.classList.add('product-item');
//         productItem.innerHTML = `

//                          <div class="imgSrc">
//                          <img src="${data[i].imgSrc}">
//                          <div class="overlay-hover">

//                         <div class="top-button">
//                             <button id="add-cart">
//                             <i class="fa-solid fa-cart-plus"></i>
//                             </button>
//                             <button id="heart-button">
//                                 <i class="fa-regular fa-heart" id="dislike"></i>
//                                 <i class="fa-solid fa-heart" id="like"></i>
//                             </button>
//                         </div>

//                                 <button id="buy-now">
//                                     Mua ngay
//                                 </button>

//                          </div>
//                          </div>
//                         <div class="product-information">
//                              <div class="color-dots">${data[i].dataColors.map(color => `<div class="dot-items" style="background-color: ${color};"></div>`).join('')}</div>
//                             <h3>${data[i].name}</h3>
//                             <p>Price: ${data[i].price}</p>
//                         </div>

//                     `;
//         productList.appendChild(productItem);

//     }
// }

