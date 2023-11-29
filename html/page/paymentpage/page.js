const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));

const data = DUMMY_PRODUCTS;
const confirmButton = document.getElementById('confirmButton');
const userLocal = JSON.parse(localStorage.getItem('User'));
const id = JSON.parse(localStorage.getItem('currentIdbuy'));
const DUMMY_API = JSON.parse(localStorage.getItem('DUMMY_API'));
const accountData = JSON.parse(localStorage.getItem('accounts'));
function generateRandomId(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var id = '';

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

const totalpayment = document.getElementById('totalPayment');

console.log(DUMMY_API[0]);
const disPlayTotalPayment = async () => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].ID === id) {
      totalpayment.innerText = `Tổng thanh toán: ${data[i].price}`;
      console.log(data[i].ID);
      console.log(id);
      break;
    }
  }
};

disPlayTotalPayment();

confirmButton.addEventListener('click', function () {
  alert('đã thêm đơn hàng vào đang chờ xử lý!');

  var currentTime = new Date();

  const processing = {
    idOrder: generateRandomId(5),
    dateCreate: currentTime,
    dateCancel: '',
    product: [
      {
        id: id,
        quantity: 1,
        processed: false
      }
    ]
  };

  DUMMY_API[0].cart.push(processing);
  for (let i = 0; i < accountData.length; i++) {
    if (accountData[i].id === DUMMY_API[0].id) {
      accountData[i].cart = DUMMY_API[0].cart;
    }
  }
  //   console.log(DUMMY_API);

  localStorage.setItem('DUMMY_API', JSON.stringify(DUMMY_API));
  localStorage.setItem('accounts', JSON.stringify(accountData));
});
