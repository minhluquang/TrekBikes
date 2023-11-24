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

function disPlayProductItem() {
  const content = document.getElementById('content');

  const id = document.getElementById('id');
  content.innerHTML = '';

  data.map((element, index) => {
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
  });
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
disPlayProductItem();
