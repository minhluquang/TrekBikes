const DUMMY_API = JSON.parse(localStorage.getItem('DUMMY_API'));
const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));

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

// kểm tra nếu có dữ liệu trong local storage
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
  // console.log('Số lượng loại sản phẩm:', numberOfTypes);
  updateDataInHTML('numberOfTypes', numberOfTypes);
  // In ra giá trị để kiểm tra
  // console.log('Số lượng sản phẩm: ', productCount);
  // console.log('Số lượng danh mục sản phẩm theo loại:', categoryCounts);
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
  // console.log('Số lượng thành viên:', memberCount);
} else {
  console.log('Không có dữ liệu thành viên trong localStorage');
}

// Cập nhật giá trị trong HTML
updateDataInHTML('memberCount', memberCount);

// Sử dụng giá trị memberCount ở đây hoặc thực hiện các xử lý khác

// Đọc dữ liệu từ local storage
const usersString2 = localStorage.getItem('Users');
let users = [];

// Hàm để kiểm tra và đếm số lượng đơn hàng đã và chưa xử lý
function countOrdersStatus(data) {
  let processedCount = 0;
  let unprocessedCount = 0;

  data?.forEach(user => {
    user.cart.forEach(order => {
      order.product.forEach(item => {
        if (item.processed) {
          processedCount++;
        } else {
          unprocessedCount++;
        }
      });
    });
  });

  return { processed: processedCount, unprocessed: unprocessedCount };
}

// Gọi hàm và in kết quả

const ordersStatusCount = countOrdersStatus(DUMMY_API);
updateDataInHTML('unprocessedOrderCount', ordersStatusCount.unprocessed);
updateDataInHTML('processedOrderCount', ordersStatusCount.processed);
// console.log(`Số lượng đơn hàng đã xử lý: ${ordersStatusCount.processed}`);
// console.log(`Số lượng đơn hàng chưa xử lý: ${ordersStatusCount.unprocessed}`);

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
  // console.log('Số lượng đơn hàng chưa xử lí:', pendingOrdersCount);
  // console.log('Số lượng đơn hàng đã xử lí:', processedOrdersCount);
} else {
  console.log('Dữ liệu người dùng không phải là mảng hợp lệ.');
}

// Tính tổng tiền thu nhập của shop
let arrayTemp = [];
//const DUMM_API = [];
DUMMY_API?.forEach(idUser => {
  idUser.cart.forEach(order => {
    order.product.forEach(item => {
      if (item.processed) {
        arrayTemp.push({ id: item.id, quantity: item.quantity });
      }
    });
  });
});

let total_Price = 0;

arrayTemp.forEach(item => {
  const product = DUMMY_PRODUCTS.find(prod => prod.ID === item.id);
  if (product) {
    const productPrice = parseFloat(product.price.replace('VND', '').replace(/\./g, '').replace(',', '.'));
    total_Price += productPrice * item.quantity;
  }
});

document.querySelector('.box #producttotalprice').innerText = total_Price.toLocaleString('vi-VN') + ' VNĐ';

// console.log('Những sản phẩm có processed là true:', arrayTemp);
// console.log('Tổng giá tiền của các sản phẩm: ', total_Price.toLocaleString('vi-VN') + 'VND');

// Thống kê từng loại sản phẩm
const productBought = [];
const statisticType = [
  { type: 'mountain', quantity: 0, totalPrice: 0 },
  { type: 'touring', quantity: 0, totalPrice: 0 },
  { type: 'road', quantity: 0, totalPrice: 0 },
  { type: 'kids', quantity: 0, totalPrice: 0 }
];

// Trích sản phẩm, số lượng người dùng đã mua
DUMMY_API.forEach(user => {
  user.cart.forEach(order => {
    if (order.product[0].processed) {
      productBought.push({
        id: order.product[0].id,
        quantity: order.product[0].quantity
      });
    }
  });
});

// Hàm chuyển đổi định dạng price trong database sang số có thể sử dụng được
function convertToPrice(price) {
  // Ex: 105.000.000 VND -> Left is 105.000.000
  const getLeftString = price.split(' ')[0];
  const convertToTruePrice = +getLeftString.replaceAll('.', '');
  return convertToTruePrice;
}

// Đếm số sản phẩm theo loại và tính giá tiền
DUMMY_PRODUCTS.forEach(product => {
  productBought.forEach(productB => {
    if (productB.id === product.ID) {
      statisticType.forEach(statisticItem => {
        if (statisticItem.type === product.type) {
          statisticItem.quantity += productB.quantity;
          statisticItem.totalPrice += convertToPrice(product.price) * productB.quantity;  
        }
      });
    }
  });
});

const mountainTotalPriceElement = document.querySelector('#mountainTotalPrice');
const roadTotalPriceElement = document.querySelector('#roadTotalPrice');
const touringTotalPriceElement = document.querySelector('#touringTotalPrice');
const kidsTotalPriceElement = document.querySelector('#kidsTotalPrice');

const mountainTotalQuantityElement = document.querySelector('#mountainTotalQuantity');
const roadTotalQuantityElement = document.querySelector('#roadTotalQuantity');
const touringTotalQuantityElement = document.querySelector('#touringTotalQuantity');
const kidsTotalQuantityElement = document.querySelector('#kidsTotalQuantity');


statisticType.forEach(type => {
  if (type.type === 'mountain') {
    mountainTotalPriceElement.textContent = type.totalPrice.toLocaleString('vi-VN') + ' VNĐ';
    mountainTotalQuantityElement.textContent = type.quantity;
  } else if (type.type === 'road') {
    roadTotalPriceElement.textContent = type.totalPrice.toLocaleString('vi-VN') + ' VNĐ';
    roadTotalQuantityElement.textContent = type.quantity;
  } else if (type.type === 'touring') {
    touringTotalPriceElement.textContent = type.totalPrice.toLocaleString('vi-VN') + ' VNĐ';
    touringTotalQuantityElement.textContent = type.quantity;
  } else if (type.type === 'touring') {
    kidsTotalPriceElement.textContent = type.totalPrice.toLocaleString('vi-VN') + ' VNĐ';
    kidsTotalQuantityElement.textContent = type.quantity;
  }
});
