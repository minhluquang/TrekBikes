const fs = require('fs');

// Đọc dữ liệu từ tệp JSON hiện có
const dataFilename = 'data.json';
let data = [];

try {
  data = JSON.parse(fs.readFileSync(dataFilename, 'utf8'));
} catch (error) {
  console.error(`Lỗi khi đọc tệp JSON: ${error.message}`);
  process.exit(1);
}

// Danh sách các tên sản phẩm cần được gắn type 'mountain'
const mountainBikeNames = ['Crockett'];

// Hàm kiểm tra tên sản phẩm có trong danh sách mountainBikeNames không phân biệt hoa thường
function isMountainBike(name) {
  const lowerCaseName = name.toLowerCase();
  for (const mountainName of mountainBikeNames) {
    if (lowerCaseName.includes(mountainName.toLowerCase())) {
      return true;
    }
  }
  return false;
}

// Cập nhật dữ liệu trong mảng `data`
data = data.map(item => {
  if (isMountainBike(item.name)) {
    item.type = 'road';
  }
  return item;
});

// Lưu lại dữ liệu đã cập nhật vào tệp JSON
fs.writeFileSync(dataFilename, JSON.stringify(data, null, 2));

console.log(`Dữ liệu đã được cập nhật và lưu vào ${dataFilename}.`);
