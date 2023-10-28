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

// start: Open set status
const editStatusItems = document.querySelectorAll('.isNonActiveStatus .products--item__status i');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnExit = document.querySelector('.modal__action--exit');
const btnProcess = document.querySelector('.modal__action--process');

let currentProcessItem;

editStatusItems.forEach((item, idx) => {
  item.addEventListener('click', e => {
    modal.classList.add('active');
    overlay.classList.add('active');
    currentProcessItem = idx;
  });
});

const closeModal = () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
};

overlay.addEventListener('click', closeModal);

btnExit.addEventListener('click', e => {
  e.preventDefault();
  closeModal();
});

btnProcess.addEventListener('click', e => {
  e.preventDefault();
  const statusContext = document.querySelectorAll('.isNonActiveStatus')[currentProcessItem];
  statusContext.classList.remove('isNonActiveStatus');
  statusContext.classList.add('isActiveStatus');
  statusContext.querySelector('.products--item__status').textContent = 'Đã xử lý';
  closeModal();
});
// end: Open set status

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
