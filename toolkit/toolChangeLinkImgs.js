const fs = require('fs');
const path = require('path');

// Đường dẫn của file gốc chứa mảng DUMMY_PRODUCTS
const filePath = 'dummy.json';

// Đường dẫn mới cho thư mục chứa ảnh sản phẩm
const newImagePath = './database/images/productImgs';

// Đọc file gốc
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Đã xảy ra lỗi khi đọc file:', err);
    return;
  }

  try {
    // Parse nội dung file thành một đối tượng JavaScript
    const products = JSON.parse(data);

    // Duyệt qua mảng sản phẩm và cập nhật đường dẫn ảnh
    products.forEach(product => {
      // Tạo đường dẫn ảnh mới bằng cách kết hợp thư mục và tên ảnh
      product.imgSrc = path.join(newImagePath, path.basename(product.imgSrc));
    });

    // Chuyển đối tượng đã cập nhật thành chuỗi JSON
    const updatedData = JSON.stringify(products, null, 2);

    // Ghi lại vào file gốc
    fs.writeFile(filePath, updatedData, 'utf8', err => {
      if (err) {
        console.error('Đã xảy ra lỗi khi ghi file:', err);
        return;
      }
      console.log('Cập nhật đường dẫn ảnh thành công.');
    });
  } catch (error) {
    console.error('Đã xảy ra lỗi khi xử lý dữ liệu:', error);
  }
});
