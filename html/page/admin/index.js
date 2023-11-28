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

// Set innerText name of admin was logged
const nameAdmin = document.querySelector('.admin__content--header__user strong');
const currentAdminLogged = JSON.parse(localStorage.getItem('User'));
nameAdmin.textContent = currentAdminLogged.name;

const usersString = localStorage.getItem('Users');

// Check if user data exists in local storage
if (usersString) {
  // Parse the JSON string into an array of user objects
  const users = JSON.parse(usersString);

  // Assuming you have a logged-in user (replace 'loggedInUserId' with the actual ID of the logged-in user)
  const loggedInUserId = 'replaceWithActualUserId';
  const loggedInUser = users.find(user => user.id === loggedInUserId);

  // Update the HTML element with the username
  const usernameParagraph = document.getElementById('username');
  if (usernameParagraph && loggedInUser) {
    usernameParagraph.innerHTML = `<i class="fa-solid fa-user-shield"></i>${loggedInUser.name}`;
  }
} else {
  console.log('No user data in local storage');
}

// Hàm đếm số lượng sản phẩm theo loại
const countProductsByType = (products, targetType) => {
  return products.filter(product => product.type === targetType).length;
};

// Hàm cập nhật giá trị trong HTML
const updateDataInHTML = (targetId, count) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.innerText = count;
  }
};

// Hàm đếm số lượng danh mục sản phẩm theo loại
const countCategories = products => {
  // Tạo một Set để lưu trữ các loại duy nhất
  const uniqueTypes = new Set();

  // Duyệt qua mảng sản phẩm và thêm các loại vào Set
  products.forEach(product => {
    uniqueTypes.add(product.type);
  });

  // Tạo một đối tượng để lưu trữ số lượng sản phẩm cho từng loại
  const categoryCounts = {};

  // Duyệt qua Set và đếm số lượng sản phẩm cho mỗi loại
  uniqueTypes.forEach(type => {
    const count = products.filter(product => product.type === type).length;
    categoryCounts[type] = count;
  });

  return categoryCounts;
};

// Đọc dữ liệu từ local storage
const storedProducts = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));

// Kiểm tra nếu có dữ liệu trong local storage
if (storedProducts) {
  // Sử dụng dữ liệu từ local storage
  const DUMMY_PRODUCTS = storedProducts;

  // Đếm số lượng sản phẩm
  const productCount = DUMMY_PRODUCTS.length;

  // Đếm số lượng danh mục sản phẩm theo type
  const categoryCounts = countCategories(DUMMY_PRODUCTS);
  updateDataInHTML('productCount', productCount);
  // Cập nhật giá trị trong HTML
  for (const type in categoryCounts) {
    if (Object.hasOwnProperty.call(categoryCounts, type)) {
      updateDataInHTML(`categoryCount${type.charAt(0).toUpperCase() + type.slice(1)}`, categoryCounts[type]);
    }
  }

  // Hiển thị số lượng loại (type)
  const numberOfTypes = Object.keys(categoryCounts).length;
  console.log('Số lượng loại sản phẩm:', numberOfTypes);
  updateDataInHTML('numberOfTypes', numberOfTypes);
  // In ra giá trị để kiểm tra
  console.log('Số lượng sản phẩm: ', productCount);
  console.log('Số lượng danh mục sản phẩm theo loại:', categoryCounts);
} else {
  console.log('Không có dữ liệu trong local storage');
}

// Đọc dữ liệu từ local storage
const accountsString = localStorage.getItem('accounts');

// Khởi tạo biến đếm số thành viên
let memberCount = 0;

// Kiểm tra xem dữ liệu có tồn tại không
if (accountsString) {
  // Chuyển đổi JSON string thành mảng đối tượng JavaScript
  const accounts = JSON.parse(accountsString);

  // Đếm số lượng thành viên
  memberCount = accounts.length;

  // Hiển thị số lượng thành viên trong console hoặc thực hiện các xử lý khác
  console.log('Số lượng thành viên:', memberCount);
} else {
  console.log('Không có dữ liệu thành viên trong localStorage');
}

// Cập nhật giá trị trong HTML

updateDataInHTML('memberCount', memberCount);

// Sử dụng giá trị memberCount ở đây hoặc thực hiện các xử lý khác
// Assuming you have the 'accounts' array from local storage
// Đọc dữ liệu từ local storage
const usersString2 = localStorage.getItem('Users');
let users = [];

// Kiểm tra và xử lý chuỗi JSON
try {
  users = JSON.parse(usersString);
} catch (error) {
  console.error('Lỗi khi phân tích chuỗi JSON người dùng:', error);
}

// Kiểm tra xem users có phải là mảng hay không
if (Array.isArray(users)) {
  // Tính toán số lượng đơn hàng chưa và đã xử lí
  let pendingOrdersCount = 0;
  let processedOrdersCount = 0;

  // Duyệt qua mảng users và cart để kiểm tra từng đơn hàng
  users.forEach(user => {
    if (Array.isArray(user.cart)) {
      user.cart.forEach(order => {
        if (Array.isArray(order.product)) {
          order.product.forEach(product => {
            // Kiểm tra trạng thái xử lí của đơn hàng
            if (product.processed) {
              processedOrdersCount++;
            } else {
              pendingOrdersCount++;
            }
          });
        }
      });
    }
  });

  // Hiển thị kết quả
  console.log('Số lượng đơn hàng chưa xử lí:', pendingOrdersCount);
  console.log('Số lượng đơn hàng đã xử lí:', processedOrdersCount);
} else {
  console.log('Dữ liệu người dùng không phải là mảng hợp lệ.');
}
