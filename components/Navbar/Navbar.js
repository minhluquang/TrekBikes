import DUMMY_PRODUCTS from '../../../database/products.js'
const data = DUMMY_PRODUCTS;
const navbarToggle = document.getElementById('navbar-toggler')
const navDropdown = document.getElementById('nav-dropdown')
const userLocal = JSON.parse(localStorage.getItem('userData'));
const input = document.getElementById('input');
const statusSearch = document.getElementById('statusSearch');
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
const paging = document.getElementById('pagination')
const returnPage = document.getElementById('return-to-page');
const overlay = document.getElementById('overlay')


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
                         <img src="/${data[i].imgSrc}">
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

const overlayPrice = overlay.querySelector('#overlay-price')
const overlayClose = overlay.querySelector('#close-toggler');

const overlayAddCart = overlay.querySelector('#overlay-add-cart')

const toastAddCart = document.querySelector('.toast-add-cart');
const toastSaveProduct = document.querySelector('.toast-save-product');
const toast = document.querySelectorAll('.toast');
const toastContainer = document.querySelector('.toast-container')
const overlayid = document.getElementById('overlayid');
const navItemHeart = document.getElementById('nav-item-heart')
input.addEventListener('input', (event) => {
    event.preventDefault();
    if (input.value.length < 0 || input.value === '') {
        searchValue.style.display = 'none';
    } else {
        searchValue.style.display = 'block';
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
                <span id="id">${e.ID}</span>
                 <img src="/${e.imgSrc}">
                <p>${e.name}</p>
            `;
            searchValue.appendChild(searchInfoValue);
            searchValue.style.border = '1px solid gray';
            const id = searchInfoValue.querySelector('#id');
            const overlayid = overlay.querySelector('#overlayid');
            const overlayImg = overlay.querySelector('img');

            const closeToggle = overlay.querySelector('#close-toggler');
            const overlayName = overlay.querySelector('.name');
            const overlayPrice = overlay.querySelector('#overlay-price');
            const overlayLike = overlay.querySelector('#overlayLike');
            let checkLike = true;
            const like = document.querySelector('#like');
            const ElementImg = document.querySelector('img')
            const ElementInfo = document.querySelector('.overlay-click')

            searchInfoValue.addEventListener('click', () => {

                overlay.style.display = 'flex';
                searchValue.style.display = 'none';
                overlayName.innerText = e.name;
                overlayImg.src = `/${e.imgSrc}`;
                overlayPrice.innerText = e.price;
                overlayid.innerHTML = id.textContent;
                console.log(overlayid);
                overlayClose.addEventListener('click', () => {

                    overlay.style.display = 'none';
                })
                let checkLikeOverlay = true;
                for (let i = 0; i < userLocal[0].like.length; i++) {
                    if (userLocal[0].like[i] == id.textContent) {
                        checkLikeOverlay = false;
                        checkLike = false;

                    }
                }

                overlayLike.addEventListener('click', () => {
                    const toastText = toastContainer.querySelector('h3');
                    for (let i = 0; i < userLocal[0].like.length; i++) {
                        if (userLocal[0].like[i] == id.textContent) {
                            checkLikeOverlay = false;
                            checkLike = false;
                            userLocal[0].like.splice(i, 1);
                        }

                    }
                    if (checkLikeOverlay) {

                        like.style.color = 'red';
                        checkLike = false;
                        checkLikeOverlay = !checkLikeOverlay;
                        toastContainer.style.display = 'flex';

                        toastText.innerText = 'Đã thêm vào danh mục yêu thích'
                        toastSaveProduct.style.display = 'flex';

                        userLocal[0].like.push(id.textContent);
                    } else {

                        toastText.innerText = 'Đã xóa khỏi danh mục yêu thích';

                        toastContainer.style.display = 'flex';


                        toastSaveProduct.style.display = 'flex';

                        overlayLike.style.color = 'gray';
                        like.style.color = 'gray';
                        checkLike = true;
                        checkLikeOverlay = !checkLikeOverlay;
                    }
                    const itemHeart = document.createElement('p');
                    itemHeart.classList.add("item-heart");
                    itemHeart.innerText = `${userLocal[0].like.length}`;
                    navItemHeart.appendChild(itemHeart)
                    const updateLike = [...new Set(userLocal[0].like)];
                    userLocal[0].like = updateLike;
                    localStorage.setItem('userData', JSON.stringify(userLocal));


                })
                toast.forEach(e => {
                    const exitToast = e.querySelector('.exit');
                    exitToast.addEventListener('click', () => {
                        toastContainer.style.display = 'none';
                        e.style.display = 'none';
                    })
                })

            })

        });

    }


})
const navItemCart = document.getElementById('nav-item-cart');

let quantity = 0;
const clickAddCart = () => {
    console.log(overlayid);
    for (let i = 0; i < userLocal[0].cart.length; i++) {

        if (userLocal[0].cart[i].id === overlayid.textContent) {
            quantity = parseInt(userLocal[0].cart[i].quantity);
            break;
        }
    }
    quantity = quantity + 1;
    toastContainer.style.display = 'flex'
    toastAddCart.style.display = 'flex';

    const process = {
        id: overlayid.textContent,
        quantity: quantity
    }
    // alert(quantity);
    let found = false;
    if (userLocal[0].cart.length > 0) {
        for (let i = 0; i < userLocal[0].cart.length; i++) {
            if (process.id === userLocal[0].cart[i].id) {
                userLocal[0].cart[i].quantity = quantity;
                found = true;
                break;
            }
        }
    }
    if (!found) {
        userLocal[0].cart.push(process);
        quantity = 0;
    }

    // alert("Ngày " + ngay + "/" + thang + "/" + nam + " lúc " + gio + ":" + phut + ":" + giay)
    localStorage.setItem('userData', JSON.stringify(userLocal));
    const itemCart = document.createElement('p');
    itemCart.classList.add("item-cart");
    itemCart.innerText = `${userLocal[0].cart.length}`;
    navItemCart.appendChild(itemCart);
}

overlayAddCart.addEventListener('click', () => {
    clickAddCart();
});

submitBtn.addEventListener('click', (e) => {

    e.preventDefault();
    const matchingProduct = database.filter(e => e.name.toLowerCase().includes(inputSearch[0].trim().toLowerCase()));



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
                statusSearch.innerText = 'Các sản phẩm tìm thấy'
                let productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                           <div class = "id">${e.ID}</div>
                             <div class="imgSrc">
                             <img src="/${e.imgSrc}">
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
                returnPage.style.display = 'flex';
                const like = productItem.querySelector('#like');
                const addCart = productItem.querySelector('#add-cart');

                const overlayClick = productItem.querySelector('.overlay-click');


                for (let i = 0; i < userLocal[0].like.length; i++) {
                    if (userLocal[0].like[i] == e.ID) {

                        like.style.color = 'red';
                    }
                }
                let checkLike = true;
                overlayClick.addEventListener('click', () => {
                    overlay.style.display = 'flex';
                    const overlayImg = overlay.querySelector('img');

                    const closeToggle = overlay.querySelector('#close-toggler');
                    const overlayName = overlay.querySelector('.name');

                    const overlayLike = overlay.querySelector('#overlayLike');



                    const overlayid = overlay.querySelector('#overlayid');
                    overlayid.innerHTML = e.ID;
                    closeToggle.addEventListener('click', () => {
                        overlay.style.display = 'none';
                        toastContainer.style.display = 'none';
                    })
                    overlayName.innerHTML = e.name;
                    overlayImg.src = `/${e.imgSrc}`;
                    overlayPrice.innerHTML = e.price;
                    let checkLikeOverlay = true;
                    for (let i = 0; i < userLocal[0].like.length; i++) {
                        if (userLocal[0].like[i] == e.ID) {
                            checkLikeOverlay = false;
                            checkLike = false;

                        }
                    }
                    overlayLike.addEventListener('click', () => {

                        const toastText = toastContainer.querySelector('h3');
                        for (let i = 0; i < userLocal[0].like.length; i++) {
                            if (userLocal[0].like[i] == e.ID) {
                                checkLikeOverlay = false;
                                checkLike = false;


                                userLocal[0].like.splice(i, 1);
                            }

                        }
                        if (checkLikeOverlay) {

                            like.style.color = 'red';
                            checkLike = false;
                            checkLikeOverlay = !checkLikeOverlay;
                            toastContainer.style.display = 'flex';

                            toastText.innerText = 'Đã thêm vào danh mục yêu thích'
                            toastSaveProduct.style.display = 'flex';

                            userLocal[0].like.push(e.ID);
                        } else {

                            toastText.innerText = 'Đã xóa khỏi danh mục yêu thích';

                            toastContainer.style.display = 'flex';


                            toastSaveProduct.style.display = 'flex';

                            overlayLike.style.color = 'gray';
                            like.style.color = 'gray';
                            checkLike = true;
                            checkLikeOverlay = !checkLikeOverlay;
                        }
                        const itemHeart = document.createElement('p');
                        itemHeart.classList.add("item-heart");
                        itemHeart.innerText = `${userLocal[0].like.length}`;
                        navItemHeart.appendChild(itemHeart)
                        const updateLike = [...new Set(userLocal[0].like)]
                        userLocal[0].like = updateLike;
                        localStorage.setItem('userData', JSON.stringify(userLocal));

                        // localStorage.setItem('User', JSON.stringify(userLocal))

                    })
                    toast.forEach(e => {
                        const exitToast = e.querySelector('.exit');
                        exitToast.addEventListener('click', () => {
                            toastContainer.style.display = 'none';
                            e.style.display = 'none';


                        })
                    })

                })

                addCart.addEventListener('click', () => {

                    for (let i = 0; i < userLocal[0].cart.length; i++) {

                        if (userLocal[0].cart[i].id === e.ID) {
                            quantity = parseInt(userLocal[0].cart[i].quantity);
                            break;
                        }
                    }
                    quantity = quantity + 1;
                    alert('đã thêm vao giỏ hàng')






                    const process = {
                        id: e.ID,
                        quantity: quantity
                    }
                    // alert(quantity);
                    let found = false;

                    if (userLocal[0].cart.length > 0) {
                        for (let i = 0; i < userLocal[0].cart.length; i++) {
                            if (process.id === userLocal[0].cart[i].id) {
                                userLocal[0].cart[i].quantity = quantity;
                                found = true;
                                break;
                            }
                        }
                    }

                    if (!found) {
                        userLocal[0].cart.push(process);
                        quantity = 0;
                    }





                    localStorage.setItem('userData', JSON.stringify(userLocal));
                    const itemCart = document.createElement('p');
                    itemCart.classList.add("item-cart");
                    itemCart.innerText = `${userLocal[0].cart.length}`;
                    navItemCart.appendChild(itemCart);

                });
                like.addEventListener('click', () => {
                    for (let i = 0; i < userLocal[0].like.length; i++) {
                        if (userLocal[0].like[i] === e.ID) {
                            checkLike = false;
                            like.style.color = 'red';
                            userLocal[0].like.splice(i, 1);
                        }
                    }
                    if (checkLike) {
                        like.style.color = 'red';

                        checkLike = !checkLike;
                        userLocal[0].like.push(e.ID);
                    } else {
                        like.style.color = '#A0A0A0';
                        overlayLike.style.color = '#A0A0A0';
                        checkLike = !checkLike;
                    }
                    const updateLike = [...new Set(userLocal[0].like)];


                    const itemHeart = document.createElement('p');
                    itemHeart.classList.add("item-heart");
                    itemHeart.innerText = `${userLocal[0].like.length}`;
                    navItemHeart.appendChild(itemHeart)
                    userLocal[0].like = updateLike;
                    console.log(userLocal);
                    localStorage.setItem('userData', JSON.stringify(userLocal));


                })
            })
        } else if (matchingProduct.length <= 0) {
            statusSearch.innerText = 'Không tìm thấy sản phẩm'
            alert('Không tìm thấy sản phẩm ');
            displayItem(0, 10)
            document.location.reload();
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





