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

// THỐNG KÊ TỪNG LOẠI =====================================================================

// Bật modal thống kê
const modal = document.querySelector('.modal_statistic');
const modalTableContent = modal.querySelector('.table_body');
const overlay = document.querySelector('.overlay');

const mountainBtn = document.querySelector('#mountainBtn');
const touringBtn = document.querySelector('#touringBtn');
const roadBtn = document.querySelector('#roadBtn');
const kidsBtn = document.querySelector('#kidsBtn');

// Xử lý click ==============================
const exitBtn = document.querySelector('.table-exit-btn');
exitBtn.addEventListener('click', e => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', e => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});
// ==============================
// Xử lý thuật toán thống kê rõ ràng theo từng loại ==================
const mountainStatistic = [];
const roadStatistic = [];
const touringStatistic = [];
const kidsStatistic = [];

DUMMY_API.forEach(userCart => {
  userCart.cart.forEach(cart => {
    const whatTypeIs = DUMMY_PRODUCTS.find(
      product => product.ID === cart?.product[0]?.id && cart?.product[0]?.processed
    );

    // Nếu tìm không thỏa thì thôi, khỏi cần tính tiếp
    if (!whatTypeIs) {
      return;
    }

    if (whatTypeIs.type === 'mountain') {
      mountainStatistic.push({
        id: whatTypeIs.ID,
        price: whatTypeIs.price,
        name: whatTypeIs.name,
        quantitySold: cart.product[0].quantity,
        dateCreate: cart.dateCreate
      });
    } else if (whatTypeIs.type === 'road') {
      roadStatistic.push({
        id: whatTypeIs.ID,
        price: whatTypeIs.price,
        name: whatTypeIs.name,
        quantitySold: cart.product[0].quantity,
        dateCreate: cart.dateCreate
      });
    } else if (whatTypeIs.type === 'touring') {
      touringStatistic.push({
        id: whatTypeIs.ID,
        price: whatTypeIs.price,
        name: whatTypeIs.name,
        quantitySold: cart.product[0].quantity,
        dateCreate: cart.dateCreate
      });
    } else if (whatTypeIs.type === 'kids') {
      kidsStatistic.push({
        id: whatTypeIs.ID,
        price: whatTypeIs.price,
        name: whatTypeIs.name,
        quantitySold: cart.product[0].quantity,
        dateCreate: cart.dateCreate
      });
    }
  });
});

const groupMountainQuantityStatistic = [];
const groupRoadQuantityStatistic = [];
const groupTouringQuantityStatistic = [];
const groupKidsQuantityStatistic = [];

function calculateTotalQuantitySold(inputArray, outputArray) {
  inputArray.forEach(product => {
    // Kiểm tra thử xem trong mảng group đã có id sp đó chưa
    const isExistInGroupArray = outputArray.find(groupProduct => groupProduct.id === product.id);
    // Nếu chưa thì add vào mảng group
    if (!isExistInGroupArray) {
      outputArray.push({ ...product });
    }
    // Nếu có rồi thì chỉ cần tăng số lượng trùng id
    else {
      const isIndex = outputArray.findIndex(groupProduct => groupProduct.id === product.id);
      const quantitySoldUpdate = outputArray[isIndex].quantitySold + product.quantitySold;
      outputArray[isIndex].quantitySold = quantitySoldUpdate;
    }
  });
}

calculateTotalQuantitySold(mountainStatistic, groupMountainQuantityStatistic);
calculateTotalQuantitySold(roadStatistic, groupRoadQuantityStatistic);
calculateTotalQuantitySold(touringStatistic, groupTouringQuantityStatistic);
calculateTotalQuantitySold(kidsStatistic, groupKidsQuantityStatistic);

function renderDetailStatisticUniqueType(inputGroupArray) {
  modal.classList.add('active');
  overlay.classList.add('active');

  modalTableContent.innerHTML = '';

  inputGroupArray.forEach(item => {
    const html = `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantitySold}</td>
      </tr>
    `;
    modalTableContent.insertAdjacentHTML('afterbegin', html);
  });
}

// Xử lý khi bấm nút lọc thì mới hiển thị thống kê từng loại
const filterStatisticBtn = document.querySelector('#filterStatisticBtn');

filterStatisticBtn.addEventListener('click', e => {
  // Khởi tạo mạng mới để có thể lọc ngày phù hợp rồi add vào
  // từ đó chỉ render mảng này
  const validMountainStatistic = [];
  const validRoadStatistic = [];
  const validTouringStatistic = [];
  const validKidsStatistic = [];

  const filterStatisticStartDate = document.querySelector('#filterStatisticStartDate input');
  const filterStatisticEndDate = document.querySelector('#filterStatisticEndDate input');

  const filterStatisticStartDateMessage = document.querySelector('.filterStatisticStartDateMessage');
  const filterStatisticEndDateMessage = document.querySelector('.filterStatisticEndDateMessage');

  let isValidStartDate = true;
  let isValidEndDate = true;

  // Tháng vì lấy tháng hiện tại nhưng trong new date thì
  // phải trừ đi -1 mới lấy được tháng hiện tại
  const startDateDay = filterStatisticStartDate.value.split('-')[2];
  const startDateMonth = +filterStatisticStartDate.value.split('-')[1] - 1;
  const startDateYear = filterStatisticStartDate.value.split('-')[0];

  const endDateDay = filterStatisticEndDate.value.split('-')[2];
  const endDateMonth = +filterStatisticEndDate.value.split('-')[1] - 1;
  const endDateYear = filterStatisticEndDate.value.split('-')[0];

  const convertStartDate = new Date(startDateYear, startDateMonth, startDateDay);
  const convertEndDate = new Date(endDateYear, endDateMonth, endDateDay);

  if (filterStatisticStartDate.value === '') {
    isValidStartDate = false;
    filterStatisticStartDateMessage.innerHTML = '* Vui lòng chọn ngày bắt đầu';
  } else {
    isValidStartDate = true;
    filterStatisticStartDateMessage.innerHTML = '';
  }

  if (filterStatisticEndDate.value === '') {
    isValidEndDate = false;
    filterStatisticEndDateMessage.innerHTML = '* Vui lòng chọn ngày kết thúc';
  } else if (convertEndDate < convertStartDate) {
    isValidEndDate = false;
    filterStatisticEndDateMessage.innerHTML = '* Vui lòng chọn ngày kết thúc lớn hơn hoặc bằng ngày bắt đầu';
  } else {
    isValidEndDate = true;
    filterStatisticEndDateMessage.innerHTML = '';
  }

  const isValidForm = isValidStartDate && isValidEndDate;

  // Nếu input hợp lệ thì xử lý dữ liệu thống kê
  if (isValidForm) {
    // Hiện thị UI bảng thống kê
    document.querySelector('.dashboard__wrapper').style.display = 'flex'; 

    filterProductToPushNewArray(groupMountainQuantityStatistic, validMountainStatistic);
    filterProductToPushNewArray(groupTouringQuantityStatistic, validTouringStatistic);
    filterProductToPushNewArray(groupRoadQuantityStatistic, validRoadStatistic);
    filterProductToPushNewArray(groupKidsQuantityStatistic, validKidsStatistic);

    // Xử dụng lại hàm viết bên dưới để render
    mountainBtn.addEventListener('click', e => {
      renderDetailStatisticUniqueType(validMountainStatistic);
    });

    touringBtn.addEventListener('click', e => {
      renderDetailStatisticUniqueType(validTouringStatistic);
    });

    roadBtn.addEventListener('click', e => {
      renderDetailStatisticUniqueType(validRoadStatistic);
    });

    kidsBtn.addEventListener('click', e => {
      renderDetailStatisticUniqueType(validKidsStatistic);
    });

    // XỬ LÝ HIỆN TỔNG TIỀN, SỐ LƯỢNG TỪNG LOẠI ===================================================
    // Thống kê từng loại sản phẩm
    const productBought = [];
    const statisticType = [
      { type: 'mountain', quantity: 0, totalPrice: 0 },
      { type: 'touring', quantity: 0, totalPrice: 0 },
      { type: 'road', quantity: 0, totalPrice: 0 },
      { type: 'kids', quantity: 0, totalPrice: 0 }
    ];

    // Trích ra sản phẩm, số lượng người dùng đã mua vào mảng productBought
    DUMMY_API.forEach(user => {
      user.cart.forEach(order => {
        const createDate = new Date(order.dateCreate);

        const dateCreateDay = createDate.getDate();
        const dateCreateMonth = createDate.getMonth();
        const dateCreateYear = createDate.getFullYear();

        if (
          order?.product[0]?.processed &&
          convertStartDate <= new Date(dateCreateYear, dateCreateMonth, dateCreateDay) &&
          convertEndDate >= new Date(dateCreateYear, dateCreateMonth, dateCreateDay)
        ) {
          productBought.push({
            id: order.product[0].id,
            quantity: order.product[0].quantity
          });
        }
      });
    });

    // Hàm chuyển đổi định dạng price trong database sang số có thể sử dụng được
    function convertToPrice(price) {
      // Ex: 105.000.000 VND -> Left is 105.000.000 -> True price is 105000000
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

    // Set giá và số lượng lên UI để người dùng thấy
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
      } else if (type.type === 'kids') {
        kidsTotalPriceElement.textContent = type.totalPrice.toLocaleString('vi-VN') + ' VNĐ';
        kidsTotalQuantityElement.textContent = type.quantity;
      }
    });
  }
  // end: XỬ LÝ HIỆN TỔNG TIỀN, SỐ LƯỢNG TỪNG LOẠI ===================================================
});

// Hàm hỗ trợ chuyển sản phẩm thỏa ngày vào mảng
function filterProductToPushNewArray(oldArray, newArray) {
  const filterStatisticStartDate = document.querySelector('#filterStatisticStartDate input');
  const filterStatisticEndDate = document.querySelector('#filterStatisticEndDate input');

  // Tháng vì lấy tháng hiện tại nhưng trong new date thì
  // phải trừ đi -1 mới lấy được tháng hiện tại
  const startDateDay = filterStatisticStartDate.value.split('-')[2];
  const startDateMonth = +filterStatisticStartDate.value.split('-')[1] - 1;
  const startDateYear = filterStatisticStartDate.value.split('-')[0];

  const endDateDay = filterStatisticEndDate.value.split('-')[2];
  const endDateMonth = +filterStatisticEndDate.value.split('-')[1] - 1;
  const endDateYear = filterStatisticEndDate.value.split('-')[0];

  const convertStartDate = new Date(startDateYear, startDateMonth, startDateDay);
  const convertEndDate = new Date(endDateYear, endDateMonth, endDateDay);

  oldArray.forEach(item => {
    const dateCreate = new Date(item.dateCreate);
    const dateCreateDay = dateCreate.getDate();
    const dateCreateMonth = dateCreate.getMonth();
    const dateCreateYear = dateCreate.getFullYear();

    // Nếu thỏa trong khoảng ngày thì render ra
    if (
      convertStartDate <= new Date(dateCreateYear, dateCreateMonth, dateCreateDay) &&
      convertEndDate >= new Date(dateCreateYear, dateCreateMonth, dateCreateDay)
    ) {
      newArray.push(item);
    }
  });
}
