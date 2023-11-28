const fs = require('fs');

// Đường dẫn đến tệp JSON cần cập nhật
const filePath = 'toolkit/text.json';

// Đọc nội dung của tệp JSON
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Chuyển đổi nội dung JSON thành đối tượng JavaScript
    const jsonData = JSON.parse(data);

    // Ngày cần thêm (1/1/2023)
    const newDate = new Date('2023-01-01T00:00:00.000Z');

    // Thêm thuộc tính mới cho mỗi đối tượng
    jsonData.forEach(item => {
      item.dateUpdate = newDate.toISOString();
    });

    // Chuyển đối tượng JavaScript thành chuỗi JSON
    const updatedJson = JSON.stringify(jsonData, null, 2);

    // Ghi lại nội dung cập nhật vào tệp JSON
    fs.writeFile(filePath, updatedJson, 'utf8', writeErr => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
      } else {
        console.log('Attributes added successfully!');
      }
    });
  } catch (jsonErr) {
    console.error('Error parsing JSON:', jsonErr);
  }
});
