let isLoggedIn = false;
const popUp = document.querySelector('.pop-up');
// ============================= Start: SHOW FORM REG/LOG
const userBtn = document.querySelector('.header__bottom--extention-user');
const overlay = document.querySelector('.overlay');
const userWrapper = document.querySelector('.user__wrapper');

const openFormRegister = () => {
  if (!isLoggedIn) {
    userWrapper.classList.add('user__active');
    userWrapper.classList.add('register__active');
    overlay.classList.add('active__overlay');
  }
};

userBtn.addEventListener('click', e => {
  checkLoggedIn();
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

signinBtn.addEventListener('click', e => {
  userWrapper.classList.add('login__active');
  userWrapper.classList.remove('register__active');
});

//Change to login when on low device
const signinBtnOnLowDevice = document.querySelector('.signin button');
const registerAgainOnLowDevice = document.querySelector('.register__again button');

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

// Open form reg/login on low device by hide menu
const userIconHideMenu = document.querySelector('.hide__menu--list__extention .header__bottom--extention-user');
const hideMenu = document.querySelector('.hide__menu');

userIconHideMenu.addEventListener('click', e => {
  openFormRegister();
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
const registerNameInput = document.querySelector('.register__info--input-name');
const registerEmailInput = document.querySelector('.register__info--input-email');
const registerPasswordInput = document.querySelector('.register__info--input-password');

const showMessageNameRes = document.querySelector('.register__info--input__full-name p');
const showMessageEmailRes = document.querySelector('.register__info--input__full-email p');
const showMessagePasswordRes = document.querySelector('.register__info--input__full-password p');

registerSubmitBtn.addEventListener('click', e => {
  e.preventDefault();
  const name = registerNameInput.value.trim();
  const email = registerEmailInput.value.trim();
  const password = registerPasswordInput.value.trim();

  let isValidName = true;
  let isValidEmail = true;
  let isValidPassword = true;

  if (name.length === 0) {
    showMessageNameRes.innerText = '* Bạn chưa nhập tên đầy đủ';
    isValidName = false;
  } else {
    showMessageNameRes.innerText = '';
  }

  if (email.length === 0) {
    showMessageEmailRes.innerText = '* Bạn chưa nhập email';
    isValidEmail = false;
  } else if (!email.includes('@')) {
    showMessageEmailRes.innerText = '* Email không hợp lệ';
    isValidEmail = false;
  } else {
    if (ACCOUNT_DATA.length > 0) {
      const isExist = ACCOUNT_DATA.find(account => account.email === email);
      if (isExist) {
        showMessageEmailRes.innerText = '* Email đã tồn tại';
        isValidEmail = false;
      } else {
        showMessageEmailRes.innerText = '';
      }
    }
  }

  if (password.length === 0) {
    showMessagePasswordRes.innerText = '* Bạn chưa nhập mật khẩu';
    isValidPassword = false;
  } else if (password.length <= 8) {
    showMessagePasswordRes.innerText = '* Mật khẩu phải trên 8 ký tự';
    isValidPassword = false;
  } else {
    showMessagePasswordRes.innerText = '';
  }

  const isValidRegister = isValidName && isValidEmail && isValidPassword;

  if (isValidRegister) {
    ACCOUNT_DATA.push({ name: name, email: email, password: password });

    registerNameInput.value = '';
    registerEmailInput.value = '';
    registerPasswordInput.value = '';

    localStorage.setItem('ACCOUNT_DATA', JSON.stringify(ACCOUNT_DATA));
  }
});

const getData = () => {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem('ACCOUNT_DATA'));
  if (dataFromLocalStorage) {
    const updateData = [...ACCOUNT_DATA, ...dataFromLocalStorage];
    ACCOUNT_DATA.length = 0;
    ACCOUNT_DATA.push(...updateData);
  }
};

getData();
// =========================== end: LOGIC FOR REGISTER ===========================

// =========================== start: LOGIC FOR REGISTER ===========================
const loginSubmitBtn = document.querySelector('.login__info--submit');
const loginEmailInput = document.querySelector('.login__info--input-email');
const loginPasswordInput = document.querySelector('.login__info--input-password');

const showMessageEmailLog = document.querySelector('.login__info--input__full-email p');
const showMessagePasswordLog = document.querySelector('.login__info--input__full-password p');

loginSubmitBtn.addEventListener('click', e => {
  e.preventDefault();

  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value.trim();

  let isValidEmail = true;
  let isValidPassword = true;

  if (email.length === 0) {
    showMessageEmailLog.innerText = '* Bạn chưa nhập email';
    isValidEmail = false;
  } else if (!email.includes('@') && email !== 'admin') {
    showMessageEmailLog.innerText = '* Email không hợp lệ';
    isValidEmail = false;
  } else {
    showMessageEmailLog.innerText = '';
  }

  if (password.length === 0) {
    showMessagePasswordLog.innerText = '* Bạn chưa nhập mật khẩu';
    isValidPassword = false;
  } else if (password.length <= 8 && password !== 'admin') {
    showMessagePasswordLog.innerText = '* Mật khẩu phải trên 8 ký tự';
    isValidPassword = false;
  } else {
    showMessagePasswordLog.innerText = '';
  }

  const isValidLogin = isValidEmail && isValidPassword;

  if (isValidLogin) {
    const findAccount = ACCOUNT_DATA.find(account => {
      return account.email === email;
    });

    if (findAccount) {
      if (findAccount.password === password) {
        loginEmailInput.value = '';
        loginPasswordInput.value = '';
        localStorage.setItem('userLogin', JSON.stringify(findAccount));
        showPopup();
        location.reload();
        checkLoggedIn();
      } else {
        showMessagePasswordLog.innerText = '* Bạn nhập sai mật khẩu';
      }
    } else {
      showMessageEmailLog.innerText = '* Email không tồn tại';
    }
  }
});

// popup section
const showPopup = () => {
  popUp.classList.add('active');
  userWrapper.classList.remove('user__active');
  userWrapper.classList.remove('register__active');
  overlay.classList.add('active__overlay');
};

const popupBtn = document.querySelector('.pop-up button');
popupBtn.addEventListener('click', e => {
  popUp.classList.remove('active');
  hideFormRegLogin();
});

// =========================== end: LOGIC FOR REGISTER ===========================

// =========================== start: IF LOGGEDIN ===========================
const welcomeUser = document.querySelector('.user-welcome');
const userName = welcomeUser.querySelector('p:last-child');
const userList = document.querySelector('.header__bottom--user__list');

const checkLoggedIn = () => {
  const userLogin = JSON.parse(localStorage.getItem('userLogin'));
  const userListOnLowDevice = document.querySelector('.hide__menu--user__list');
  const userNameOnLowDevice = document.querySelector(
    '.hide__menu--list__extention .header__bottom--extention-user span'
  );

  if (userLogin) {
    isLoggedIn = true;
    userName.innerText = userLogin.name;
    userNameOnLowDevice.innerText = userLogin.name;
    welcomeUser.classList.add('active');
    userIconHideMenu.removeEventListener('click', openFormRegister);
    userBtn.removeEventListener('click', openFormRegister);
    userBtn.addEventListener('mouseover', e => {
      userList.style.display = 'block';
    });

    // FOR ACOUNT BTN ON HIDE MENU
    userIconHideMenu.classList.add('active-down');
    userIconHideMenu.addEventListener('click', e => { 
      userListOnLowDevice.classList.toggle('active');
      userIconHideMenu.classList.toggle('active-down');
      userIconHideMenu.classList.toggle('active-up');
    });
  } else {
    userList.style.display = 'none';
    userIconHideMenu.addEventListener('click', e => {
      hideMenu.classList.remove('active');
    });
  }
};

checkLoggedIn();
// =========================== end: IF LOGGEDIN ===========================

// =========================== start: LOGOUT LOGIC ===========================
const logoutBtn = document.querySelector('.logout');
const logoutLowDeviceBtn = document.querySelector('.hide__menu--list__type button');

const logoutHandler = () => {
  localStorage.removeItem('userLogin');
  location.reload();
};

logoutLowDeviceBtn.addEventListener('click', logoutHandler);

logoutBtn.addEventListener('click', logoutHandler);
