import DUMMY_DATA from '../../database/userData.js';
import DUMMY_PRODUCTS from '../../database/products.js';

const toggleMenuIcon = document.querySelector('.admin__content--header__cate');
const container = document.querySelector('.container');
const adminMenu = document.querySelector('.admin__taskbar');
const logoMenu = document.querySelector('.admin__taskbar--header__content img');

toggleMenuIcon.addEventListener('click', e => {
  const isHide = document.querySelector('.container.hide');

  console.log(isHide);
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

// start: Delete item
const deleteBtns = document.querySelectorAll('.products--item__btn');

deleteBtns.forEach((item, idx) => {
  item.addEventListener('click', e => {
    // Logic
  });
});
// end: Delete item

// start: filter
const filterBtn = document.querySelector('.body__filter--action__filter');
const contentListProduct = document.querySelector('.admin__content--body__list');

filterBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log(contentListProduct.getBoundingClientRect().top);

  window.scrollTo({
    top: contentListProduct.getBoundingClientRect().top + window.scrollY - contentListProduct.clientHeight,
    behavior: 'smooth'
  });
});
// end: filter

// start: Open set status
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const closeModal = () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
};

const clickEditHandler = user => {
  const editStatusItems = document.querySelectorAll('.isNonActiveStatus');
  editStatusItems.forEach((item, idx) => {
    item.addEventListener('click', e => {
      const parent = item.closest('ul');
      const currentUID = parent.querySelector('.products--item__id').getAttribute('id');

      if (currentUID === user.id.toString()) {
        const newIsProcessing = user.isProcessing.slice(); //Copy processing array
        newIsProcessing.splice(idx, 1); //Delete item which item was clicked!

        const boughtItem = user.isProcessing[idx]; //Store item which will be processed!

        showModal(user, idx);

        // When click btnProcess
        const btnProcess = document.querySelector('.modal__action--process');
        btnProcess.addEventListener('click', e => {
          e.preventDefault();

          // Update new data
          user.bought.unshift(boughtItem);
          user.isProcessing = newIsProcessing;
          localStorage.setItem('userData', JSON.stringify(user));
          renderProducts();

          // Close modal when clicked!
          closeModal();
        });

        //When click btnExit
        const btnExit = document.querySelector('.modal__action--exit');
        btnExit.addEventListener('click', e => {
          e.preventDefault();
          closeModal();
        });
      }
    });
  });
};

const showModal = (user, idx) => {
  const form = modal.querySelector('form');
  const findDataProduct = DUMMY_PRODUCTS.find(product => product.ID === user.isProcessing[idx].id);
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
          <li class="product__item--id">${user.isProcessing[idx].id}</li>
          <li class="product__item--name">${findDataProduct.name}</li>
          <li class="product__item--qnt">${user.isProcessing[idx].qnt}</li>
        </ul>
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
  user.bought.forEach((item, idx) => {
    // Find data by current item's id
    const findDataProduct = DUMMY_PRODUCTS.find(product => product.ID === item.id);

    const html = `<ul class="admin__content--body__products--item isActiveStatus">
        <li class="admin__content--body__id products--item__id" id="${user.id}">${user.id}</li>
        <li class="admin__content--body__img products--item__img">
          <div>
            <img src="${findDataProduct.imgSrc}" alt="" />
          </div>
        </li>
        <li class="admin__content--body__name products--item__name">${findDataProduct.name}</li>
        <li class="admin__content--body__qnt products--item__qnt">
          <input type="number" min="1" step="1" value="${item.qnt}"/>
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
  user.isProcessing.forEach((item, idx) => {
    const findDataProduct = DUMMY_PRODUCTS.find(product => product.ID === item.id);
    const html = `<ul class="admin__content--body__products--item isNonActiveStatus">
        <li class="admin__content--body__id products--item__id" id="${user.id}">${user.id}</li>
        <li class="admin__content--body__img products--item__img">
          <div>
            <img src="${findDataProduct.imgSrc}" alt="" />
          </div>
        </li>
        <li class="admin__content--body__name products--item__name">${findDataProduct.name}</li>
        <li class="admin__content--body__qnt products--item__qnt">
          <input type="number" min="1" step="1" value="${item.qnt}"/>
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

const renderProducts = () => {
  // Get data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));

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
    // Loading data from isProcessing (No process)
    renderItemsIsProcessing(user);

    // Loading data from bought (Yes process)
    renderItemsProcessed(user);

    clickEditHandler(user);
  });
};

renderProducts();
// end: apply html into layout
