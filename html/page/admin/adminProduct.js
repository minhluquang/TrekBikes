const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
const data = DUMMY_PRODUCTS;

// const currentDateTime = JSON.parse(localStorage.getItem('DateTimeP'));
const closeFormClick = document.getElementById('close');

function setValuesInput(ImageUrl, Name, UpdateDate, CreationDate) {
  const imageUrl = document.getElementById('imageUrl');
  const name = document.getElementById('name');
  const updateDate = document.getElementById('dateupdate');
  const creationDate = document.getElementById('datecreate');

  imageUrl.value = ImageUrl;
  name.value = Name;
  updateDate.value = UpdateDate;
  creationDate.value = CreationDate;
}

function getValuesInput() {
  const imageUrl = document.getElementById('imageUrl');
  const name = document.getElementById('name');
  const updateDate = document.getElementById('dateupdate');
  const creationDate = document.getElementById('datecreate');

  const imageUrlvalues = imageUrl.value;
  const namValue = name.value;
  const updateDateValue = updateDate.value;
  const createValue = creationDate.value;

  return {
    imageUrlvalues,
    namValue,
    updateDateValue,
    createValue
  };
}

function copyNameProduct(name) {
  navigator.clipboard
    .writeText(name)
    .then(() => {
      alert('Text has been copied! ');
    })
    .catch(err => {
      console.log('Unable to copy text: ', err);
    });
}

function displayFormChange() {
  const form = document.getElementById('change-product-info-container');
  const close = form.querySelector('p');
  close.style.display = 'block';
  form.style.display = 'flex';
}

function closeForm() {
  const form = document.getElementById('change-product-info-container');
  const close = form.querySelector('p');
  close.style.display = 'none';
  form.style.display = 'none';
}

closeFormClick.addEventListener('click', () => {
  closeForm();
});

function updateEvent(item, index, id, element) {
  // copy
  const copy = item.querySelector('#copy');
  copy.addEventListener('click', () => {
    copyNameProduct(element.imgSrc);
  });

  //  console.log(index);

  // edit

  const edit = item.querySelector('#edit');
  edit.addEventListener('click', () => {
    displayFormChange();
    setValuesInput(element.imgSrc, element.name, currentDateTime[index].updateAt, currentDateTime[index].updateAt);
    id.innerText = element.ID;
  });

  // delete
  const deleteProduct = item.querySelector('#delete');
  deleteProduct.addEventListener('click', () => {
    data.splice(index, 1);
    currentDateTime.splice(index, 1);
    localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(data));

    localStorage.setItem('DateTimeP', JSON.stringify(currentDateTime));

    location.reload();
  });
}

function returnPathImg(element) {
  let pathImg = element.imgSrc;
  if (pathImg.startsWith('database')) {
    pathImg = '/' + pathImg;
  }
  return pathImg;
}

function disPlayProductItem(pageStart, pageEnd) {
  const content = document.getElementById('content');

  const id = document.getElementById('id');
  content.innerHTML = '';

  for (let index = pageStart; index < pageEnd; index++) {
    const element = data[index];

    const dateCreate = new Date(element.dateCreate);
    const dateCreateDate = dateCreate.getDate().toString().padStart(2, '0');
    const dateCreateMonth = (dateCreate.getMonth() + 1).toString().padStart(2, '0');
    const dateCreateYear = dateCreate.getFullYear();

    const dateUpdate = new Date(element.dateUpdate);
    const dateUpdateDate = dateUpdate.getDate().toString().padStart(2, '0');
    const dateUpdateMonth = (dateUpdate.getMonth() + 1).toString().padStart(2, '0');
    const dateUpdateYear = dateUpdate.getFullYear();

    const item = document.createElement('tr');
    item.innerHTML = `
              <th class="id">${element.ID}</th>
              <th class="image"><img src="${returnPathImg(element)}"></th>
              <th class="name">${element.name}</th>
              <th class="date-update">${dateCreateDate}/${dateCreateMonth}/${dateCreateYear}</th>
              <th class="date-creat">${dateUpdateDate}/${dateUpdateMonth}/${dateUpdateYear}</th>
              <th class="copy" id="copy">Copy</th>
              <th class="edit" id="edit">Sửa</th>
              <th class="delete" id="delete">Xóa</th>
      `;
    content.appendChild(item);

    updateEvent(item, index, id, element);
    // console.log(element.name);
  }
}

const submitBtn = document.getElementById('formSubmit');
submitBtn.addEventListener('click', e => {
  const id = document.getElementById('id');
  console.log(id.textContent);
  e.preventDefault();
  const { imageUrlvalues, namValue, updateDateValue, createValue } = getValuesInput();

  data.map((element, index) => {
    if (element.ID === id.textContent) {
      element.imgSrc = imageUrlvalues;
      element.name = namValue;

      currentDateTime[index].updateAt = updateDateValue;
      currentDateTime[index].createAT = createValue;

      console.log(currentDateTime[index]);
      localStorage.setItem('DateTimeP', JSON.stringify(currentDateTime));
      console.log('bang');
    }
  });

  localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(data));

  location.reload();
});

// add product
function previewImage(input) {
  var imagePreview = document.getElementById('imagePreview');
  var file = input.files[0];
  if (file) {
    var render = new FileReader();

    render.onload = function (e) {
      imagePreview.src = e.target.result;
    };
    render.readAsDataURL(file);
  }
}

const addProductBtn = document.getElementById('add-product-btn');

addProductBtn.addEventListener('click', e => {
  e.preventDefault();
  addProductBtn.style.display = 'none';
  const content = document.getElementById('content-product');
  const manageProduct = document.getElementById('add-product-container');
  const pagination = document.getElementById('pagination');
  const cancel = document.getElementById('cancel');
  content.style.display = 'none';
  pagination.style.display = 'none';
  cancel.style.display = 'block';
  manageProduct.innerHTML = ``;
  const addProductForm = document.createElement('div');
  addProductForm.innerHTML = `
  
  <div class="add-product-form-container">
    <div class="title">
        <h2>
            Thêm sản phẩm mới
        </h2>
    </div>
    <form id="add-product-form">
        <div class="form-item">
            <label for="fileInput">Hình ảnh sản phẩm</label>
            <input type="file" id="fileInput">
            <img src="" alt="" id="imagePreview">
        </div>
        <div class="form-item">
            <label for="name">Tên sản phẩm</label>
            <input type="text" id="name" placeholder="Nhập tên sản phẩm">
            <p class="newProductNameMessage"></p>
        </div>
        
        <div class="form-item">
            <label for="productCodeForm">Mã sản phẩm</label>
            <input type="text" id="productCodeForm" placeholder="Nhập mã sản phẩm">
            <p class="newProcductIdMessage"></p>
        </div>
        
        <div class="form-item">
            <label for="category">Thể loại</label>
            <select name="categoty" id="category">
                <option value="">Chọn thể loại</option>
                <option value="mountain">Mountain</option>
                <option value="road">Road</option>
                <option value="touring">Touring</option>
                <option value="kids">Kids</option>
            </select>
            <p class="newMessageCategory"></p>
        </div>
        

        <div class="form-item">
            <label for="price">Giá sản phẩm</label>
            <input type="text" id="price" placeholder="Nhập giá sản phẩm">
            <p class="newProcductPriceMessage"></p>
        </div>
        <div class="form-item">
            <label for="codeColor">Mã màu sản phẩm</label>
            <input type="text" id="codeColor" placeholder="Nhập mã màu sản phẩm">
            <p class="newProductColorMessage"></p>
        </div>
        

        <button id="add-form-btn">Thêm</button>

    </form>
  </div>
  `;

  manageProduct.appendChild(addProductForm);

  var fileInput = document.getElementById('fileInput');

  fileInput.addEventListener('change', function () {
    previewImage(fileInput);
  });

  const formBtn = document.getElementById('add-form-btn');

  formBtn.addEventListener('click', e => {
    e.preventDefault();
    var form = document.getElementById('add-product-form');
    var imgUrl = form.querySelector('#imagePreview');
    var name = form.querySelector('#name');
    var id = form.querySelector('#productCodeForm');
    var category = form.querySelector('#category');
    var price = form.querySelector('#price');
    var codeColor = form.querySelector('#codeColor');

    const showMessageNameRes = document.querySelector('.newProductNameMessage');
    const showMessageIdRes = document.querySelector('.newProcductIdMessage');
    const showMessagePrice = document.querySelector('.newProcductPriceMessage');
    const showMessageColor = document.querySelector('.newProductColorMessage');
    const showMessageCategory = document.querySelector('.newMessageCategory');

    let isValidName = true;
    let isValidId = true;
    let isValidCategory = true;
    let isValidPrice = true;
    let isValidColor = true;

    if (name.value.trim().length === 0) {
      showMessageNameRes.innerHTML = '* Vui lòng nhập tên sản phẩm';
      isValidName = false;
    } else {
      showMessageNameRes.innerText = '';
      name.style.border = '1px solid #333';
      isValidName = true;
    }

    if (id.value.trim().length === 0) {
      showMessageIdRes.innerHTML = '* Vui lòng nhập mã sản phẩm';
      isValidId = false;
    } else if (data.some(product => product.ID === id.value.trim())) {
      showMessageIdRes.innerHTML = '* Mã sản phẩm đã tồn tại';
      isValidId = false;
    } else {
      id.style.border = '1px solid #333';
      isValidId = true;
    }

    const patternNumber = /^[-+]?[0-9]*\.?[0-9]+$/;

    if (price.value.trim().length === 0) {
      showMessagePrice.innerHTML = '* Vui lòng nhập giá sản phẩm';
      isValidPrice = false;
    } else if (!patternNumber.test(price.value.trim())) {
      showMessagePrice.innerHTML = '* Giá sản phẩm phải là số';
      isValidPrice = false;
    } else {
      showMessagePrice.innerText = '';
      price.style.border = '1px solid #333';
      isValidPrice = true;
    }

    const patternCodeColor = /^#[a-zA-Z0-9]{6}/gi;

    if (codeColor.value.trim().length === 0) {
      showMessageColor.innerHTML = '* Vui lòng nhập mã màu sản phẩm';
      isValidColor = false;
    } else if (!patternCodeColor.test(codeColor.value.trim())) {
      showMessageColor.innerHTML = '* Mã màu phải bắt đầu bằng kí tự # và kết thúc bằng 6 kí tự (vd: #333aaa)';
      isValidColor = false;
    } else {
      showMessageColor.innerText = '';
      codeColor.style.border = '1px solid #333';
      isValidColor = true;
    }

    if (category.value.trim().length === 0) {
      showMessageCategory.innerHTML = '* Vui lòng chọn thể loại xe';
      isValidCategory = false;
    } else {
      showMessageCategory.innerHTML = '';
      category.style.border = '1px solid #333';
      isValidCategory = true;
    }

    if (imgUrl.value === '' && name.value === '' && id.value === '' && price.value === '' && codeColor.value === '') {
      return null;
    }
    if (imgUrl.value === '') {
      imgUrl.style.border = '1px solid red';
    }
    if (name.value === '') {
      name.style.border = '1px solid red';
    }
    if (id.value === '') {
      id.style.border = '1px solid red';
    }
    if (price.value === '') {
      price.style.border = '1px solid red';
    }
    if (codeColor.value === '') {
      codeColor.style.border = '1px solid red';
    }
    if (category.value === '') {
      category.style.border = '1px solid red';
    }

    // Kiểm tra nếu tất cả đã nhập hợp lệ
    const isValidForm = isValidName && isValidId && isValidCategory && isValidColor && isValidPrice;

    if (isValidForm) {
      let imgLink;

      if (fileInput.value.trim().length === 0) {
        imgLink = '../../../database/images/comming.jpg';
      } else {
        imgLink = imgUrl.src;
      }

      // Khởi tạo ngày hiện tại để set ngày tạo cho sản phẩm mới
      const currentDate = new Date();
      const currentISOString = currentDate.toISOString();

      var newProduct = {
        name: name.value,
        imgSrc: imgLink,
        price: parseInt(price.value).toLocaleString(),
        dataColors: [codeColor.value],
        ID: id.value,
        type: category.value,
        dateCreate: currentISOString,
        dateUpdate: currentISOString
      };

      // var currentTime = new Date();
      // var year = currentTime.getFullYear();
      // var month = currentTime.getMonth() + 1;
      // var day = currentTime.getDate();
      // var hours = currentTime.getHours();
      // var minutes = currentTime.getMinutes();
      // var DateTimeP = {
      //   createAT: `${day}/${month}/${year}  ${hours}:${minutes}`,
      //   updateAt: `${day}/${month}/${year}  ${hours}:${minutes}`
      // };
      // currentDateTime.push(DateTimeP);
      data.push(newProduct);
      localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(data));
      // localStorage.setItem('DateTimeP', JSON.stringify(currentDateTime));

      const manageProduct = document.getElementById('add-product-container');
      const pagination = document.getElementById('pagination');
      const content = document.getElementById('content-product');

      manageProduct.innerHTML = '';
      content.style.display = 'table';
      pagination.style.display = 'flex';
      cancel.style.display = 'none';
      addProductBtn.style.display = 'block';
      loadData();
      alert('Đã thêm sản phẩm thành công!');
    }
  });
});

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', e => {
  e.preventDefault();
  const manageProduct = document.getElementById('add-product-container');
  const pagination = document.getElementById('pagination');
  const content = document.getElementById('content-product');
  manageProduct.innerHTML = '';
  content.style.display = 'table';
  pagination.style.display = 'flex';
  cancel.style.display = 'none';
  addProductBtn.style.display = 'block';
  loadData();
});

// page

var totalPages = Math.ceil(data.length / 10);

var currentPage = 1;
const ITEMS_PER_PAGE = 10;
var maxPagesToShow = 5;

function generatePagination() {
  const pagination = document.getElementById('pagination');

  pagination.innerHTML = '';

  const prevBtn = document.createElement('a');
  prevBtn.href = 'javascript:void(0);';
  prevBtn.innerHTML = '&laquo;';

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      generatePagination();
      loadData();
    }
  });
  pagination.appendChild(prevBtn);

  var startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  var endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    var pageLink = document.createElement('a');
    pageLink.href = 'javascript:void(0);';
    pageLink.innerHTML = i;

    if (i === currentPage) {
      pageLink.classList.add('active');
    }

    pageLink.addEventListener('click', function () {
      currentPage = parseInt(this.innerHTML);
      generatePagination();
      loadData();
    });

    pagination.appendChild(pageLink);
    // console.log(pageLink);
  }

  const nextBtn = document.createElement('a');
  nextBtn.href = 'javascript:void(0);';
  nextBtn.innerHTML = '&raquo;';

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      generatePagination();
      loadData();
    }
  });
  pagination.appendChild(nextBtn);
}

function loadData() {
  var startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  var endIndex = startIndex + ITEMS_PER_PAGE;
  if (endIndex > data.length) {
    endIndex = data.length;
  }
  disPlayProductItem(startIndex, endIndex);
}

generatePagination();

loadData();

// filter

const manageProduct = document.getElementById('manageProduct');
const formFilter = manageProduct.querySelector('#product-filter-form');
const filterSubmitBtn = formFilter.querySelector('#filter-submit-btn');
console.log(filterSubmitBtn);

filterSubmitBtn.addEventListener('click', e => {
  e.preventDefault();
  const productName = manageProduct.querySelector('#productName');
  const productCode = manageProduct.querySelector('#productCode');
  const categorySelect = manageProduct.querySelector('#categorySelect');
  const creationDateInput = document.querySelector("#creatDate input");

  // lọc theo ngày tháng năm
  if(creationDateInput) {
    const selectedCreationDate = new Date(creationDateInput.value);
    const selectedDay = selectedCreationDate.getDate();
    const selectedMonth = selectedCreationDate.getMonth() + 1;
    const selectedYear = selectedCreationDate.getFullYear();
    // console.log(selectedDay +" " + selectedMonth + " " + selectedYear);
     const matchingProduct = data.filter(product => {
      const timeCreatProduct = new Date(product.dateCreate);
      const dayProuct = timeCreatProduct.getDate();
      const monthProduct = timeCreatProduct.getMonth() + 1;
      const yearProduct = timeCreatProduct.getFullYear();

      console.log(dayProuct);

      return dayProuct === selectedDay && monthProduct === selectedMonth && yearProduct === selectedYear;
    });

    // if (matchingProduct.length < 1) {
    //   alert('Không tìm thấy sản phẩm');
    // }
    const content = document.getElementById('content');
    content.innerHTML = '';
    const id = document.getElementById('id');
    for (let index = 0; index < matchingProduct.length; index++) {
      const element = matchingProduct[index];
      const item = document.createElement('tr');

      const dateCreate = new Date(element.dateCreate);
      const dateCreateDate = dateCreate.getDate().toString().padStart(2, '0');
      const dateCreateMonth = (dateCreate.getMonth() + 1).toString().padStart(2, '0');
      const dateCreateYear = dateCreate.getFullYear();

      const dateUpdate = new Date(element.dateUpdate);
      const dateUpdateDate = dateUpdate.getDate().toString().padStart(2, '0');
      const dateUpdateMonth = (dateUpdate.getMonth() + 1).toString().padStart(2, '0');
      const dateUpdateYear = dateUpdate.getFullYear();

      item.innerHTML = `
              <th class="id">${element.ID}</th>
              <th class="image"><img src="${returnPathImg(element)}"></th>
              <th class="name">${element.name}</th>
              <th class="date-update">${dateCreateDate}/${dateCreateMonth}/${dateCreateYear}</th>
              <th class="date-creat">${dateUpdateDate}/${dateUpdateMonth}/${dateUpdateYear}</th>
              <th class="copy" id="copy">Copy</th>
              <th class="edit" id="edit">Sửa</th>
              <th class="delete" id="delete">Xóa</th>
      `;

      content.appendChild(item);
      updateEvent(item, index, id, element);
    }
    console.log(matchingProduct);

  }

  //end lọc theo ngày tháng năm

  if (productName.value != '' && productCode.value == '') {
    const matchingProduct = data.filter(e => e.name.toLowerCase().includes(productName.value.trim().toLowerCase()));
    // if (matchingProduct.length < 1) {
    //   alert('Không tìm thấy sản phẩm');
    // }
    const content = document.getElementById('content');
    content.innerHTML = '';
    const id = document.getElementById('id');
    for (let index = 0; index < matchingProduct.length; index++) {
      const element = matchingProduct[index];
      const item = document.createElement('tr');

      const dateCreate = new Date(element.dateCreate);
      const dateCreateDate = dateCreate.getDate().toString().padStart(2, '0');
      const dateCreateMonth = (dateCreate.getMonth() + 1).toString().padStart(2, '0');
      const dateCreateYear = dateCreate.getFullYear();

      const dateUpdate = new Date(element.dateUpdate);
      const dateUpdateDate = dateUpdate.getDate().toString().padStart(2, '0');
      const dateUpdateMonth = (dateUpdate.getMonth() + 1).toString().padStart(2, '0');
      const dateUpdateYear = dateUpdate.getFullYear();

      item.innerHTML = `
              <th class="id">${element.ID}</th>
              <th class="image"><img src="${returnPathImg(element)}"></th>
              <th class="name">${element.name}</th>
              <th class="date-update">${dateCreateDate}/${dateCreateMonth}/${dateCreateYear}</th>
              <th class="date-creat">${dateUpdateDate}/${dateUpdateMonth}/${dateUpdateYear}</th>
              <th class="copy" id="copy">Copy</th>
              <th class="edit" id="edit">Sửa</th>
              <th class="delete" id="delete">Xóa</th>
      `;

      content.appendChild(item);
      updateEvent(item, index, id, element);
    }
    console.log(matchingProduct);
  }

  if (productCode.value != '') {
    productName.value = '';
    categorySelect.value = 'all';
    const matchingProduct = data.filter(e => e.ID.includes(productCode.value));
    // if (matchingProduct.length < 1) {
    //   alert('Không tìm thấy sản phẩm');
    // }
    const content = document.getElementById('content');
    content.innerHTML = '';
    const id = document.getElementById('id');
    for (let index = 0; index < matchingProduct.length; index++) {
      const element = matchingProduct[index];
      const item = document.createElement('tr');

      const dateCreate = new Date(element.dateCreate);
      const dateCreateDate = dateCreate.getDate().toString().padStart(2, '0');
      const dateCreateMonth = (dateCreate.getMonth() + 1).toString().padStart(2, '0');
      const dateCreateYear = dateCreate.getFullYear();

      const dateUpdate = new Date(element.dateUpdate);
      const dateUpdateDate = dateUpdate.getDate().toString().padStart(2, '0');
      const dateUpdateMonth = (dateUpdate.getMonth() + 1).toString().padStart(2, '0');
      const dateUpdateYear = dateUpdate.getFullYear();

      item.innerHTML = `
              <th class="id">${element.ID}</th>
              <th class="image"><img src="${returnPathImg(element)}"></th>
              <th class="name">${element.name}</th>
              <th class="date-update">${dateCreateDate}/${dateCreateMonth}/${dateCreateYear}</th>
              <th class="date-creat">${dateUpdateDate}/${dateUpdateMonth}/${dateUpdateYear}</th>
              <th class="copy" id="copy">Copy</th>
              <th class="edit" id="edit">Sửa</th>
              <th class="delete" id="delete">Xóa</th>
      `;

      content.appendChild(item);
      updateEvent(item, index, id, element);
    }
    console.log(matchingProduct);
  }

  if (categorySelect.value !== 'all' && productName.value === '' && productCode.value === '') {
    const matchingProduct = data.filter(e => e.type === categorySelect.value);
    console.log(matchingProduct);

    // if (matchingProduct.length < 1) {
    //   alert('Không tìm thấy sản phẩm');
    // }
    const content = document.getElementById('content');
    content.innerHTML = '';
    const id = document.getElementById('id');
    for (let index = 0; index < matchingProduct.length; index++) {
      const element = matchingProduct[index];
      const item = document.createElement('tr');

      const dateCreate = new Date(element.dateCreate);
      const dateCreateDate = dateCreate.getDate().toString().padStart(2, '0');
      const dateCreateMonth = (dateCreate.getMonth() + 1).toString().padStart(2, '0');
      const dateCreateYear = dateCreate.getFullYear();

      const dateUpdate = new Date(element.dateUpdate);
      const dateUpdateDate = dateUpdate.getDate().toString().padStart(2, '0');
      const dateUpdateMonth = (dateUpdate.getMonth() + 1).toString().padStart(2, '0');
      const dateUpdateYear = dateUpdate.getFullYear();

      item.innerHTML = `
              <th class="id">${element.ID}</th>
              <th class="image"><img src="${returnPathImg(element)}"></th>
              <th class="name">${element.name}</th>
              <th class="date-update">${dateCreateDate}/${dateCreateMonth}/${dateCreateYear}</th>
              <th class="date-creat">${dateUpdateDate}/${dateUpdateMonth}/${dateUpdateYear}</th>
              <th class="copy" id="copy">Copy</th>
              <th class="edit" id="edit">Sửa</th>
              <th class="delete" id="delete">Xóa</th>
      `;

      content.appendChild(item);
      updateEvent(item, index, id, element);
    }
    console.log(matchingProduct);
  }

  //reset
  const resetBtn = document.querySelector('.product--reset__btn');
  resetBtn.addEventListener('click', () => {
    // Đặt giá trị trở về rỗng hoặc giá trị mặc định
    productName.value = '';
    productCode.value = '';
    categorySelect.value = 'all';
    loadData();
  });
});
