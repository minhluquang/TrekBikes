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
const signinBtn = document.querySelector('.register__background button');
const loginForm = document.querySelector('.login');
const closeBtnFormLogin = document.querySelector('.login__info .form__close');

signinBtn.addEventListener('click', e => {
  userWrapper.classList.add('login__active');
  userWrapper.classList.remove('register__active');
});

//Change to login when on low device
const signinBtnOnLowDevice = document.querySelector('.signin button');
const registerAgainOnLowDevice = document.querySelector('.register__again button');
const loginInfo = document.querySelector('.login__info');

signinBtnOnLowDevice.addEventListener('click', e => {
  userWrapper.classList.add('login__active');
  userWrapper.classList.remove('register__active');
});

registerAgainOnLowDevice.addEventListener('click', e => {
  userWrapper.classList.remove('login__active');
  userWrapper.classList.add('register__active');
});

//Change to register when show login form
const registerAgain = document.querySelector('.login__background button');
registerAgain.addEventListener('click', e => {
  userWrapper.classList.add('register__active');
  userWrapper.classList.remove('login__active');
});
// ============================= end: Switch mode reg/log

// ============================= Start: HIDE FORM
const hideFormRegLogin = () => {
  userWrapper.style.animation = `fade 1s ease-in`;
  setTimeout(() => {
    overlay.classList.remove('active__overlay');
    userWrapper.classList.remove('user__active');
    userWrapper.classList.remove('register__active');
    userWrapper.classList.remove('login__active');
    userWrapper.style.animation = `bottomUp 1s ease-in-out`;
  }, 900);
};

overlay.addEventListener('click', e => {
  hideFormRegLogin();
});

// Close form by button
const btnCloseGlobal = document.querySelector('.user__wrapper .form__close--global');
btnCloseGlobal.addEventListener('click', e => {
  hideFormRegLogin();
});
// ============================= End: HIDE FORM

// =========================== start: LOGIC FOR REGISTER ===========================
import ACCOUNT_DATA from '../database/accounts.js';

const registerSubmitBtn = document.querySelector('.register__info--submit');
const registerNameValue = document.querySelector('.register__info--input-name');
const registerEmailValue = document.querySelector('.register__info--input-email');
const registerPasswordValue = document.querySelector('.register__info--input-password');

const registerInputFullName = document.querySelector('.register__info--input__full-name');
const registerInputEmail = document.querySelector('.register__info--input__full-email');
const registerInputPassword = document.querySelector('.register__info--input__full-password');

let isValidRegister = true;

registerSubmitBtn.addEventListener('click', e => {
  e.preventDefault();
  const name = registerNameValue.value.trim();
  const email = registerEmailValue.value.trim();
  const password = registerPasswordValue.value.trim();

  if (name.length === 0) {
    registerInputFullName.classList.add('active');
    isValidRegister = false;
  } else {
    registerInputFullName.classList.remove('active');
    isValidRegister = true;
  }

  if (email.length === 0 || !email.includes('@')) {
    registerInputEmail.classList.add('active');
    isValidRegister = false;
  } else {
    registerInputEmail.classList.remove('active');
    isValidRegister = true;
  }

  if (password.length <= 8) {
    registerInputPassword.classList.add('active');
    isValidRegister = false;
  } else {
    registerInputPassword.classList.remove('active');
    isValidRegister = true;
  }

  if (isValidRegister) {
    ACCOUNT_DATA.push({ name: name, email: email, password: password });

    registerNameValue.value = '';
    registerEmailValue.value = '';
    registerPasswordValue.value = '';

    localStorage.setItem('ACCOUNT_DATA', JSON.stringify(ACCOUNT_DATA));
  }
});

const getData = () => {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem('ACCOUNT_DATA'));
  const updateData = [...ACCOUNT_DATA, ...dataFromLocalStorage];
  ACCOUNT_DATA.length = 0
  ACCOUNT_DATA.push(...updateData);
};

getData();
// =========================== end: LOGIC FOR REGISTER ===========================

