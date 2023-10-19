const fs = require('fs');
const crypto = require('crypto');

// Đọc dữ liệu từ tệp JSON hiện có
const dataFilename = 'data.json';
let data = [];

try {
  data = JSON.parse(fs.readFileSync(dataFilename, 'utf8'));
} catch (error) {
  console.error(`Lỗi khi đọc tệp JSON: ${error.message}`);
  process.exit(1);
}

// Hàm tạo ID ngẫu nhiên có độ dài 10 ký tự
function generateRandomID() {
  return crypto.randomBytes(5).toString('hex');
}

// Cập nhật ID cho mỗi sản phẩm
data = data.map(item => {
  item.ID = generateRandomID();
  return item;
});

// Lưu lại dữ liệu đã cập nhật vào tệp JSON
fs.writeFileSync(dataFilename, JSON.stringify(data, null, 2));

console.log(`Đã cập nhật ID cho tất cả sản phẩm trong ${dataFilename}.`);
