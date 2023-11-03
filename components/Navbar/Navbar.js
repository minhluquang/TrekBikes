import data from '../../data/data.js'
const navbarToggle = document.getElementById('navbar-toggler')
const navDropdown = document.getElementById('nav-dropdown')
const togglerIcon = navbarToggle.querySelectorAll('i');
const input = document.getElementById('input');
const closeIcon = '<i class="fa-solid fa-xmark"></i>'
if (!localStorage.getItem('inputSearchCheck')) {

    console.log('Mã đã chạy lần đầu tiên');
    const inputSearch = [];
    localStorage.setItem('inputSearch', JSON.stringify(inputSearch));

    localStorage.setItem('inputSearchCheck', 'true');
} else {

    console.log('Mã không chạy nữa');
}
const searchValue = document.getElementById('searchValue');
const submitBtn = document.getElementById('submit-btn');
let check = false;
const database = data;
const productList = document.getElementById('productList');
const inputSearch = JSON.parse(localStorage.getItem('inputSearch'));
const paging = document.getElementById('paging')
const returnPage = document.getElementById('return-to-page');
console.log(returnPage)
console.log(database)

function displayItem(startIndex, endIndex) {
    productList.innerHTML = '';

    for (let i = startIndex; i < endIndex; i++) {
        if (data[i].imgSrc !== undefined &&
            data[i].name !== undefined &&
            data[i].price !== undefined) {
            let colors = data[i].dataColors;
            console.log(colors);
            let productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                       <div class = "id">${data[i].ID}</div>
                         <div class="imgSrc">
                         <img src="${data[i].imgSrc}">
                         <div class="overlay-hover">
                         
                        <div class="top-button">                  
                            <i class="fa-solid fa-cart-plus" id="add-cart"></i>                        
                            <i class="fa-solid fa-heart" id="like"></i>
                        </div>
                        <div class="overlay-click">
                        
                        <button id="buy-now">
                                Mua ngay
                        </button>
                        
                        </div>

                                
                         </div>
                         </div>
                        <div class="product-information">
                             <div class="color-dots">${colors.map(color => `<div class="dot-items" style="background-color: ${color};"></div>`)}</div>
                            <h3>${data[i].name}</h3>
                            <p>Price: ${data[i].price}</p>
                        </div>
                    `;
            productList.appendChild(productItem);

        } else {
            return;
        }
    }

}




navbarToggle.addEventListener('click', () => {
    if (!check) {
        navDropdown.style.display = 'block';
        navbarToggle.style.transform = 'rotate(180deg)';
        // navbarToggle.appendChild(closeIcon);

    } else {
        navDropdown.style.display = 'none';
        navbarToggle.style.transform = 'rotate(0deg)';
    }
    check = !check;

})

input.addEventListener('input', (event) => {
    event.preventDefault();
    const inputValue = input.value.toLowerCase();

    inputSearch[0] = inputValue;
    localStorage.setItem('inputSearch', JSON.stringify(inputSearch));
    const matchingNames = database.filter(e => e.name.toLowerCase().includes(inputValue));
    if (event.key === 'enter') {
        alert('tên sản phẩm')
    }
    if (inputValue === "") {
        searchValue.innerHTML = '';
        searchValue.style.border = 'none'
        return;
    }
    searchValue.innerHTML = '';
    matchingNames.forEach(e => {
        const searchInfoValue = document.createElement('div');
        searchInfoValue.classList.add('searchItem');
        searchInfoValue.innerHTML = `
             <img src="${e.imgSrc}">
            <p>${e.name}</p>
        `;
        searchValue.appendChild(searchInfoValue);
        searchValue.style.border = '1px solid gray'
    });


})

submitBtn.addEventListener('click', () => {


    const matchingProduct = database.filter(e => e.name.toLowerCase().includes(inputSearch[0].trim().toLowerCase()));


    console.log(matchingProduct)
    productList.innerHTML = ''
    input.innerHTML = ''

    input.value = ''
    searchValue.innerHTML = ''
    searchValue.style.border = 'none'

    if (inputSearch[0].trim() === '') {
        alert('Không tìm thấy sản phẩm ');
        displayItem(0, 10)
        paging.style.display = 'flex';
    } else {
        if (matchingProduct.length > 0) {
            matchingProduct.forEach(e => {
                let colors = e.dataColors;
                paging.style.display = 'none';

                let productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                           <div class = "id">${e.ID}</div>
                             <div class="imgSrc">
                             <img src="${e.imgSrc}">
                             <div class="overlay-hover">
    
                            <div class="top-button">                  
                                <i class="fa-solid fa-cart-plus" id="add-cart"></i>                        
                                <i class="fa-solid fa-heart" id="like"></i>
                            </div>
                            <div class="overlay-click">
    
                            <button id="buy-now">
                                    Mua ngay
                            </button>
    
                            </div>
    
    
                             </div>
                             </div>
                            <div class="product-information">
                                 <div class="color-dots">${colors.map(color => `<div class="dot-items" style="background-color: ${color};"></div>`)}</div>
                                <h3>${e.name}</h3>
                                <p>Price: ${e.price}</p>
                            </div>
    
                        `;
                productList.appendChild(productItem);
                returnPage.style.display = 'flex'
            })
        } else if (matchingProduct.length <= 0) {
            alert('Không tìm thấy sản phẩm ');
            displayItem(0, 10)
            paging.style.display = 'flex';
            returnPage.style.display = 'none'
        }

    }
})
returnPage.addEventListener('click', () => {
    document.location.reload();
})
// window.addEventListener('popstate', (event) => {
//     alert('Quay lại trang');
// });





// input.addEventListener('keydown', (event) => {

//     const inputValue = input.value.toLowerCase();
//     const matchingProduct = database.filter(e => e.name.toLowerCase().includes(inputValue));
//     if (event.key === 'Enter') {

//         if (matchingProduct) {
//             matchingProduct.forEach(e => {
//                 let colors = e.dataColors;
//                 console.log(colors);
//                 let productItem = document.createElement('div');
//                 productItem.classList.add('product-item');
//                 productItem.innerHTML = `
//                        <div class = "id">${e.ID}</div>
//                          <div class="imgSrc">
//                          <img src="${e.imgSrc}">
//                          <div class="overlay-hover">

//                         <div class="top-button">                  
//                             <i class="fa-solid fa-cart-plus" id="add-cart"></i>                        
//                             <i class="fa-solid fa-heart" id="like"></i>
//                         </div>
//                         <div class="overlay-click">

//                         <button id="buy-now">
//                                 Mua ngay
//                         </button>

//                         </div>


//                          </div>
//                          </div>
//                         <div class="product-information">
//                              <div class="color-dots">${colors.map(color => `<div class="dot-items" style="background-color: ${color};"></div>`)}</div>
//                             <h3>${e.name}</h3>
//                             <p>Price: ${e.price}</p>
//                         </div>

//                     `;
//                 productList.appendChild(productItem);
//             })
//         } else {
//             alert('Không tìm thấy sản phẩm có tên: ' + inputValue);
//         }
//         input.value = '';
//         event.preventDefault();
//     }
// });



window.addEventListener('resize', () => {
    check = false;
    navDropdown.style.display = 'none';
})





