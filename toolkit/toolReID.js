const fs = require('fs');
const path = require('path');

function generateShortId() {
  // Tạo một ID ngẫu nhiên với 5 ký tự
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let shortId = '';
  for (let i = 0; i < 5; i++) {
    shortId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shortId;
}

function updateIds(products) {
  for (const product of products) {
    // Thay thế ID hiện tại bằng ID mới
    product.ID = generateShortId();
  }
}

// Đọc dữ liệu từ file JSON
const filePath = path.join(__dirname, 'text.json');
const productsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Cập nhật IDs
updateIds(productsData);

// Ghi dữ liệu mới vào file
const updatedFilePath = path.join(__dirname, 'your_updated_json_file.json');
fs.writeFileSync(updatedFilePath, JSON.stringify(productsData, null, 2));

console.log('IDs have been updated.');
