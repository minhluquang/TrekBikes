const DUMMY_PRODUCTS = JSON.parse(localStorage.getItem('DUMMY_PRODUCTS'));

const data = DUMMY_PRODUCTS;

const hasCodeRunBefore = localStorage.getItem('hasCodeRunBefore');

if (!hasCodeRunBefore) {
  var DateTimeP = [];
  for (let i = 0; i < data.length; i++) {
    DateTimeP.push({
      createAT: '14/11/2023  20:00',
      updateAt: '14/11/2023  20:00'
    });
  }
  localStorage.setItem('DateTimeP', JSON.stringify(DateTimeP));
  localStorage.setItem('hasCodeRunBefore', true);
}

const currentDateTime = JSON.parse(localStorage.getItem('DateTimeP'));
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

function updateEvent(item,index,id, element) {
   // copy
   const copy = item.querySelector('#copy');
   copy.addEventListener('click', () => {
     copyNameProduct(element.name);
   });

   console.log(index);

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
     localStorage.setItem('DUMMY_PRODUCTS', JSON.stringify(data));
     location.reload();
   });
}

function disPlayProductItem(pageStart, pageEnd) {
  const content = document.getElementById('content');

  const id = document.getElementById('id');
  content.innerHTML = '';


    for (let index = pageStart; index < pageEnd; index++) {
      const element = data[index];
      const item = document.createElement('tr');
      item.innerHTML = `
              <th class="image"><img src="/${element.imgSrc}"></th>
              <th class="name">${element.name}</th>
              <th class="date-update">${currentDateTime[index].updateAt}</th>
              <th class="date-creat">${currentDateTime[index].createAT}</th>
              <th class="copy" id="copy">Copy</th>
              <th class="edit" id="edit">Sửa</th>
              <th class="delete" id="delete">Xóa</th>
      `;
      content.appendChild(item);
    
      updateEvent(item,index, id, element);
      console.log(element.name);
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







var totalPages = Math.ceil(data.length / 10);

var currentPage = 1;
const ITEMS_PER_PAGE = 10;
var maxPagesToShow = 5; 


function generatePagination(){
  const pagination = document.getElementById('pagination');

  pagination.innerHTML = '';

  const prevBtn = document.createElement('a');
  prevBtn.href = "javascript:void(0);";
  prevBtn.innerHTML = "&laquo;";

  prevBtn.addEventListener('click',()=>{
    if(currentPage > 1){
      currentPage--;
      generatePagination();
      loadData();
    }
  })
  pagination.appendChild(prevBtn);




  var startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow/2));
  var endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    var pageLink = document.createElement('a');
    pageLink.href = "javascript:void(0);";
    pageLink.innerHTML = i;


    if(i === currentPage){
      pageLink.classList.add("active");
    }

    pageLink.addEventListener('click',function(){
      currentPage = parseInt(this.innerHTML);
      generatePagination();
      loadData();
    })

    pagination.appendChild(pageLink);
    console.log(pageLink);

    
  }



  const nextBtn = document.createElement('a');
  nextBtn.href = "javascript:void(0);";
  nextBtn.innerHTML = "&raquo;";

  nextBtn.addEventListener('click',()=>{
    if(currentPage < totalPages){
      currentPage++;
      generatePagination();
      loadData();
    }
  })
  pagination.appendChild(nextBtn)

}

function loadData() {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  disPlayProductItem(startIndex, endIndex);

}

generatePagination();

loadData();




// filter

const manageProduct = document.getElementById('manageProduct');
const formFilter = manageProduct.querySelector('#product-filter-form');
const filterSubmitBtn = formFilter.querySelector("#filter-submit-btn");
console.log(filterSubmitBtn);

filterSubmitBtn.addEventListener('click',()=>{
  const productName = manageProduct.querySelector("#productName");
  const productCode = manageProduct.querySelector("#productCode");
  const categorySelect = manageProduct.querySelector("#categorySelect");


  if(productName.value!= "" && productCode.value == ""){
    const matchingProduct = data.filter(e => e.name.toLowerCase().includes(productName.value.trim().toLowerCase()));
    if(matchingProduct.length < 1){
      alert("khoong tim thay san pham")
    }
    const content = document.getElementById('content');
    content.innerHTML = '';
    const id = document.getElementById('id');
    for (let index = 0; index < matchingProduct.length; index++) {
        const element = matchingProduct[index];
        const item = document.createElement('tr');
        item.innerHTML = `
                <th class="image"><img src="/${element.imgSrc}"></th>
                <th class="name">${element.name}</th>
                <th class="date-update">${currentDateTime[index].updateAt}</th>
                <th class="date-creat">${currentDateTime[index].createAT}</th>
                <th class="copy" id="copy">Copy</th>
                <th class="edit" id="edit">Sửa</th>
                <th class="delete" id="delete">Xóa</th>
        `;
        console.log(element);

        content.appendChild(item);
        updateEvent(item,index, id, element);
    }
    console.log(matchingProduct)
  } 

  if(productCode.value !=""){
    productName.value = "";
    categorySelect.value = "all"
    const matchingProduct = data.filter(e => e.ID.includes(productCode.value));
    if(matchingProduct.length < 1){
      alert("khoong tim thay san pham")
    }
    const content = document.getElementById('content');
    content.innerHTML = '';
    const id = document.getElementById('id');
    for (let index = 0; index < matchingProduct.length; index++) {
        const element = matchingProduct[index];
        const item = document.createElement('tr');
        item.innerHTML = `
                <th class="image"><img src="/${element.imgSrc}"></th>
                <th class="name">${element.name}</th>
                <th class="date-update">${currentDateTime[index].updateAt}</th>
                <th class="date-creat">${currentDateTime[index].createAT}</th>
                <th class="copy" id="copy">Copy</th>
                <th class="edit" id="edit">Sửa</th>
                <th class="delete" id="delete">Xóa</th>
        `;
        console.log(element);

        content.appendChild(item);
        updateEvent(item,index, id, element);
    }
    console.log(matchingProduct)
  }

  if(categorySelect.value != "all" && productName.value == "" && productCode.value == ""){
    const matchingProduct = data.filter(e => e.type == categorySelect.value);

    if(matchingProduct.length < 1){
      alert("khoong tim thay san pham")
    }
    const content = document.getElementById('content');
    content.innerHTML = '';
    const id = document.getElementById('id');
    for (let index = 0; index < matchingProduct.length; index++) {
        const element = matchingProduct[index];
        const item = document.createElement('tr');
        item.innerHTML = `
                <th class="image"><img src="/${element.imgSrc}"></th>
                <th class="name">${element.name}</th>
                <th class="date-update">${currentDateTime[index].updateAt}</th>
                <th class="date-creat">${currentDateTime[index].createAT}</th>
                <th class="copy" id="copy">Copy</th>
                <th class="edit" id="edit">Sửa</th>
                <th class="delete" id="delete">Xóa</th>
        `;
        console.log(element);

        content.appendChild(item);
        updateEvent(item,index, id, element);
    }
    console.log(matchingProduct)

  }

})





