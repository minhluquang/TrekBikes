const toggleMenuIcon = document.querySelector('.admin__content--header__cate');
const container = document.querySelector('.container');
const adminMenu = document.querySelector('.admin__taskbar');
const logoMenu = document.querySelector('.admin__taskbar--header__content img');

toggleMenuIcon.addEventListener('click', e => {
  const isHide = document.querySelector('.container.hide');

  console.log(isHide);
  if (isHide) {
    logoMenu.src = '../../../database/images/logo/logo_on_menu_adm.jpg';
  } else {
    logoMenu.src = '../../../database/images/logo/logo_on_hideMenu_adm.jpg';
  }
  container.classList.toggle('hide');
});

const logoutBtnOnAdminPage = document.querySelector('.admin__taskbar--footer');
logoutBtnOnAdminPage.addEventListener('click', e => {
  localStorage.removeItem('userLogin');
  window.location.href = window.location.origin + '/';
});

// start: Logic for filter products
const submitBtn = document.querySelector('.body__filter--action__filter');

let data;
submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const inputNameClientValue = document.querySelector('.body__filter--nameClient input').value.toLowerCase();
  const inputIdClientValue = document.querySelector('.body__filter--idClient input').value;
  if (!inputNameClientValue && !inputIdClientValue) {
    return;
  } else {
    const filterBtn = document.querySelector('.body__filter--action__filter');
    const usersContainer = document.querySelector('.admin__content--body__users');

    filterBtn.addEventListener('click', e => {
      e.preventDefault();

      window.scrollTo({
        top: usersContainer.getBoundingClientRect().top + window.scrollY - usersContainer.clientHeight,
        behavior: 'smooth'
      });
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

const resetBtn = document.querySelector('.body__filter--action__reset');
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
      deleteUserHandler(btn);
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
