const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
const data = DUMMY_PRODUCTS;
const navbarToggle = document.getElementById('navbar-toggler');
const navDropdown = document.getElementById('nav-dropdown');
const userLocal = JSON.parse(localStorage.getItem('User'));
const input = document.getElementById('input');
const statusSearch = document.getElementById('statusSearch');
const DUMMY_API = JSON.parse(localStorage.getItem('DUMMY_API'));
const accountData = JSON.parse(localStorage.getItem('accounts'));

if (!localStorage.getItem('inputSearchCheck')) {
  console.log('Mã đã chạy lần đầu tiên');
  const inputSearch = [];
  localStorage.setItem('inputSearch', JSON.stringify(inputSearch));

  localStorage.setItem('inputSearchCheck', 'true');
} else {
  // console.log('Mã không chạy nữa');
}
const searchValue = document.getElementById('searchValue');
const submitBtn = document.getElementById('submit-btn');
let check = false;
const database = data;
const productList = document.getElementById('productList');
const inputSearch = JSON.parse(localStorage.getItem('inputSearch'));
const paging = document.getElementById('pagination');
const returnPage = document.getElementById('return-to-page');
const overlay = document.getElementById('overlay');

function returnPathImg(element) {
  let pathImg = element.imgSrc;
  if (pathImg.startsWith('\\data:')) {
    pathImg = pathImg.split('\\')[1].trim();
  } else if (pathImg.startsWith('database')) {
    pathImg = '/' + pathImg;
  }
  return pathImg;
}

function displayItem(startIndex, endIndex, data) {
  productList.innerHTML = '';

  for (let i = startIndex; i < endIndex; i++) {
    if (data[i].imgSrc !== undefined && data[i].name !== undefined && data[i].price !== undefined) {
      let colors = data[i].dataColors;
      let productItem = document.createElement('div');
      productItem.classList.add('product-item');

      productItem.innerHTML = `
                       <div class = "id">${data[i].ID}</div>
                         <div class="imgSrc">
                         <img src="${returnPathImg(data[i])}">
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
      const addCart = productItem.querySelector('#add-cart');

      const overlayClick = productItem.querySelector('.overlay-click');
      console.log(data);


      overlayClick.addEventListener('click', () => {
        overlay.style.display = 'flex';
        const overlayImg = overlay.querySelector('img');

        const closeToggle = overlay.querySelector('#close-toggler');
        const overlayName = overlay.querySelector('.name');


        const overlayid = overlay.querySelector('#overlayid');
        overlayid.innerHTML = data[i].ID;
        closeToggle.addEventListener('click', () => {
          overlay.style.display = 'none';
          toastContainer.style.display = 'none';
        });
        overlayName.innerHTML = data[i].name;
        overlayImg.src = `${returnPathImg(data[i])}`;
        overlayPrice.innerHTML = data[i].price;



        toast.forEach(e => {
          const exitToast = e.querySelector('.exit');
          exitToast.addEventListener('click', () => {
            toastContainer.style.display = 'none';
            e.style.display = 'none';
          });
        });
      });

      addCart.addEventListener('click', () => {
        for (let i = 0; i < userLocal.cart.length; i++) {
          if (userLocal.cart[i].id === e.ID) {
            quantity = parseInt(userLocal.cart[i].quantity);
            break;
          }
        }
        quantity = quantity + 1;
        alert('Đã thêm vào giỏ hàng!');

        const process = {
          id: e.ID,
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

    } else {
      return;
    }
  }
}

navbarToggle.addEventListener('click', () => {
  if (!check) {
    navDropdown.style.display = 'block';
    navbarToggle.style.transform = 'rotate(180deg)';
    // navbarToggle.appendChild(closeIcon);
  } else {
    navDropdown.style.display = 'none';
    navbarToggle.style.transform = 'rotate(0deg)';
  }
  check = !check;
});

const overlayPrice = overlay.querySelector('#overlay-price');
const overlayClose = overlay.querySelector('#close-toggler');

const overlayAddCart = overlay.querySelector('#overlay-add-cart');

const toastAddCart = document.querySelector('.toast-add-cart');
const toastSaveProduct = document.querySelector('.toast-save-product');
const toast = document.querySelectorAll('.toast');
const toastContainer = document.querySelector('.toast-container');
const overlayid = document.getElementById('overlayid');
// const navItemHeart = document.getElementById('nav-item-heart');

input.addEventListener('input', event => {
  event.preventDefault();
  if (input.value.length < 0 || input.value === '') {
    searchValue.style.display = 'none';
  } else {
    searchValue.style.display = 'block';
    const inputValue = input.value.toLowerCase();

    inputSearch[0] = inputValue;
    localStorage.setItem('inputSearch', JSON.stringify(inputSearch));
    const matchingNames = database.filter(e => e.name.toLowerCase().includes(inputValue));
    if (event.key === 'enter') {
      alert('tên sản phẩm');
    }

    if (inputValue === '') {
      searchValue.innerHTML = '';
      searchValue.style.border = 'none';
      return;
    }

    searchValue.innerHTML = '';
    matchingNames.forEach(e => {
      const searchInfoValue = document.createElement('div');
      searchInfoValue.classList.add('searchItem');
      searchInfoValue.innerHTML = `
                <span id="id">${e.ID}</span>
                 <img src="${returnPathImg(e)}">
                <p>${e.name}</p>
                <p>${e.price}</p>
            `;

      searchValue.appendChild(searchInfoValue);
      searchValue.style.border = '1px solid gray';
      const id = searchInfoValue.querySelector('#id');
      const overlayid = overlay.querySelector('#overlayid');
      const overlayImg = overlay.querySelector('img');

      const closeToggle = overlay.querySelector('#close-toggler');
      const overlayName = overlay.querySelector('.name');
      const overlayPrice = overlay.querySelector('#overlay-price');
      const ElementImg = document.querySelector('img');
      const ElementInfo = document.querySelector('.overlay-click');

      searchInfoValue.addEventListener('click', () => {
        overlay.style.display = 'flex';
        searchValue.style.display = 'none';
        overlayName.innerText = data.name;
        overlayImg.src = `${returnPathImg(e)}`;
        overlayPrice.innerText = e.price;
        overlayid.innerHTML = id.textContent;
        console.log(overlayid);
        overlayClose.addEventListener('click', () => {
          overlay.style.display = 'none';
        });

        toast.forEach(e => {
          const exitToast = e.querySelector('.exit');
          exitToast.addEventListener('click', () => {
            toastContainer.style.display = 'none';
            e.style.display = 'none';
          });
        });
      });
    });
  }
});
const navItemCart = document.getElementById('nav-item-cart');

let quantity = parseInt(document.getElementById('quantity'));
const clickAddCart = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem('User'));
  // Nếu chưa đăng nhập thì không cho mua sản phẩm
  if (!isLoggedIn) {
    // Ẩn đi modal vừa bật
    overlay.style.display = 'none';
    toastContainer.style.display = 'none';
    return;
  }

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
    userLocal.cart.push(process);
    quantity = 1;
  }

  // alert("Ngày " + ngay + "/" + thang + "/" + nam + " lúc " + gio + ":" + phut + ":" + giay)
  for (let i = 0; i < accountData.length; i++) {
    if (accountData[i].id === userLocal.id) {
      accountData[i].cart = userLocal.cart;
    }
  }
  localStorage.setItem('User', JSON.stringify(userLocal));
  localStorage.setItem('accounts', JSON.stringify(accountData));
  const itemCart = document.createElement('p');
  itemCart.classList.add('item-cart');
  itemCart.innerText = `${userLocal.cart.length}`;
  navItemCart.appendChild(itemCart);
};

// overlayAddCart.addEventListener('click', () => {
//   clickAddCart();
// });

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const matchingProduct = database.filter(e => e.name.toLowerCase().includes(inputSearch[0].trim().toLowerCase()));
  // console.log(matchingProduct)
  productList.innerHTML = '';
  input.innerHTML = '';

  input.value = '';
  searchValue.innerHTML = '';
  searchValue.style.border = 'none';

  if (inputSearch[0].trim() === '') {
    alert('Không tìm thấy sản phẩm ');
    generatePagination(data);
    loadData(data);
    paging.style.display = 'flex';
  } else {
    if (matchingProduct.length > 0) {

     generatePagination(matchingProduct);
     loadData(matchingProduct);
    } else {
      statusSearch.innerText = 'Không tìm thấy sản phẩm';
      alert('Không tìm thấy sản phẩm ');
      generatePagination(data)
      loadData(data)
      document.location.reload();
      paging.style.display = 'flex';
      returnPage.style.display = 'none';
    }
  }
});
returnPage.addEventListener('click', () => {
  document.location.reload();
});

// window.addEventListener('popstate', (event) => {
//     alert('Quay lại trang');
// });

// input.addEventListener('keydown', (event) => {

//     const inputValue = input.value.toLowerCase();
//     const matchingProduct = database.filter(e => e.name.toLowerCase().includes(inputValue));
//     if (event.key === 'Enter') {

//         if (matchingProduct) {
//             matchingProduct.forEach(e => {
//                 let colors = e.dataColors;
//                 console.log(colors);
//                 let productItem = document.createElement('div');
//                 productItem.classList.add('product-item');
//                 productItem.innerHTML = `
//                        <div class = "id">${e.ID}</div>
//                          <div class="imgSrc">
//                          <img src="${e.imgSrc}">
//                          <div class="overlay-hover">

//                         <div class="top-button">
//                             <i class="fa-solid fa-cart-plus" id="add-cart"></i>
//                             <i class="fa-solid fa-heart" id="like"></i>
//                         </div>
//                         <div class="overlay-click">

//                         <button id="buy-now">
//                                 Mua ngay
//                         </button>

//                         </div>

//                          </div>
//                          </div>
//                         <div class="product-information">
//                              <div class="color-dots">${colors.map(color => `<div class="dot-items" style="background-color: ${color};"></div>`)}</div>
//                             <h3>${e.name}</h3>
//                             <p>Price: ${e.price}</p>
//                         </div>

//                     `;
//                 productList.appendChild(productItem);
//             })
//         } else {
//             alert('Không tìm thấy sản phẩm có tên: ' + inputValue);
//         }
//         input.value = '';
//         event.preventDefault();
//     }
// });

var totalPages = Math.ceil(data.length / 10);
const ITEMS_PER_PAGE = 10;
var maxPagesToShow = 5;
var currentPage = 1;

function generatePagination(data) {
  var pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  var prevBtn = document.createElement('a');
  prevBtn.href = 'javascript:void(0);';
  prevBtn.innerHTML = '&laquo;';
  prevBtn.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      generatePagination(data);
      loadData(data);
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
      generatePagination(data);
      loadData(data);
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
      generatePagination(data);
      loadData(data);
    }
  });
  pagination.appendChild(nextBtn);
}

function loadData(data) {
  var startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  var endIndex = startIndex + ITEMS_PER_PAGE;
  totalPages = Math.ceil(data.length / 10);
  generatePagination(data);

  // console.log(startIndex);
  // console.log(endIndex);
  if (endIndex > data.length) {
    endIndex = data.length;
  }
  displayItem(startIndex, endIndex, data);
  // updateEvent();
}


window.addEventListener('resize', () => {
  check = false;
  navDropdown.style.display = 'none';
});
