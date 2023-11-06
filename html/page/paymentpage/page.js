import DUMMY_PRODUCTS from '../../../database/products.js'

const data = DUMMY_PRODUCTS;
const confirmButton = document.getElementById('confirmButton');
const userLocal = JSON.parse(localStorage.getItem('User'));
const id = JSON.parse(localStorage.getItem('currentIdbuy'));

const totalpayment = document.getElementById('totalPayment');


const disPlayTotalPayment = async () => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].ID === id) {
            totalpayment.innerText = `Tổng thanh toán: ${data[i].price}`;
            console.log(data[i].ID);
            console.log(id);
            break;
        }

    }
}


disPlayTotalPayment();

confirmButton.addEventListener('click', function () {
    alert('đã thêm đơn hàng vào đang chờ xử lý!');
    const process = {
        id: id,
        quantity: 1
    }
    var currentTime = new Date();
    var ngay = currentTime.getDate();
    var thang = currentTime.getMonth() + 1;
    var nam = currentTime.getFullYear();
    var gio = currentTime.getHours();
    var phut = currentTime.getMinutes();
    var giay = currentTime.getSeconds();


    const processAt = {
        id: id,
        time: `${gio}:${phut}:${giay}`,
        date: `${ngay}/${thang}/${nam} `,
    }

    userLocal[0].processAt.push(processAt);
    userLocal[0].processing.push(process);
    localStorage.setItem('User', JSON.stringify(userLocal));
    console.log(process);
});
