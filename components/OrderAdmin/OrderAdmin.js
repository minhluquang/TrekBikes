// import DUMMY_DATA from '../../database/userData.js';
import DUMMY_PRODUCTS from '../../database/products.js';
// const productsList = DUMMY_PRODUCTS;
// console.log(productsList);

// localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(DUMMY_PRODUCTS));
const productsList = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
// console.log(userData)
let datalocal = productsList;
let userLocal = JSON.parse(localStorage.getItem('User'));

// if (!localStorage.getItem('codeHasRunBefore')) {
//   try {
//     if (!userLocal || !datalocal) {
//       throw new Error('Required variables are undefined.');
//     }

//     var DateTimeP = [];
//     const DUMMY_API = [
//       {
//         idUser: userLocal.id,
//         cart: []
//       }
//     ];

//     for (let i = 0; i < datalocal.length; i++) {
//       DateTimeP.push({
//         productId: datalocal[i].ID,
//         createAT: '14/11/2023  20:00',
//         updateAt: '14/11/2023  20:00'
//       });
//     }

//     localStorage.setItem('DateTimeP', JSON.stringify(DateTimeP));
//     localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(datalocal));
//     localStorage.setItem('DUMMY_API', JSON.stringify(DUMMY_API));

//     localStorage.setItem('codeHasRunBefore', 'true');
//   } catch (error) {
//     console.error('Error in code:', error.message);
//   }
// } else {
//   console.log('Code will not run again.');
// }

// const DUMMY_API = [
//   {
//     idUser: 'admin',
//     cart: [
//       {
//         idOrder: 'd2jdm',
//         dateCreate: '2023-11-23T12:30:00Z',
//         dateCancel: '',
//         product: [
//           {
//             id: 'a07c4d6ca1',
//             quantity: 3,
//             processed: true
//           },
//           {
//             id: 'a07c4d6ca1',
//             quantity: 3,
//             processed: false
//           }
//         ]
//       }
//     ]
//   },
//   {
//     idUser: 'Asddv',
//     cart: [
//       {
//         idOrder: 'd3jdm',
//         dateCreate: '2023-11-23T12:30:00Z',
//         dateCancel: '',
//         product: [
//           {
//             id: '36b9b496cb',
//             quantity: 3,
//             processed: true
//           }
//         ]
//       }
//     ]
//   }
// ];

// // Fake dữ liệu để test, thay đổi nó để gắn vào dữ liệu thật ở đây
// // Note: Nhớ tìm hết các giá trị 'DUMMY_API' và đổi lại
// localStorage.setItem('DUMMY_API', JSON.stringify(DUMMY_API));
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

const uiElement = (idUser, idOrder, day, month, year, quantity, productInfo, idProduct, isProcessed) => {
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
        <i class="fa-solid fa-circle-info"></i>
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
  return html;
};

const renderItems = (processed = false, processing = false, data = userData) => {
  listProducts.innerHTML = '';

  data?.forEach(user => {
    const idUser = user.idUser;

    // Nếu trong cart của user không có phần tử tức là user đó chưa mua gì
    // thì không cần render giao diện
    if (user.cart?.length === 0) {
      return;
    }

    // Sau khi filter theo idOrder thì có dữ liệu cart trả về underfined
    if (user.cart !== undefined) {
      user.cart.forEach(cart => {
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

          // Nếu đối số truyền vào là cần lọc sản phẩm đã xử lý
          let html;

          if (processed && isProcessed === true) {
            html = uiElement(idUser, idOrder, day, month, year, quantity, productInfo, idProduct, isProcessed);
          } else if (processing && isProcessed === false) {
            html = uiElement(idUser, idOrder, day, month, year, quantity, productInfo, idProduct, isProcessed);
          } else if (!processed && !processing) {
            html = uiElement(idUser, idOrder, day, month, year, quantity, productInfo, idProduct, isProcessed);
          }

          listProducts.insertAdjacentHTML('beforeend', html);
        });
      });
    }
  });
};
// start: Logic for filter products
const submitBtn = document.querySelector('.order--filter__btn');

let data;

let isProcessed;

submitBtn.addEventListener('click', e => {
  e.preventDefault();

  const inputIdClientValue = document.querySelector('#orderIdClient input').value.trim();
  const inputIdOrderValue = document.querySelector('#orderIdOrder input').value.trim();
  const selectStatusValue = document.querySelector('#orderStatus select').value;
  const inputOrderDateBegin = document.querySelector('#orderDateBegin input').value;
  const inputOrderDateEnd = document.querySelector('#orderDateEnd input').value;
  const timeBegin = new Date(inputOrderDateBegin);
  const timeEnd = new Date(inputOrderDateEnd);
  if(timeBegin > timeEnd) {
    alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
    return;
  }
 
  // console.log(day +" " + month + " " +year);
  // Nếu có dữ liệu nhập vào ít nhất ở 1 ô thì mới cuộn xuống, không có thì k làm gì
  if (inputIdClientValue === '' && inputIdOrderValue === '' && !selectStatusValue && !inputOrderDateBegin && !inputOrderDateEnd) {
    return;
  } else {
    const contentListProduct = document.querySelector('#orderList');

    window.scrollTo({
      top: contentListProduct.getBoundingClientRect().top + window.scrollY - contentListProduct.clientHeight,
      behavior: 'smooth'
    });
  }

  data = userData;

  // Lọc theo ngày tháng năm

  if (inputOrderDateBegin && inputOrderDateEnd) {
    
    const dayBegin = timeBegin.getDate();
    const monthBegin = timeBegin.getMonth();
    const yearBegin = timeBegin.getFullYear();

    
    const dayEnd = timeEnd.getDate();
    const monthEnd = timeEnd.getMonth();
    const yearEnd = timeEnd.getFullYear();
    data = data.filter(user => {
      return user.cart.some(cart => {
        console.log
        const timeOrder = new Date(cart.dateCreate);
        const dayOrder = timeOrder.getDate();
        const monthOrder = timeOrder.getMonth();
        const yearOrder = timeOrder.getFullYear();
  
        const orderDate = new Date(yearOrder, monthOrder, dayOrder);
        const startDate = new Date(yearBegin, monthBegin, dayBegin);
        const endDate = new Date(yearEnd, monthEnd, dayEnd);
        const isAfterOrEqualBeginDate = startDate <= orderDate;
        const isBeforeOrEqualEndDate = orderDate <= endDate;
      

        return isAfterOrEqualBeginDate && isBeforeOrEqualEndDate; 
      });
    });
  }

  // Lọc theo id client
  if (inputIdClientValue) {
    data = data.filter(user => user.idUser === inputIdClientValue.trim());
  }

  // Lọc theo id order
  if (inputIdOrderValue) {
    // Dùng map để trả về mảng mới với idUser là id user lặp qua
    // còn cart trả về là một object tìm thấy ấy id nếu không thì trả về underfined
    // Từ đó filter lại cái cart nào vị trí đầu khác underfined và length > 0 mới lấy
    data = data
      .map(user => ({
        idUser: user.idUser,
        cart: [user.cart.find(cart => cart.idOrder === inputIdOrderValue)]
      }))
      .filter(user => user.cart.length > 0 && user.cart[0] !== undefined);
  }

  if (selectStatusValue) {
    if (selectStatusValue === 'valid') {
      isProcessed = 'processed';
    } else if (selectStatusValue === 'invalid') {
      isProcessed = 'processing';
    } else if (selectStatusValue === 'all') {
      isProcessed = 'all';
    }
  }

  listProducts.innerHTML = '';
  if (isProcessed === 'processed') {
    renderItems(true, false, data);
    clickIconHandler();
    clickIconInfoHandler();
    clickDeleteBtnHandler();
  } else if (isProcessed === 'processing') {
    renderItems(false, true, data);
    clickIconHandler();
    clickIconInfoHandler();
    clickDeleteBtnHandler();
  } else if (isProcessed === 'all') {
    renderItems(false, false, data);
    clickIconHandler();
    clickIconInfoHandler();
    clickDeleteBtnHandler();
    sortProductsNonActiveFirst();
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

    // Khi bấm vào xử lý đơn, tức là đã thu tiền mà đã thu tiền thì
    // reload lại page cho nó cập nhật giá trị ở page home admin
    localStorage.setItem('isNeedReloadPageAdmin', JSON.stringify(true));

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
  localStorage.setItem('DUMMY_API', JSON.stringify(userData));
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

const clickIconInfoHandler = () => {
  const isActiveElements = document.querySelectorAll('.isActiveStatus');
  isActiveElements.forEach(element => {
    const icon = element.querySelector('.products--item__status i');
    icon.addEventListener('click', e => {
      const currentOID = element.querySelector('.products--item__orderId').getAttribute('id');
      const currentUID = element.querySelector('.products--item__id').getAttribute('id');
      const currentPID = element.querySelector('.products--item__productId').textContent;
      const currentQNT = element.querySelector('.products--item__qnt').getAttribute('data-qnt');

      userData.forEach((user, idx) => {
        if (user.idUser === currentUID) {
          // Kiểm tra id order chính xác với element click
          user.cart.forEach(cart => {
            if (cart.idOrder === currentOID) {
              showModal(user, currentPID, cart, currentQNT);
              clickedExitBtnHandler();
              document.querySelector('.modal__action--process').style.display = 'none';
            }
          });
        }
      });
    });
  });
};

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
  clickIconInfoHandler();
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
