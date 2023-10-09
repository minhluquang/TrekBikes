// ============================= Start: SHOW FORM REG/LOG
const userBtn = document.querySelector('.header__bottom--extention-user');
const registerForm = document.querySelector('.register');
const overlay = document.querySelector('.overlay');
const closeBtnFormRes = document.querySelector('.register__info .form__close');
const userWrapper = document.querySelector('.user__wrapper');

const openFormRegister = () => {
  userWrapper.classList.add('user__active');
  userWrapper.classList.add('register__active');
  overlay.classList.add('active__overlay');
};

userBtn.addEventListener('click', e => {
  openFormRegister();
});

//Click btn at section4
const section4Btn = document.querySelector('.section--4 button');
section4Btn.addEventListener('click', e => {
  openFormRegister();
});
// ============================= End: SHOW FORM REG/LOG

// ============================= Start: Switch mode reg/log
//Change to login
const signinBtn = document.querySelector('.signin button');
const loginForm = document.querySelector('.login');
const closeBtnFormLogin = document.querySelector('.login__info .form__close');

signinBtn.addEventListener('click', e => {
  userWrapper.classList.add('login__active');
  userWrapper.classList.remove('register__active');
});

//Change to register when show login form
const registerAgain = document.querySelector('.register__again');
registerAgain.addEventListener('click', e => {
  userWrapper.classList.add('register__active');
  userWrapper.classList.remove('login__active');
});
// ============================= end: Switch mode reg/log

// ============================= Start: HIDE FORM
const hideFormRegLogin = () => {
  overlay.classList.remove('active__overlay');
  userWrapper.classList.remove('user__active');
  userWrapper.classList.remove('register__active');
  userWrapper.classList.remove('login__active');
};

closeBtnFormRes.addEventListener('click', e => {
  hideFormRegLogin();
});

closeBtnFormLogin.addEventListener('click', e => {
  hideFormRegLogin();
});

overlay.addEventListener('click', e => {
  hideFormRegLogin();
});
// ============================= End: HIDE FORM

// =========================== start: LOGIC FOR REGISTER ===========================
const registerSubmitBtn = document.querySelector('.register__info--submit');

const registerNameValue = document.querySelector('.register__info--input-name');
const registerEmailValue = document.querySelector('.register__info--input-name');
const registerPasswordValue = document.querySelector('.register__info--input-email');

registerSubmitBtn.addEventListener('click', e => {
  const name = registerNameValue.value.trim();
  const email = registerEmailValue.value.trim();
  const password = registerPasswordValue.value.trim();
});
