// start: Logic for filter products
const submitBtn = document.querySelector('.user--filter__btn');

let data;
submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const inputNameClientValue = document.querySelector('#userNameClient input').value.toLowerCase();
  const inputIdClientValue = document.querySelector('#userIdClient input').value;

  if (!inputNameClientValue && !inputIdClientValue) {
    return;
  } else {
    const usersContainer = document.querySelector('#userList');

    window.scrollTo({
      top: usersContainer.getBoundingClientRect().top + window.scrollY - usersContainer.clientHeight,
      behavior: 'smooth'
    });
  }

  // If data isn't an array, then convert to array
  const userList = JSON.parse(localStorage.getItem('ACCOUNT__DATA'));

  if (Array.isArray(userList)) {
    data = userList;
  } else {
    data = [userList];
  }

  if (inputNameClientValue) {
    data = data.filter(item => item.name.toLowerCase().includes(inputNameClientValue));
  }

  if (inputIdClientValue) {
    data = data.filter(item => item.id.toString() === inputIdClientValue.trim());
  }

  init(data);
  paginationHandler();
});

const resetBtn = document.querySelector('.user--reset__btn');
resetBtn.addEventListener('click', e => {
  const data = JSON.parse(localStorage.getItem('ACCOUNT__DATA'));
  init(data);
  paginationHandler();
});

// end: Logic for filter products

// start: Apply layout user list
const usersContainer = document.querySelector('.admin__content--body__users');
import DUMMY_DATA from '../../database/userData.js';
localStorage.setItem('ACCOUNT__DATA', JSON.stringify(DUMMY_DATA));

const renderUsersInfo = userList => {
  userList = userList || JSON.parse(localStorage.getItem('ACCOUNT__DATA'));

  usersContainer.innerHTML = '';

  userList?.forEach(user => {
    const dateRegister = new Date(user.dateRegister);

    const day = dateRegister.getDate().toString().padStart(2, '0');
    const month = (dateRegister.getMonth() + 1).toString().padStart(2, '0');
    const year = dateRegister.getFullYear();
    const html = `
    <ul class="admin__content--body__users--item" uid="${user.id}"> 
      <li class="admin__content--body__id users--item__id">${user.id}</li>
      <li class="admin__content--body__name users--item__name">${user.name}</li>
      <li class="admin__content--body__email users--item__email">${user.email}</li>
      <li class="admin__content--body__dateRegister users--item__dateRegister">${day}/${month}/${year}</li>
      <li class="admin__content--body__btn users--item__btn">
        <button><i class="fa-solid fa-x"></i></button>
      </li>
    </ul>
    `;
    usersContainer.insertAdjacentHTML('afterbegin', html);
  });
};
// end: Apply layout user list

// start: delete user
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const showModal = () => {
  modal.classList.add('active');
  overlay.classList.add('active');
};

const renderModalContent = () => {
  showModal();
  modal.innerHTML = '';
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

const closeModal = () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
};

const showModalHandler = btn => {
  renderModalContent();

  const acpDeleteBtn = document.querySelector('.modal--delete__footer--delete');
  const exitDeleteBtn = document.querySelector('.modal--delete__footer--exit');

  acpDeleteBtn.addEventListener('click', e => {
    deleteUserHandler(btn);
    closeModal();
  });

  exitDeleteBtn.addEventListener('click', e => {
    closeModal();
  });
};

const deleteUserHandler = btn => {
  const currentParent = btn.closest('.admin__content--body__users--item');
  const currentUID = currentParent.getAttribute('uid');

  const userList = JSON.parse(localStorage.getItem('ACCOUNT__DATA'));

  let data;
  if (Array.isArray(userList)) {
    data = userList;
  } else {
    data = [userList];
  }

  data = data.filter(user => user.id !== currentUID);
  localStorage.setItem('ACCOUNT__DATA', JSON.stringify(data));
  renderUsersInfo(data);
  clickedDeleteBtnHandler();
  paginationHandler();
};

const clickedDeleteBtnHandler = () => {
  const btnDeleteElements = document.querySelectorAll('.admin__content--body__btn.users--item__btn button');
  btnDeleteElements.forEach(btn => {
    btn.addEventListener('click', e => {
      showModalHandler(btn);
    });
  });
};
// end: delete user

const init = data => {
  renderUsersInfo(data);
  clickedDeleteBtnHandler();
};

init();

// start: pagination
function paginationHandler() {
  const productItems = document.querySelectorAll('.admin__content--body__users ul');
  let currentPage = 0;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(productItems.length / itemsPerPage);
  let storeItemsPerPage = [];

  function renderLayoutPagination() {
    document.querySelector('.admin__content--body__users').innerHTML = '';
    const startIdx = currentPage * itemsPerPage;
    const endIdx = Math.min(currentPage * itemsPerPage + itemsPerPage, productItems.length);

    for (let i = startIdx; i < endIdx; i++) {
      storeItemsPerPage.push(productItems[i]);
    }
    storeItemsPerPage.forEach(item => {
      document.querySelector('.admin__content--body__users').appendChild(item);
    });
    storeItemsPerPage = [];
  }

  // Checking on first page
  function renderPaginationBtn() {
    const pagination = document.querySelector('.pagination__user');
    pagination.innerHTML = '';
    const html = `
      <button data-goto="${
        currentPage - 1
      }" data-of="${totalPages}" class="btn--inline pagination__user--pagination__btn--prev ${
      currentPage === 0 ? 'hide' : ''
    }">
        <i class="fa-solid fa-arrow-left"></i>
        <span>${currentPage}</span>
        <span> of ${totalPages}</span>
      </button>
      <span class="currentPage">${currentPage + 1}</span>
      <button data-goto="${
        currentPage + 1
      }" data-of="${totalPages}" class="btn--inline pagination__user--pagination__btn--next ${
      currentPage === totalPages - 1 || totalPages === 0 ? 'hide' : ''
    } "  >
        <span>${currentPage + 2}</span>
        <span> of ${totalPages}</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>`;
    pagination.insertAdjacentHTML('afterbegin', html);
    nextPageHandler();
    prevPageHandler();
  }

  function nextPageHandler() {
    const nextPageBtn = document.querySelector('.pagination__user--pagination__btn--next');
    nextPageBtn.addEventListener('click', e => {
      currentPage += 1;
      renderLayoutPagination();
      renderPaginationBtn();
    });
  }

  function prevPageHandler() {
    const prevPageBtn = document.querySelector('.pagination__user--pagination__btn--prev');
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
