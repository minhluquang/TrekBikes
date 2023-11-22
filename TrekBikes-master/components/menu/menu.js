const hideMenuBtn = document.querySelector('.header__bottom--hide-menu');
const closeMenuBtn = document.querySelector('.hide__menu--close');
const hideMenu = document.querySelector('.hide__menu');
const iconUp = document.querySelector('.header__bottom--extention__icon--up');
const iconDown = document.querySelector('.header__bottom--extention__icon--down');

//Open hide menu
hideMenuBtn.addEventListener('click', e => {
  hideMenu.classList.add('active');
  overlay.classList.add('active__overlay');
});

//Close menu function
const closeMenu = () => {
  hideMenu.classList.remove('active');
  overlay.classList.remove('active__overlay');
};

closeMenuBtn.addEventListener('click', e => {
  closeMenu();
});

overlay.addEventListener('click', e => {
  closeMenu();
});

//Account click event
const userBtn = document.querySelector('.hide__menu--list__extention .header__bottom--extention-user');
const userWrapper = document.querySelector('.user__wrapper');

// userBtn.addEventListener('click', (e) => {
//   hideMenu.classList.remove('active');
// })

const openFormRegister = () => {
  userWrapper.classList.add('user__active');
  userWrapper.classList.add('register__active');
  overlay.classList.add('active__overlay');
};

//Show more catelogy
const catelogyBtn = document.querySelector('.hide__menu--list__extention .header__bottom--extention-cate');
const hideMenuList = document.querySelector('.hide__menu--list__types');

catelogyBtn.addEventListener('click', e => {
  hideMenuList.classList.toggle('active');
  iconDown.classList.toggle('hidden');
  iconUp.classList.toggle('active');
});
