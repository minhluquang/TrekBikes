const filterIcon = document.querySelector('.filterIcon');
const filter_container = document.getElementById('filter');
const product_container = document.getElementById('product');
const dashBoardClose = document.getElementById('dash-board-icon-close');
const dashBoard = document.getElementById('dash-board');
const productList = document.getElementById('productList');
const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
const data = DUMMY_PRODUCTS;

const overlay = document.getElementById('overlay');
const userLocal = JSON.parse(localStorage.getItem('User'));

const toast = document.querySelectorAll('.toast');
const toastContainer = document.querySelector('.toast-container');
const toastAddCart = document.querySelector('.toast-add-cart');
// localStorage.setItem('Carts', JSON.stringify(carts))
const navItemCart = document.getElementById('nav-item-cart');
const statusSearch = document.getElementById('statusSearch');
const paging = document.getElementById('pagination');
const overlayLike = document.getElementById('overlayLike');
const navItemHeart = document.getElementById('nav-item-heart');
const selectButton = document.querySelectorAll('#selectButton');

function displayFilter() {
  if (window.innerWidth > 1000) {
    filterIcon.addEventListener('click', function () {
      if (filterIcon.classList.contains('open')) {
        filterIcon.classList.remove('open');
        filter_container.style.display = 'none';
        product_container.style.width = '100%';
      } else {
        filterIcon.classList.add('open');
        filter_container.style.display = 'block';
        product_container.style.width = '80%';
      }
    });
  } else {
    filter_container.style.display = 'none';
    filterIcon.addEventListener('click', () => {
      dashBoard.classList.toggle('show');
      console.log('filter container');
    });
    dashBoardClose.addEventListener('click', () => {
      dashBoard.classList.toggle('show');
    });
  }
}
displayFilter();

let quantity = 0;
function clickAddCart(id) {
  for (let i = 0; i < userLocal.cart.length; i++) {
    if (userLocal.cart[i].id === id.textContent) {
      quantity = parseInt(userLocal.cart[i].quantity);
      break;
    }
  }
  quantity = quantity + 1;
  toastContainer.style.display = 'flex';
  toastAddCart.style.display = 'flex';
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
    quantity = 1;
  }
  userLocal.createCartAt.push(processAt);
  // alert("Ngày " + ngay + "/" + thang + "/" + nam + " lúc " + gio + ":" + phut + ":" + giay)
  localStorage.setItem('User', JSON.stringify(userLocal));
  const itemCart = document.createElement('p');
  itemCart.classList.add('item-cart');
  itemCart.innerText = `${userLocal.cart.length}`;
  navItemCart.appendChild(itemCart);
}

function handleBtnClick(productItem) {
  const id = productItem.querySelector('.id');
  const addCart = productItem.querySelector('#add-cart');

  addCart.addEventListener('click', () => {
    console.log(id.textContent);
    clickAddCart(id);
  });
}

function handleOverlayProduct(productItem) {
  const clickProduct = productItem.querySelector('.overlay-click');
  const img = productItem.querySelector('img');
  const id = productItem.querySelector('.id');
  const name = productItem.querySelector('h3');
  const price = productItem.querySelector('p');

  const overlayClose = overlay.querySelector('#close-toggler');
  const overlayImg = overlay.querySelector('img');
  const overlayName = overlay.querySelector('.name');
  const overlayPrice = overlay.querySelector('#overlay-price');
  const overlayId = overlay.querySelector('#overlayid');

  toast.forEach(e => {
    const exitToast = e.querySelector('.exit');
    exitToast.addEventListener('click', () => {
      toastContainer.style.display = 'none';
      e.style.display = 'none';
    });
  });
  clickProduct.addEventListener('click', () => {
    overlayImg.src = img.src;
    overlayName.innerText = name.textContent;
    overlayPrice.innerText = price.textContent;
    overlayId.innerText = id.textContent;

    overlay.style.display = 'flex';
  });
  overlayClose.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}

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
      let checkLike = true;
      let productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
                       <div class = "id">${data[i].ID}</div>
                         <div class="imgSrc">
                         <img src="${returnPathImg(data[i])}">
                         <div class="overlay-hover">
                         
                        <div class="top-button">                  
                            <i class="fa-solid fa-cart-plus" id="add-cart"></i>                        
                        </div>
                        <div class="overlay-click">
                        
                        <button id="buy-now">
                                Mua ngay
                        </button>
                        
                        </div>

                                
                         </div>
                         </div>
                        <div class="product-information">
                            <h3>${data[i].name}</h3>
                            <p>Price: ${data[i].price}</p>
                        </div>
                    `;
      productList.appendChild(productItem);
      handleOverlayProduct(productItem);
      const id = productItem.querySelector('.id');
      const like = productItem.querySelector('#like');
      handleBtnClick(productItem);
    } else {
      return;
    }
  }
}

window.addEventListener('resize', () => {
  document.location.reload();
});

const dropdownButton = document.querySelectorAll('.dropdown-button');

dropdownButton.forEach(e => {
  e.addEventListener('click', () => {
    const dropdownMenu = e.parentElement.querySelector('.dropdown-menu');
    if (dropdownMenu.style.display === 'flex') {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'flex';
    }
    console.log(e);
  });
});



selectButton.forEach(e => {
  e.addEventListener('click', () => {
    const minInput = e.parentElement.querySelector('#minInput');
    const maxInput = e.parentElement.querySelector('#maxInput');

    minInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });

    maxInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });

    const minPrice = parseInt(minInput.value);
    const maxPrice = parseInt(maxInput.value);
    const filteredProducts = data.filter(product => {
      const price = parseInt(product.price.replace(/\D/g, '')); // Lấy giá và bỏ đi ký tự không phải là số
      return price >= minPrice && price <= maxPrice;
    });
    if (filteredProducts.length > 0) {
      generatePagination(filteredProducts);
      loadData(filteredProducts);
      statusSearch.innerText = 'Các sản phẩm tìm thấy';
    } else {
      statusSearch.innerText = 'Không tìm thấy sản phẩm';
      productList.innerHTML = '';
    }
  });
});






function filteredProducts() {
  const dropdownMenu = document.getElementById('dropdown-menu');
  const confirmButton = document.getElementById('filter-confirm-button');
  const types = document.getElementById('types');

  // let price = '';  
  dropdownMenu.querySelectorAll('input').forEach(element => {
    element.addEventListener('click', () => {
      dropdownMenu.querySelectorAll('input').forEach(otherElement => {
        if (otherElement !== element) {
          otherElement.checked = false
        }
      })
    })
  })
  types.querySelectorAll('input').forEach(element => {
    element.addEventListener('click', () => {
      types.querySelectorAll('input').forEach(otherElement => {
        if (otherElement !== element) {
          otherElement.checked = false
        }
      })
    })
  })

}
filteredProducts();


document.getElementById('filter-confirm-button').addEventListener('click', function () {
  const types = document.getElementById('types');
  const dropdownMenu = document.getElementById('dropdown-menu');

  let checkedTypes = false;
  let checkedPrices = false;

  types.querySelectorAll('input').forEach(element => {
    if (element.checked) {
      checkedTypes = true;
    }
  });

  dropdownMenu.querySelectorAll('input').forEach(element => {
    if (element.checked) {
      checkedPrices = true;
    }
  });

  if (checkedTypes || checkedPrices) {
    var selectedPrices;
    var selectedTypes;
    var foundTypes = [];
    var foundPrices = [];
    var totalFound = [];

    document.getElementById('dropdown-menu').querySelectorAll('input:checked').forEach(function (checkbox) {
      selectedPrices = checkbox.parentElement.textContent.trim();
    });

    document.querySelectorAll('#type-item input:checked').forEach(function (checkbox) {
      selectedTypes = checkbox.parentElement.textContent.trim();
    });

    if (selectedTypes) {
      foundTypes = data.filter(product => product.type === selectedTypes.toLowerCase());
    }
    if (selectedPrices) {
      if (selectedPrices === '10tr - 50tr') {
        foundPrices = data.filter(product => {
          const price = parseInt(product.price.replace(/[^\d]/g, ''));
          return price >= 10000000 && price <= 50000000
        })
      }
      if (selectedPrices === '50tr - 100tr') {
        foundPrices = data.filter(product => {
          const price = parseInt(product.price.replace(/[^\d]/g, ''));
          return price >= 50000000 && price <= 100000000
        })
      }
      if (selectedPrices === '100tr - 300tr') {
        foundPrices = data.filter(product => {
          const price = parseInt(product.price.replace(/[^\d]/g));
          return price >= 100000000 && price <= 300000000
        })
      }
    }
    totalFound = [...new Set([...foundPrices, ...foundTypes])];
    generatePagination(totalFound)
    loadData(totalFound);

    console.log('FoundPrice: ', totalFound);
  } else {
    alert('No type or price selected.');
  }
});







var totalPages = Math.ceil(data.length / 10);
var ITEMS_PER_PAGE = 10;
var maxPagesToShow = 5;
var currentPage = 1;

function generatePagination(data) {
  var pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  var prevBtn = document.createElement('a');
  prevBtn.href = 'javascript:void(0);';
  prevBtn.innerHTML = '&laquo;';
  pagination.appendChild(prevBtn);
  prevBtn.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      generatePagination(data);
      loadData(data);
    }
  });
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
  console.log(data);
}

function loadData(data) {
  var startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  var endIndex = startIndex + ITEMS_PER_PAGE;
  totalPages = Math.ceil(data.length / 10);
  generatePagination(data);

  if (endIndex > data.length) {
    endIndex = data.length;
  }
  console.log(endIndex);
  displayItem(startIndex, endIndex, data);
}
