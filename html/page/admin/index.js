const User = JSON.parse(localStorage.getItem('User'));

// start: Xử lý đóng mở taskbar
const toggleMenuIcon = document.querySelector('.admin__content--header__cate');
const container = document.querySelector('.container');
const adminMenu = document.querySelector('.admin__taskbar');
const logoMenu = document.querySelector('.admin__taskbar--header__content img');

toggleMenuIcon.addEventListener('click', e => {
  const isHide = document.querySelector('.container.hide');

  if (isHide) {
    logoMenu.src = '../../../database/images/logo/logo_on_menu_adm.jpg';
  } else {
    logoMenu.src = '../../../database/images/logo/logo_on_hideMenu_adm.jpg';
  }
  container.classList.toggle('hide');
});

// Xử lý click vào img thì về lại trang chủ
logoMenu.addEventListener('click', e => {
  window.location.href = window.location.origin + '/index.html';
});

// Xử lý đăng xuất tài khoản
const logoutBtnOnAdminPage = document.querySelector('.admin__taskbar--footer');
logoutBtnOnAdminPage.addEventListener('click', e => {
  localStorage.removeItem('User');
  window.location.href = window.location.origin + '/';
});

const taskbarItems = document.querySelectorAll('.admin__taskbar--body__list li');
const contentElements = document.querySelectorAll('.admin__content');

const homeContent = document.querySelector('#manageHome');
const orderContent = document.querySelector('#manageOrderList');
const userContent = document.querySelector('#manageUserList');
const productContent = document.getElementById('manageProduct');

// Xóa tất cả class active của các thẻ trên thanh taskbar
const deleteActiveItems = () => {
  taskbarItems.forEach(item => {
    item.classList.remove('active');
  });
};

// Ẩn đi hết những nội dung các page
const hideContents = () => {
  contentElements.forEach(content => {
    content.classList.add('hideItem');
  });
};

taskbarItems.forEach(item => {
  item.addEventListener('click', e => {
    if (item.classList.contains('active')) {
      return;
    }

    deleteActiveItems();
    hideContents();

    item.classList.add('active');

    const pageToView = item.getAttribute('id');

    if (pageToView === 'home') {
      // Nếu trên local có dữ liệu `isNeedReloadPageAdmin = true`
      // tức là yêu cầu reload lại page để cập nhật giá trị mới
      const isReload = JSON.parse(localStorage.getItem('isNeedReloadPageAdmin'));

      if (isReload) {
        location.reload();
        localStorage.setItem('isNeedReloadPageAdmin', JSON.stringify(false));
      }

      homeContent.classList.remove('hideItem');
    } else if (pageToView === 'order') {
      orderContent.classList.remove('hideItem');
    } else if (pageToView === 'user') {
      userContent.classList.remove('hideItem');
    } else if (pageToView === 'product') {
      productContent.classList.remove('hideItem');
    }
  });
});

const init = () => {
  hideContents();
  homeContent.classList.remove('hideItem');
};

init();

// Sét name admin UI cho page admin
const nameUserAdmin = document.querySelector('.admin__content--header__user p strong');
nameUserAdmin.textContent = User.name;
