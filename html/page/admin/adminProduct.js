const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));
let data = DUMMY_PRODUCTS;
let filteredData = [...data];

// const currentDateTime = JSON.parse(localStorage.getItem('DateTimeP'));
const closeFormClick = document.getElementById('close');

function setValuesInput(ImageUrl, Name, UpdateDate, CreationDate, Type) {
  const imageUrl = document.getElementById('imageUrl');
  const name = document.getElementById('name');
  const updateDate = document.getElementById('dateupdate');
  const creationDate = document.getElementById('datecreate');
  const type = document.getElementById('type');

  imageUrl.value = ImageUrl;
  name.value = Name;
  updateDate.value = UpdateDate;
  creationDate.value = CreationDate;
  type.value = Type;
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
  // Hiển thị modal
  showModal();

  // Truyền giao diện vào modal
  const modal = document.querySelector('.modal');
  modal.innerHTML = '';

  const html = `
    <div class="change-product-info">
      <i class="close fa-solid fa-xmark" id="close"></i>
      <h2>Thay đổi thông tin sản phẩm</h2>
      <form>
        <p id="id" style="opacity: 0">2</p>
        <div class="form-group">
          <label for="">Hình ảnh</label>
          <input type="file" id="imageUrl" name="imageUrl" required />
          <img id="form-group--previewImg"></img>
        </div>
        <div class="form-group-1">
        <div class="form-group-name">
          <label for="">Tên sản phẩm</label>
          <input type="text" id="name" name="name" required />
          <p class="nameMessage"></p>
        </div>
        <div class="form-group-type">
          <label for="">Phân loại</label>
          <select id="type">
          <option value="all">Chọn phân loại</option>
          <option value="mountain">Mountain</option>
          <option value="road">Road</option>
          <option value="kids">Kids</option>
          <option value="touring">Touring</option>
          </select>
          <p class="typeMessage"></p>
        </div>
        </div>
        <div class="form-group">
          <label for="">Ngày cập nhật</label>
          <input type="date" id="dateupdate" name="dateupdate" required />
          <p class="updateMessage"></p>
        </div>

        <div class="form-group">
          <label for="">Ngày tạo</label>
          <input type="date" id="datecreate" name="datecreate" required />
          <p class="createMessage"></p>
        </div>

        <button type="submit" id="formSubmit">Change</button>
      </form>
    </div>
  `;

  modal.insertAdjacentHTML('afterbegin', html);

  const close = document.querySelector('.close');
  close.addEventListener('click', e => {
    hideModal();
  });
}

// function closeForm() {
//   const form = document.getElementById('change-product-info-container');
//   const close = form.querySelector('.close');
//   close.style.display = 'none';
//   form.style.display = 'none';
// }

// closeFormClick.addEventListener('click', () => {
//   closeForm();
// });

function updateEvent(item, index, id, element) {
  // copy
  const copy = item.querySelector('#copy');
  copy.addEventListener('click', () => {
    copyNameProduct(element.imgSrc);
  });

  //  console.log(index);

  // edit

  // const edit = item.querySelector('#edit');
  // edit.addEventListener('click', () => {
  //   displayFormChange();
  //   setValuesInput(element.imgSrc, element.name, currentDateTime[index].updateAt, currentDateTime[index].updateAt);
  //   id.innerText = element.ID;
  // });
  const edits = item.querySelectorAll('.edit');
  edits.forEach(edit => {
    edit.addEventListener('click', e => {
      displayFormChange();

      // Truy vấn ngược ra element cha đẻ lấy id, name,...
      const id = edit.parentElement.querySelector('.id').innerText.trim();

      // Set name mặc định là name hiện tại
      const currentProductName = edit.parentElement.querySelector('.name').innerText.trim();
      document.querySelector('.form-group-name #name').setAttribute('value', currentProductName);

      // Nếu có sự input hình ảnh thì hiển thị
      const formImgInput = document.querySelector('.form-group #imageUrl');
      formImgInput.addEventListener('change', e => {
        previewImage(formImgInput, '#form-group--previewImg');
      });

      const submitBtn = document.getElementById('formSubmit');
      submitBtn.addEventListener('click', e => {
        e.preventDefault();

        const formImgPathLink = document.querySelector('#form-group--previewImg');
        const formNameInputValue = document.querySelector('.form-group-1 #name').value.trim();
        const formDateUpdateValue = document.querySelector('.form-group #dateupdate').value;
        const formDateCreateValue = document.querySelector('.form-group #datecreate').value;
        const formTypeValue = document.querySelector('.form-group-1 #type').value;

        let isValidName = true;
        let isValidDateUpdate = true;
        let isValidDateCreate = true;
        let isValidType = true;
        const nameMessgae = document.querySelector('.nameMessage');
        const updateMessage = document.querySelector('.updateMessage');
        const createMessage = document.querySelector('.createMessage');
        const typeMessage = document.querySelector('.typeMessage');
        console.log(typeMessage);
        // Check đúng sai dữ liệu
        if (formNameInputValue === '') {
          isValidName = false;
          nameMessgae.innerHTML = '* Vui lòng nhập tên sản phẩm';
        } else {
          nameMessgae.innerHTML = '';
        }

        if (formDateUpdateValue === '') {
          isValidName = false;
          updateMessage.innerHTML = '* Vui lòng nhập dữ liệu';
        } else {
          updateMessage.innerHTML = '';
        }

        if (formDateCreateValue === '') {
          isValidName = false;
          createMessage.innerHTML = '* Vui lòng nhập dữ liệu';
        } else {
          createMessage.innerHTML = '';
        }

        if (formTypeValue === 'all') {
          isValidType = false;
          typeMessage.innerHTML = '*Vui lòng chọn thể loại';
        } else {
          typeMessage.innerHTML = '';
        }
        let isValidForm = isValidName && isValidDateUpdate && isValidDateCreate;

        if (isValidForm) {
          data.forEach(product => {
            if (product.ID === id) {
              product.imgSrc = formImgPathLink.src ? formImgPathLink.src : '../../../database/images/comming.jpg';
              product.name = formNameInputValue;
              product.dateCreate = new Date(formDateCreateValue).toISOString();
              product.dateUpdate = new Date(formDateUpdateValue).toISOString();
              product.type = formTypeValue;
            }
          });
          // Đặt item = 'needReturnProductPage' trên local để khi reload lại trang
          // kiểm tra xem có cần quay lại trang product admin không
          localStorage.setItem('needReturnProductPage', JSON.stringify(true));
          localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(data));
          location.reload();
        }
      });
    });
  });

  // delete
  // const deleteProduct = item.querySelector('#delete');
  // deleteProduct.addEventListener('click', () => {
  //   data.splice(index, 1);
  //   currentDateTime.splice(index, 1);
  //   localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(data));

  //   localStorage.setItem('DateTimeP', JSON.stringify(currentDateTime));

  //   location.reload();
  // });
  const deletes = document.querySelectorAll('.delete');
  deletes.forEach(d => {
    d.addEventListener('click', e => {
      // Lấy modal để truyền nội dung html vào
      // Lây overlay để hiển thị
      const modal = document.querySelector('.modal');

      modal.innerHTML = '';
      showModal();

      const html = `<div class="modal--delete">
          <header class="modal--delete__header">
            <h1>Xóa sản phẩm</h1>
          </header>
          <div class="modal--delete__content">
            <p>Bạn có muốn xóa sản phẩm này không?</p>
          </div>
          <div class="modal--delete__footer">
            <button class="modal--delete__footer--delete">Chắc chắn</button>
            <button class="modal--delete__footer--exit">Không</button>
          </div>
        </div>`;

      modal.insertAdjacentHTML('afterbegin', html);

      const confirmBtn = document.querySelector('.modal--delete__footer--delete');
      const exitBtn = document.querySelector('.modal--delete__footer--exit');

      // Xử lý khi bấm vào thoát thì tắt modal và không xóa sản phẩm
      exitBtn.addEventListener('click', e => {
        hideModal();
      });

      // Xử lý xóa sản phẩm khi bấm chắc chắn
      confirmBtn.addEventListener('click', e => {
        const id = d.parentElement.querySelector('.id').innerText.trim();
        data = data.filter(product => product.ID !== id);

        // Đặt item = 'needReturnProductPage' trên local để khi reload lại trang
        // kiểm tra xem có cần quay lại trang product admin không
        localStorage.setItem('needReturnProductPage', JSON.stringify(true));
        localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(data));
        location.reload();
        hideModal();
      });
    });
  });
}

function showModal() {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  modal.classList.add('active');
  overlay.classList.add('active');
}

function hideModal() {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

function returnPathImg(element) {
  let pathImg = element.imgSrc;
  if (pathImg.startsWith('database')) {
    pathImg = '/' + pathImg;
  }
  return pathImg;
}

function disPlayProductItem(pageStart, pageEnd, data) {
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
              <th class="type">${element.type}</th>             
              <th class="date-update">${dateUpdateDate}/${dateUpdateMonth}/${dateUpdateYear}</th>
              <th class="date-creat">${dateCreateDate}/${dateCreateMonth}/${dateCreateYear}</th>
              <th class="copy" id="copy">Copy</th>
              <th class="edit" id="edit">Sửa</th>
              <th class="delete" id="delete">Xóa</th>
      `;
    content.appendChild(item);

    updateEvent(item, index, id, element);
    // console.log(element.name);
  }
}

// add product
function previewImage(input, element) {
  var imagePreview = document.querySelector(`${element}`);
  var file = input.files[0];
  if (file) {
    var render = new FileReader();

    render.onload = function (e) {
      imagePreview.src = e.target.result;
    };
    render.readAsDataURL(file);
  }
}

function hideFilterContent() {
  const productPageFilterContainer = document.querySelector('#manageProduct .filter');
  productPageFilterContainer.querySelector('h1').style.display = 'none';
  productPageFilterContainer
    .querySelectorAll('.admin__content--body__filter--gr1')
    .forEach(element => (element.style.display = 'none'));
  document.querySelector('#product-filter-form p').style.display = 'none';
  productPageFilterContainer.querySelector('.body__filter--actions').style.display = 'none';
}

function unhideFilterContent() {
  const productPageFilterContainer = document.querySelector('#manageProduct .filter');
  productPageFilterContainer.querySelector('h1').style.display = 'block';
  productPageFilterContainer
    .querySelectorAll('.admin__content--body__filter--gr1')
    .forEach(element => (element.style.display = 'flex'));
  document.querySelector('#product-filter-form p').style.display = 'block';
  productPageFilterContainer.querySelector('.body__filter--actions').style.display = 'block';
}

const addProductBtn = document.getElementById('add-product-btn');
addProductBtn.addEventListener('click', e => {
  e.preventDefault();

  //Ẩn nút thêm sản phẩm, ẩn ô filter
  addProductBtn.style.display = 'none';
  hideFilterContent();

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

        <div class="form-item__container">  
          <div class="form-item form-item__productCode">
              <label for="productCodeForm">Mã sản phẩm</label>
              <input type="text" id="productCodeForm" placeholder="Nhập mã sản phẩm">
              <p class="newProcductIdMessage"></p>
          </div>
          <div class="form-item form-item__productCategory">
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
        </div class="form-item__container">  


        <div class="form-item__container">
          <div class="form-item form-item__productPrice">
              <label for="price">Giá sản phẩm</label>
              <input type="text" id="price" placeholder="Nhập giá sản phẩm">
              <p class="newProcductPriceMessage"></p>
          </div>
          <div class="form-item form-item__productCodeColor">
              <label for="codeColor">Mã màu sản phẩm</label>
              <input type="text" id="codeColor" placeholder="Nhập mã màu sản phẩm">
              <p class="newProductColorMessage"></p>
          </div>
        </div>
        

        <button id="add-form-btn">Thêm</button>

    </form>
  </div>
  `;

  manageProduct.appendChild(addProductForm);

  var fileInput = document.getElementById('fileInput');

  fileInput.addEventListener('change', function () {
    previewImage(fileInput, '#imagePreview');
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

      const priveValue = +price.value;

      var newProduct = {
        name: name.value,
        imgSrc: imgLink,
        price: priveValue.toLocaleString('vi-VN') + ' VND',
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
      loadData(data);

      unhideFilterContent();
      alert('Đã thêm sản phẩm thành công!');
    }
  });
});

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', e => {
  e.preventDefault();
  unhideFilterContent();
  const manageProduct = document.getElementById('add-product-container');
  const pagination = document.getElementById('pagination');
  const content = document.getElementById('content-product');
  manageProduct.innerHTML = '';
  content.style.display = 'table';
  pagination.style.display = 'flex';
  cancel.style.display = 'none';
  addProductBtn.style.display = 'block';
  loadData(data);
});

// page

var totalPages = Math.ceil(filteredData.length / 10);
var currentPage = 1;
const ITEMS_PER_PAGE = 10;
var maxPagesToShow = 5;

function generatePagination(data) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const prevBtn = document.createElement('a');
  prevBtn.href = 'javascript:void(0);';
  prevBtn.innerHTML = '&laquo;';

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      generatePagination(data);
      loadData(data);
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
      generatePagination(data);
      loadData(data);
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
      generatePagination(data);
      loadData(data);
    }
  });
  pagination.appendChild(nextBtn);
}

function loadData(data) {
  var startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  var endIndex = startIndex + ITEMS_PER_PAGE;
  if (endIndex > data.length) {
    endIndex = data.length;
  }
  disPlayProductItem(startIndex, endIndex, data);
}

generatePagination(data);
loadData(data);

// filter
const manageProduct = document.getElementById('manageProduct');
const formFilter = manageProduct.querySelector('#product-filter-form');
const filterSubmitBtn = formFilter.querySelector('#filter-submit-btn');
// console.log(filterSubmitBtn);

//  let dataFilter = data;
filterSubmitBtn.addEventListener('click', e => {
  e.preventDefault();

  const productName = manageProduct.querySelector('#productName');
  const productCode = manageProduct.querySelector('#productCode');
  const categorySelect = manageProduct.querySelector('#categorySelect');

  const dateSelect = manageProduct.querySelector('#cateDateSelect');
  const dateFrom = manageProduct.querySelector('#dateFrom input');
  const dateTo = manageProduct.querySelector('#dateTo input');

  // Kiểm tra xem nếu người dùng chọn ngày (dateFrom/dateTo)
  // mà chưa chọn loại ngày thì hiển thị thông báo
  if (
    !productName.value &&
    !productCode.value &&
    !dateSelect.value &&
    !dateFrom.value &&
    !dateTo.value &&
    !categorySelect.value
  ) {
    return;
  }

  let dataFilter = [...data];

  // lọc theo ngày tháng năm
  if (dateFrom.value || dateTo.value || dateSelect.value !== '') {
    if ((dateFrom.value || dateTo.value) && !dateSelect.value) {
      alert('Vui lòng chọn dữ kiện loại ngày cần lọc!');
      return;
    }

    if (!dateFrom.value) {
      alert('Vui lòng chọn bắt đầu từ ngày nào!');
      return;
    } else if (!dateTo.value) {
      alert('Vui lòng chọn kết thúc ngày nào!');
      return;
    }

    const selectedDateFrom = new Date(dateFrom.value);
    const selectedDateTo = new Date(dateTo.value);

    // Kiểm tra ngày bắt đầu nhỏ hơn ngày kết thúc
    if (selectedDateFrom <= selectedDateTo) {
      dataFilter = dataFilter.filter(product => {
        const dateCreateProduct = new Date(product.dateCreate);
        const dateUpdateProduct = new Date(product.dateUpdate);

        if (
          dateSelect.value === 'dateCreate' &&
          dateCreateProduct >= selectedDateFrom &&
          dateCreateProduct <= selectedDateTo
        ) {
          return true;
        } else if (
          dateSelect.value === 'dateUpdate' &&
          dateUpdateProduct >= selectedDateFrom &&
          dateUpdateProduct <= selectedDateTo
        ) {
          return true;
        }
        return false;
      });
    } else {
      alert('Ngày kết thúc không hợp lệ!');
      return;
    }
  }

  //end lọc theo ngày tháng năm

  // Lọc theo tên sản phẩm
  if (productName.value.trim()) {
    dataFilter = dataFilter.filter(e => e.name.toLowerCase().includes(productName.value.trim().toLowerCase()));
  }

  // Lọc theo id sản phẩm

  if (productCode.value.trim()) {
    dataFilter = dataFilter.filter(e => e.ID.includes(productCode.value));
  }

  // Lọc theo phân loại
  if (categorySelect.value != 'all') {
    dataFilter = dataFilter.filter(e => e.type === categorySelect.value);
  }

  filteredData = [...dataFilter];
  generatePagination(filteredData);
  loadData(filteredData);

  const content = document.getElementById('content');

  content.innerHTML = '';
  const id = document.getElementById('id');
  for (let index = 0; index < filteredData.length; index++) {
    const element = filteredData[index];
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
      <th class="type">${element.type}</th>
      <th class="date-update">${dateUpdateDate}/${dateUpdateMonth}/${dateUpdateYear}</th>
      <th class="date-creat">${dateCreateDate}/${dateCreateMonth}/${dateCreateYear}</th>
      <th class="copy" id="copy">Copy</th>
      <th class="edit" id="edit">Sửa</th>
      <th class="delete" id="delete">Xóa</th>
    `;

    content.appendChild(item);
    updateEvent(item, index, id, element);
  }
  alert('Lọc thành công sản phẩm!');
});

// Reset
const resetBtn = document.querySelector('.product--reset__btn');
resetBtn.addEventListener('click', () => {
  productName.value = '';
  productCode.value = '';
  categorySelect.value = 'all';
  filteredData = [...data];
  generatePagination(filteredData);
  loadData(data);
});

// Tự động return lại trang product page khi sửa hay xóa sp
const autoReturnProductPageWhenReload = () => {
  const taskbarItems = document.querySelectorAll('.admin__taskbar--body__list li');
  const contentElements = document.querySelectorAll('.admin__content');

  // Ẩn đi hết trạng thái active bên thanh sidebar
  taskbarItems.forEach(item => {
    item.classList.remove('active');
  });

  // Ẩn đi hết nội dụng phần content
  contentElements.forEach(content => {
    content.classList.add('hideItem');
  });

  // Hiện nội dung trang product
  // Bật trạng thái active cho product bên sidebar
  document.querySelector('.admin__taskbar--body__list #product').classList.add('active');
  productContent.classList.remove('hideItem');
};

window.addEventListener('load', e => {
  const isNeedReturn = JSON.parse(localStorage.getItem('needReturnProductPage'));
  if (isNeedReturn) {
    autoReturnProductPageWhenReload();
    localStorage.setItem('needReturnProductPage', JSON.stringify(false));
  }
});
