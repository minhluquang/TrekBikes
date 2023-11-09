const taskbarItems = document.querySelectorAll('.admin__taskbar--body__list li');
const contentElements = document.querySelectorAll('.admin__content');

const homeContent = document.querySelector('#manageHome');
const orderContent = document.querySelector('#manageOrderList');
const userContent = document.querySelector('#manageUserList');

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
      homeContent.classList.remove('hideItem');
    } else if (pageToView === 'order') {
      orderContent.classList.remove('hideItem');
    } else if (pageToView === 'user') {
      userContent.classList.remove('hideItem');
    }
  });
});

const init = () => {
  hideContents();
  homeContent.classList.remove('hideItem');
};

init();
