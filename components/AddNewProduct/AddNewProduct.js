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