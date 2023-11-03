const init = ['resize', 'load'];
const container = document.querySelector('.container ');
const menuBtn = document.querySelector('.admin__content--header__cate');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn-low-device');
const logoImg = document.querySelector('.admin__taskbar--header__content div');

init.forEach(item => {
  window.addEventListener(item, e => {
    if (window.innerWidth <= 1024) {
      logoImg.innerHTML = '<img src="../../database/images/logo/logo_on_menu_adm.jpg" alt="" />';

      menuBtn.addEventListener('click', e => {
        overlay.classList.add('active');
      });

      overlay.addEventListener('click', e => {
        container.classList.remove('hide');
      });

      closeBtn.classList.add('active');
      closeBtn.addEventListener('click', e => {
        container.classList.remove('hide');
        overlay.classList.remove('active');
      });
    } else {
      closeBtn.classList.remove('active');
    }
  });
});
