// import DUMMY_DATA from '../../database/userData.js';
import DUMMY_PRODUCTS from '../../database/products.js';
// const productsList = DUMMY_PRODUCTS;
// console.log(productsList);

localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(DUMMY_PRODUCTS));
const productsList = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
// console.log(userData)

const DUMMY_API = [
  {
    idUser: 'admin',
    cart: [
      {
        idOrder: 'd2jdm',
        dateCreate: '2023-11-23T12:30:00Z',
        dateCancel: '',
        product: [
          {
            id: 'a07c4d6ca1',
            quantity: 3,
            processed: true
          },
          {
            id: 'a07c4d6ca1',
            quantity: 3,
            processed: false
          }
        ]
      }
    ]
  },
  {
    idUser: 'Asddv',
    cart: [
      {
        idOrder: 'd3jdm',
        dateCreate: '2023-11-23T12:30:00Z',
        dateCancel: '',
        product: [
          {
            id: '36b9b496cb',
            quantity: 3,
            processed: true
          }
        ]
      }
    ]
  }
];

// // Fake dữ liệu để test, thay đổi nó để gắn vào dữ liệu thật ở đây
// // Note: Nhớ tìm hết các giá trị 'DUMMY_API' và đổi lại
localStorage.setItem('DUMMY_API', JSON.stringify(DUMMY_API));
let userData = JSON.parse(localStorage.getItem('DUMMY_API'));

// let userData = DUMMY_API;

// start: Open set status
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const closeModal = () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
};

const showModal = (user, currentPID, cart, currentQNT) => {
  const form = modal.querySelector('form');

  const productInfo = productsList.find(product => product.ID === currentPID);
  const price = parseFloat(productInfo.price.replace('VND', '').split('.').join(''));

  modal.innerHTML = '';

  if (form) {
    form.innerHTML = '';
  }

  // Tìm kiếm tên khách hàng trong list accounts trên localhost
  const accounts = JSON.parse(localStorage.getItem('accounts'));
  const userInfo = accounts.find(acc => acc.id === user.idUser);

  // Chuyển đổi thành ngày/tháng/năm giờ:phút:giấy
  const convertDateCreate = new Date(cart.dateCreate);
  const time =
    convertDateCreate.getDate().toString().padStart(2, '0') +
    '/' +
    (convertDateCreate.getMonth() + 1).toString().padStart(2, '0') +
    '/' +
    convertDateCreate.getFullYear() +
    ' ' +
    convertDateCreate.getHours().toString().padStart(2, '0') +
    ':' +
    convertDateCreate.getMinutes().toString().padStart(2, '0') +
    ':' +
    convertDateCreate.getSeconds().toString().padStart(2, '0');

  // Apply data
  const html = `
  <form action="">
    <div class="modal__content">
      <div class="modal__content--header">
        <h1>Thông tin chi tiết</h1>
        <p>Sản phẩm thuộc đơn hàng: <span>${cart.idOrder}</span></p>
        <p>Ngày đặt hàng: <span>${time}</span></p>
      </div>
      <div class="modal__content--title modal__content--id__user">
        <h1>Mã khách hàng</h1>
        <p>${user.idUser}</p>
      </div>
      <div class="modal__content--title modal__content--username">
        <h1>Tên khách hàng</h1>
        <p>${userInfo?.name}</p>
      </div>
      <div class="modal__content--product">
        <ul class="modal__content--product__title">
          <li class="product__title--id">Mã sản phẩm</li>
          <li class="product__title--name">Tên sản phẩm</li>
          <li class="product__title--qnt">Số lượng</li>
        </ul>
        <ul class="modal__content--product__item">
          <li class="product__item--id">${productInfo.ID}</li>
          <li class="product__item--name">${productInfo.name}</li>
          <li class="product__item--qnt">${currentQNT}</li>
        </ul>
      </div>
      <div class="modal__content--img">
        <img src="/${productInfo.imgSrc}" alt="Hình ảnh xe đạp">
      </div>
      <div class="modal__conent--total__amount">
        <h1>Tổng tiền</h1>
        <p>${price ? (price * currentQNT).toLocaleString('en') + 'VNĐ' : 'Giá liên hệ'} </p>
      </div>
    </div>
    
    <div class="modal__actions">
      <button class="modal__action--exit">Thoát</button>
      <button class="modal__action--process">Xử lý</button>
    </div>
  </form>
    `;

  modal.insertAdjacentHTML('afterbegin', html);
  modal.classList.add('active');
  overlay.classList.add('active');
};

overlay.addEventListener('click', closeModal);
// end: Open set status

// start: apply html into layout
// localStorage.setItem('accounts', JSON.stringify(DUMMY_DATA));
const listProducts = document.querySelector('.admin__content--body__products');
const renderItems = () => {
  listProducts.innerHTML = '';

  userData?.forEach(user => {
    const idUser = user.idUser;

    // Nếu trong cart của user không có phần tử tức là user đó chưa mua gì
    // thì không cần render giao diện
    if (user.cart.length === 0) {
      return;
    }

    user.cart?.forEach(cart => {
      const idOrder = cart.idOrder;
      const dateCreate = cart.dateCreate;
      const convertDateCreate = new Date(dateCreate);

      // Chuyển đổi ngày tháng năm phù hợp để hiển thị giao diện
      const day = convertDateCreate.getDate().toString().padStart(2, '0');
      const month = (convertDateCreate.getMonth() + 1).toString().padStart(2, '0');
      const year = convertDateCreate.getFullYear();

      cart.product.forEach(product => {
        const idProduct = product.id;
        const quantity = product.quantity;
        const isProcessed = product.processed;

        const productInfo = productsList.find(product => product.ID === idProduct);

        // Sau khi tất cả thông tin thì render ra
        const html = `
          <ul class="admin__content--body__products--item ${
            isProcessed ? 'isActiveStatus' : 'isNonActiveStatus'
          }" pid="${idProduct}">
            <li class="admin__content--body__id products--item__id" id="${idUser}">${idUser}</li>
            <li class="admin__content--body__orderId products--item__orderId" id="${idOrder}">${idOrder}</li>
            <li class="admin__content--body__productId products--item__productId">${idProduct}</li>
            <li class="admin__content--body__img products--item__img">
              <div>
                <img src="/${productInfo.imgSrc}" alt="Hình ảnh xe đạp" />
              </div>
            </li>
            <li class="admin__content--body__name products--item__name">${productInfo.name}</li>
            <li class="admin__content--body__qnt products--item__qnt" data-qnt=${quantity}>
              <p>${quantity}</p>
            </li>
            <li class="admin__content--body__dateCreate products--item__dateCreate">${day}/${month}/${year}</li>
            ${
              // Hiện thị trạng thái đơn xử lý/ chưa xử lý
              isProcessed
                ? `<li class="admin__content--body__status products--item__status">
                Đã xử lý
                <i class="fa-solid fa-pen-to-square"></i>
              </li>`
                : `<li class="admin__content--body__status products--item__status">
                Chưa xử lý
                <i class="fa-solid fa-pen-to-square"></i>
              </li>`
            }

            <li class="admin__content--body__btn products--item__btn">
              <button><i class="fa-solid fa-x"></i></button>
            </li>
          </ul>`;
        listProducts.insertAdjacentHTML('beforeend', html);
      });
    });
  });
};

// start: Logic for filter products
const submitBtn = document.querySelector('.order--filter__btn');
let data;
let isProcessed;
submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const inputNameClientValue = document.querySelector('#orderNameClient input').value.toLowerCase();
  const inputIdClientValue = document.querySelector('#orderIdClient input').value;
  const selectStatusValue = document.querySelector('#orderStatus select').value;

  if (!inputNameClientValue && !inputIdClientValue && !selectStatusValue) {
    return;
  } else {
    const contentListProduct = document.querySelector('#orderList');

    window.scrollTo({
      top: contentListProduct.getBoundingClientRect().top + window.scrollY - contentListProduct.clientHeight,
      behavior: 'smooth'
    });
  }
  // If data isn't an array, then convert to array
  const data = Array.isArray(userData) ? userData : [userData];

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

const resetBtn = document.querySelector('.order--reset__btn');
resetBtn.addEventListener('click', e => {
  init();
  paginationHandler();
});

// end: Logic for filter products



// start: Logic for click edit status handler
const updateProcessingHandler = (user, currentPID, currentOID) => {
  // Lọc qua giỏ hàng của người dùng để tìm idOrder chính xác
  user.cart = user.cart.map(cart => {
    if (cart.idOrder === currentOID) {
      // Sau khi tìm được idOrder chính xác thì tìm sản phẩm cần xử lý và xử lý
      cart.product.forEach(product => {
        if (product.id === currentPID && !product.processed) {
          product.processed = true;
        }
      });
    }
    return cart;
  });
};

const clickedExitBtnHandler = () => {
  const exitBtn = document.querySelector('.modal__action--exit');
  exitBtn.addEventListener('click', e => {
    e.preventDefault();
    closeModal();
  });
};

const clickedProcessBtnHandler = (user, currentPID, currentOID) => {
  const processBtn = document.querySelector('.modal__action--process');
  processBtn.addEventListener('click', e => {
    e.preventDefault();
    updateProcessingHandler(user, currentPID, currentOID);
    closeModal();
    init();
    paginationHandler();
    localStorage.setItem('DUMMY_API', JSON.stringify(userData));
  });
};

const updateLocalStorageForProcessHandler = (currentUID, currentPID, currentOID, currentQNT) => {
  userData.forEach((user, idx) => {
    if (user.idUser === currentUID) {
      // Kiểm tra id order chính xác với element click
      user.cart.forEach(cart => {
        if (cart.idOrder === currentOID) {
          showModal(user, currentPID, cart, currentQNT);
          clickedProcessBtnHandler(user, currentPID, currentOID);
          clickedExitBtnHandler();
        }
      });
    }
  });
  localStorage.setItem('User', JSON.stringify(userData));
};

const clickIconHandler = () => {
  const nonActiveElements = document.querySelectorAll('.isNonActiveStatus');
  nonActiveElements.forEach(item => {
    const iconBtn = item.querySelector('.products--item__status i');
    const currentPID = item.getAttribute('pid');
    const currentUID = item.querySelector('.products--item__id').getAttribute('id');
    const currentOID = item.querySelector('.products--item__orderId').getAttribute('id');
    const currenQNT = parseInt(item.querySelector('.products--item__qnt').textContent);

    iconBtn.addEventListener('click', e => {
      updateLocalStorageForProcessHandler(currentUID, currentPID, currentOID, currenQNT);
    });
  });
};
// end: Logic for click edit status handler

// start: logic click delete btn
const deleteProduct = (currentUID, currentPID, currentOID, isNonActiveItem) => {
  let deleted = false;
  userData.forEach(user => {
    if (user.idUser === currentUID) {
      // Kiểm tra tiếp trong mảng cart của user check từng id đơn hàng để xóa chính xác
      user.cart.forEach(cart => {
        if (cart.idOrder === currentOID) {
          cart.product = cart.product.filter(product => {
            if (product.id === currentPID && product.processed === isNonActiveItem) {
              deleted = true;
              return true;
            } else {
              return false;
            }
          });
        }
      });
    }
  });
  return deleted;
};

function updateLocalStorageForDeleteHandler() {
  init();
  paginationHandler();
  localStorage.setItem('DUMMY_API', JSON.stringify(userData));
}

const renderModalContent = () => {
  modal.innerHTML = '';

  modal.classList.add('active');
  overlay.classList.add('active');

  const html = `
  <div class="modal--delete">
    <header class="modal--delete__header">
      <h1>Xóa dữ liệu</h1>
    </header>
    <div class="modal--delete__content">
      <p>Bạn có muốn xóa dữ liệu này không?</p>
    </div>
    <div class="modal--delete__footer">
      <button class="modal--delete__footer--delete">Chắc chắn</button>
      <button class="modal--delete__footer--exit">Không</button>
    </div>
  </div>`;
  modal.insertAdjacentHTML('afterbegin', html);
};

function clickDeleteBtnHandler() {
  const productsList = document.querySelectorAll('.admin__content--body__products ul');
  productsList.forEach(item => {
    const deleteBtnElements = item.querySelectorAll('.products--item__btn button');
    const isNonActiveItem = item.classList.contains('isNonActiveStatus');
    const currentPID = item.getAttribute('pid');
    const currentUID = item.querySelector('.products--item__id').getAttribute('id');
    const currentOID = item.querySelector('.products--item__orderId').getAttribute('id');

    deleteBtnElements.forEach(btn => {
      btn.addEventListener('click', e => {
        renderModalContent();

        const acpDeleteBtn = document.querySelector('.modal--delete__footer--delete');
        const exitDeleteBtn = document.querySelector('.modal--delete__footer--exit');

        acpDeleteBtn.addEventListener('click', e => {
          deleteProduct(currentUID, currentPID, currentOID, isNonActiveItem);
          updateLocalStorageForDeleteHandler();
          closeModal();
        });

        exitDeleteBtn.addEventListener('click', e => {
          closeModal();
        });
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
  renderItems();
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
    const pagination = document.querySelector('.pagination__order');
    pagination.innerHTML = '';
    const html = `
      <button data-goto="${
        currentPage - 1
      }" data-of="${totalPages}" class="btn--inline pagination__order--pagination__btn--prev ${
      currentPage === 0 ? 'hide' : ''
    }">
        <i class="fa-solid fa-arrow-left"></i>
        <span>${currentPage}</span>
        <span> of ${totalPages}</span>
      </button>
      <span class="currentPage">${currentPage + 1}</span>
      <button data-goto="${
        currentPage + 1
      }" data-of="${totalPages}" class="btn--inline pagination__order--pagination__btn--next ${
      currentPage === totalPages - 1 || totalPages === 0 ? 'hide' : ''
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
    const nextPageBtn = document.querySelector('.pagination__order--pagination__btn--next');
    nextPageBtn.addEventListener('click', e => {
      currentPage += 1;
      renderLayoutPagination();
      renderPaginationBtn();
    });
  }

  function prevPageHandler() {
    const prevPageBtn = document.querySelector('.pagination__order--pagination__btn--prev');
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
