import DUMMY_DATA from '../../database/userData.js';
import DUMMY_PRODUCTS from '../../database/products.js';
const userData = JSON.parse(localStorage.getItem('userData'));

//start: Toggle taskbar menu
const toggleMenuIcon = document.querySelector('.admin__content--header__cate');
const container = document.querySelector('.container');
const adminMenu = document.querySelector('.admin__taskbar');
const logoMenu = document.querySelector('.admin__taskbar--header__content img');

toggleMenuIcon.addEventListener('click', e => {
  const isHide = document.querySelector('.container.hide');

  if (isHide) {
    logoMenu.src = '../../database/images/logo/logo_on_menu_adm.jpg';
  } else {
    logoMenu.src = '../../database/images/logo/logo_on_hideMenu_adm.jpg';
  }
  container.classList.toggle('hide');
});

const logoutBtnOnAdminPage = document.querySelector('.admin__taskbar--footer');
logoutBtnOnAdminPage.addEventListener('click', e => {
  localStorage.removeItem('userLogin');
  window.location.href = window.location.origin + '/';
});
//end: Toggle taskbar menu

// start: Open set status
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const closeModal = () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
};

const showModal = (user, currentPID, currenQNT) => {
  const form = modal.querySelector('form');

  const findDataProduct = DUMMY_PRODUCTS.find(product => product.ID === currentPID);
  const price = parseFloat(findDataProduct.price.replace('VND', '').split('.').join(''));

  form.innerHTML = '';

  // Apply data
  const html = `
    <div class="modal__content">
      <div class="modal__content--header">
        <h1>Thông tin chi tiết</h1>
      </div>
      <div class="modal__content--id__user">
        <h1>Mã khách hàng</h1>
        <p>${user.id}</p>
      </div>
      <div class="modal__content--username">
        <h1>Tên khách hàng</h1>
        <p>${user.name}</p>
      </div>
      <div class="modal__content--product">
        <ul class="modal__content--product__title">
          <li class="product__title--id">Mã sản phẩm</li>
          <li class="product__title--name">Tên sản phẩm</li>
          <li class="product__title--qnt">Số lượng</li>
        </ul>
        <ul class="modal__content--product__item">
          <li class="product__item--id">${findDataProduct.ID}</li>
          <li class="product__item--name">${findDataProduct.name}</li>
          <li class="product__item--qnt">${currenQNT}</li>
        </ul>
      </div>
      <div class="modal__content--img">
        <img src="${findDataProduct.imgSrc}" alt="Hình ảnh xe đạp">
      </div>
      <div class="modal__conent--total__amount">
        <h1>Tổng tiền</h1>
        <p>${price ? (price * currenQNT).toLocaleString('en') + 'VNĐ' : 'Giá liên hệ'} </p>
      </div>
    </div>
    
    <div class="modal__actions">
      <button class="modal__action--exit">Thoát</button>
      <button class="modal__action--process">Xử lý</button>
    </div>
    `;

  form.insertAdjacentHTML('afterbegin', html);
  modal.classList.add('active');
  overlay.classList.add('active');
};

overlay.addEventListener('click', closeModal);
// end: Open set status

// start: apply html into layout
localStorage.setItem('userData', JSON.stringify(DUMMY_DATA));
const listProducts = document.querySelector('.admin__content--body__products');

const renderItemsProcessed = user => {
  user?.bought.forEach((item, idx) => {
    // Find data by current item's id
    const findDataProduct = DUMMY_PRODUCTS.find(product => product.ID === item.id);

    const html = `<ul class="admin__content--body__products--item isActiveStatus" pid="${item.id}">
        <li class="admin__content--body__id products--item__id" id="${user.id}">${user.id}</li>
        <li class="admin__content--body__img products--item__img">
          <div>
            <img src="${findDataProduct.imgSrc}" alt="" />
          </div>
        </li>
        <li class="admin__content--body__name products--item__name">${findDataProduct.name}</li>
        <li class="admin__content--body__qnt products--item__qnt" data-qnt=${item.qnt}>
          <input type="number" min="1" step="1" value="${item.qnt}" readonly/>
        </li>
        <li class="admin__content--body__status products--item__status">
          Đã xử lý
          <i class="fa-solid fa-pen-to-square"></i>
        </li>
        <li class="admin__content--body__btn products--item__btn">
          <button><i class="fa-solid fa-x"></i></button>
        </li>
      </ul>`;
    listProducts.insertAdjacentHTML('beforeend', html);
  });
};

const renderItemsIsProcessing = user => {
  user?.isProcessing.forEach((item, idx) => {
    const findDataProduct = DUMMY_PRODUCTS.find(product => product.ID === item.id);
    const html = `<ul class="admin__content--body__products--item isNonActiveStatus" pid="${item.id}">
        <li class="admin__content--body__id products--item__id" id="${user.id}">${user.id}</li>
        <li class="admin__content--body__img products--item__img">
          <div>
            <img src="${findDataProduct.imgSrc}" alt="" />
          </div>
        </li>
        <li class="admin__content--body__name products--item__name">${findDataProduct.name}</li>
        <li class="admin__content--body__qnt products--item__qnt" data-qnt=${item.qnt}>
          <input type="number" min="1" step="1" value="${item.qnt}" readonly/>
        </li>
        <li class="admin__content--body__status products--item__status">
          Chưa xử lý
          <i class="fa-solid fa-pen-to-square"></i>
        </li>
        <li class="admin__content--body__btn products--item__btn">
          <button><i class="fa-solid fa-x"></i></button>
        </li>
    </ul>`;
    listProducts.insertAdjacentHTML('beforeend', html);
  });
};
// end: apply html into layout

// start: Logic for filter products
const submitBtn = document.querySelector('.body__filter--action__filter');

let data;
let isProcessed;
submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const inputNameClientValue = document.querySelector('.body__filter--nameClient input').value.toLowerCase();
  const inputIdClientValue = document.querySelector('.body__filter--idClient input').value;
  const selectStatusValue = document.querySelector('.body__filter--status select').value;

  if (!inputNameClientValue && !inputIdClientValue && !selectStatusValue) {
    return;
  } else {
    const filterBtn = document.querySelector('.body__filter--action__filter');
    const resetBtn = document.querySelector('.body__filter--action__reset');
    const contentListProduct = document.querySelector('.admin__content--body__list');

    filterBtn.addEventListener('click', e => {
      e.preventDefault();

      window.scrollTo({
        top: contentListProduct.getBoundingClientRect().top + window.scrollY - contentListProduct.clientHeight,
        behavior: 'smooth'
      });
    });
    resetBtn.addEventListener('click', e => {
      init();
      paginationHandler();
    });
  }
  // If data isn't an array, then convert to array

  if (Array.isArray(userData)) {
    data = userData;
  } else {
    data = [userData];
  }

  if (inputNameClientValue) {
    data = data.filter(item => item.name.toLowerCase().includes(inputNameClientValue));
  }

  if (inputIdClientValue) {
    data = data.filter(item => item.id.toString() === inputIdClientValue.trim());
  }

  if (selectStatusValue) {
    switch (selectStatusValue) {
      case 'valid':
        isProcessed = 'processed';
        break;
      case 'invalid':
        isProcessed = 'processing';
        break;
      case 'all':
        isProcessed = 'all';
        break;
    }
  }

  listProducts.innerHTML = '';
  if (isProcessed === 'processed') {
    data.forEach(user => {
      renderItemsProcessed(user);
      clickIconHandler();
      clickDeleteBtnHandler();
    });
  } else if (isProcessed === 'processing') {
    data.forEach(user => {
      renderItemsIsProcessing(user);
      clickIconHandler();
      clickDeleteBtnHandler();
    });
  } else if (isProcessed === 'all') {
    data.forEach(user => {
      renderItemsIsProcessing(user);
      renderItemsProcessed(user);
      clickIconHandler();
      clickDeleteBtnHandler();
      sortProductsNonActiveFirst();
    });
  }

  paginationHandler();
});
// end: Logic for filter products

// start: rendered products
const renderProducts = filtered => {
  // If data isn't an array, then convert to array
  let data;
  if (Array.isArray(userData)) {
    data = userData;
  } else {
    data = [userData];
  }

  // Clear product when render
  listProducts.innerHTML = '';

  data.forEach((user, idx) => {
    renderItemsIsProcessing(user);
    renderItemsProcessed(user);
    // clickEditHandler(user);
  });
};

// end: rendered products

// start: Logic for click edit status handler
const updateProcessingHandler = (user, currentPID) => {
  user.isProcessing = user.isProcessing.filter(product => product.id !== currentPID);
};

const updateBoughtHandler = (user, currentPID, currenQNT) => {
  user.bought.unshift({ id: currentPID, qnt: parseInt(currenQNT) });
};

const clickedExitBtnhandler = () => {
  const exitBtn = document.querySelector('.modal__action--exit');
  exitBtn.addEventListener('click', e => {
    e.preventDefault();
    closeModal();
  });
};

const clickedProcessBtnHandler = (user, currentPID, currenQNT) => {
  const processBtn = document.querySelector('.modal__action--process');
  processBtn.addEventListener('click', e => {
    e.preventDefault();
    updateProcessingHandler(user, currentPID);
    updateBoughtHandler(user, currentPID, currenQNT);
    closeModal();
    init();
    paginationHandler();
    localStorage.setItem('userData', JSON.stringify(userData));
  });
};

const updateLocalStorageForProcessHandler = (currentUID, currentPID, currenQNT) => {
  userData.forEach((user, idx) => {
    if (user.id.toString() === currentUID) {
      showModal(user, currentPID, currenQNT);
      clickedProcessBtnHandler(user, currentPID, currenQNT);
      clickedExitBtnhandler();
    }
  });
  localStorage.setItem('userData', JSON.stringify(userData));
};

const clickIconHandler = () => {
  const nonActiveElements = document.querySelectorAll('.isNonActiveStatus');
  nonActiveElements.forEach(item => {
    const iconBtn = item.querySelector('.products--item__status i');
    const currentPID = item.getAttribute('pid');
    const currentUID = item.querySelector('.products--item__id').getAttribute('id');
    const currenQNT = item.querySelector('.products--item__qnt input').value;

    iconBtn.addEventListener('click', e => {
      updateLocalStorageForProcessHandler(currentUID, currentPID, currenQNT);
    });
  });
};
// end: Logic for click edit status handler

// start: logic click delete btn
const deleteProduct = (currentUID, currentPID, isNonActiveItem) => {
  let deleted = false;
  userData.forEach(user => {
    if (user.id.toString() === currentUID) {
      if (isNonActiveItem) {
        user.isProcessing = user.isProcessing.filter(item => {
          if (item.id === currentPID && !deleted) {
            deleted = true;
            return false;
          }
          return true;
        });
      } else if (!isNonActiveItem) {
        user.bought = user.bought.filter(item => {
          if (item.id === currentPID && !deleted) {
            deleted = true;
            return false;
          }
          return true;
        });
      }
    }
  });
};

function updateLocalStorageForDeleteHandler() {
  init();
  paginationHandler();

  localStorage.setItem('userData', JSON.stringify(userData));
}

function clickDeleteBtnHandler() {
  const productsList = document.querySelectorAll('.admin__content--body__products ul');
  productsList.forEach(item => {
    const deleteBtnElements = item.querySelectorAll('.products--item__btn button');
    const isNonActiveItem = item.classList.contains('isNonActiveStatus');
    const currentPID = item.getAttribute('pid');
    const currentUID = item.querySelector('.products--item__id').getAttribute('id');

    deleteBtnElements.forEach(btn => {
      btn.addEventListener('click', e => {
        deleteProduct(currentUID, currentPID, isNonActiveItem);
        updateLocalStorageForDeleteHandler();
      });
    });
  });
}
// end: logic click delete btn

// start: sort all products is non active on top
const sortProductsNonActiveFirst = () => {
  const productList = document.querySelector('.admin__content--body__products');

  const items = productList.querySelectorAll('.admin__content--body__products--item');

  const nonActiveItems = [];
  const activeItems = [];

  items.forEach(item => {
    if (item.classList.contains('isNonActiveStatus')) {
      nonActiveItems.push(item);
    } else {
      activeItems.push(item);
    }
  });

  productList.innerHTML = '';

  nonActiveItems.forEach(item => {
    productList.appendChild(item);
  });

  activeItems.forEach(item => {
    productList.appendChild(item);
  });
};
// end: sort all products is non active on top

const init = () => {
  renderProducts();
  clickIconHandler();
  clickDeleteBtnHandler();
  sortProductsNonActiveFirst();
};

init();

// start: pagination
function paginationHandler() {
  const productItems = document.querySelectorAll('.admin__content--body__products ul');
  let currentPage = 0;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(productItems.length / itemsPerPage);
  let storeItemsPerPage = [];

  function renderLayoutPagination() {
    document.querySelector('.admin__content--body__products').innerHTML = '';
    const startIdx = currentPage * itemsPerPage;
    const endIdx = Math.min(currentPage * itemsPerPage + itemsPerPage, productItems.length);

    for (let i = startIdx; i < endIdx; i++) {
      storeItemsPerPage.push(productItems[i]);
    }
    storeItemsPerPage.forEach(item => {
      document.querySelector('.admin__content--body__products').appendChild(item);
    });

    storeItemsPerPage = [];
  }

  // Checking on first page
  function renderPaginationBtn(isProcessed) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    const html = `
      <button data-goto="${currentPage - 1}" data-of="${totalPages}" class="btn--inline pagination__btn--prev ${
      currentPage === 0 ? 'hide' : ''
    }">
        <i class="fa-solid fa-arrow-left"></i>
        <span>${currentPage}</span>
        <span> of ${totalPages}</span>
      </button>
      <span class="currentPage">${currentPage + 1}</span>
      <button data-goto="${currentPage + 1}" data-of="${totalPages}" class="btn--inline pagination__btn--next ${
      currentPage === totalPages - 1 ? 'hide' : ''
    }"  >
        <span>${currentPage + 2}</span>
        <span> of ${totalPages}</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>`;
    pagination.insertAdjacentHTML('afterbegin', html);
    nextPageHandler();
    prevPageHandler();
  }

  function nextPageHandler() {
    const nextPageBtn = document.querySelector('.pagination__btn--next');
    nextPageBtn.addEventListener('click', e => {
      currentPage += 1;
      renderLayoutPagination();
      renderPaginationBtn();
    });
  }

  function prevPageHandler() {
    const prevPageBtn = document.querySelector('.pagination__btn--prev');
    prevPageBtn.addEventListener('click', e => {
      currentPage -= 1;
      renderLayoutPagination();
      renderPaginationBtn();
    });
  }

  renderLayoutPagination();
  renderPaginationBtn();
}
paginationHandler();
// end: pagination
