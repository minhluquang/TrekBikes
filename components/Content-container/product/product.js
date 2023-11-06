import DUMMY_PRODUCTS from '../../../database/products.js'
const productList = document.getElementById('productList');
const data = DUMMY_PRODUCTS;
console.log(DUMMY_PRODUCTS);
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const item2 = document.getElementById('prev-item2');
const item1 = document.getElementById('prev-item1');
const id1 = document.getElementById('id1');
const id2 = document.getElementById('id2');
const pageStart = document.getElementById('page-start');
const pageEnd = document.getElementById('page-end');
const toastBought = document.querySelector('.toast-bought')
const toastAddCart = document.querySelector('.toast-add-cart');
const toastSaveProduct = document.querySelector('.toast-save-product');
const toast = document.querySelectorAll('.toast');
const toastContainer = document.querySelector('.toast-container')

const overlayAddCart = document.getElementById('overlay-add-cart');
const overlayid = document.getElementById('overlayid');
const closeToggle = document.getElementById('close-toggler');
const overlayName = document.getElementById('name');
const overlayPrice = document.getElementById('overlay-price');
const overlayLike = document.getElementById('overlayLike');

const overlayBuyNow = document.getElementById('overlay-buy-now')

function generateRandomUserID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let userID = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        userID += characters.charAt(randomIndex);
    }

    return userID;
}


const user = [
    {
        id: generateRandomUserID(5),
        email: '',
        name: '',
        username: ' ',
        password: ' ',
        like: [],
        createLikeAt: [],
        cart: [],
        createCartAt: [],
        processing: [],
        bought: [],
        processAt: [],
        createBoughtAt: [],
    }
]

if (!localStorage.getItem('codeHasRunBefore')) {

    console.log('Mã đã chạy lần đầu tiên');
    const liked = [];

    localStorage.setItem('User', JSON.stringify(user));




    localStorage.setItem('codeHasRunBefore', 'true');
} else {

    console.log('Mã không chạy nữa');
}
const userLocal = JSON.parse(localStorage.getItem('User'));

if (userLocal && userLocal.length > 0) {
    const firstUserLike = userLocal[0];
    console.log(firstUserLike);
} else {
    console.log('Không có dữ liệu hoặc mảng userLocal rỗng.');
}

// localStorage.setItem('liked', JSON.stringify(liked))





// localStorage.setItem('Carts', JSON.stringify(carts))
const navItemCart = document.getElementById('nav-item-cart');
const navItemHeart = document.getElementById('nav-item-heart')

let productsPerPage = 10;
let currentPage = 1;




const clickBuy = () => {
    const id = overlayid.textContent;
    localStorage.setItem('currentIdbuy', JSON.stringify(id));

}
let quantity = 0;

const clickAddCart = () => {
    for (let i = 0; i < userLocal[0].cart.length; i++) {

        if (userLocal[0].cart[i].id === overlayid.textContent) {
            quantity = parseInt(userLocal[0].cart[i].quantity);
            break;
        }
    }
    quantity = quantity + 1;
    toastContainer.style.display = 'flex'
    toastAddCart.style.display = 'flex';
    var currentTime = new Date();
    var ngay = currentTime.getDate();
    var thang = currentTime.getMonth() + 1;
    var nam = currentTime.getFullYear();
    var gio = currentTime.getHours();
    var phut = currentTime.getMinutes();
    var giay = currentTime.getSeconds();
    const processAt = {
        id: overlayid.textContent,
        time: `${gio}:${phut}:${giay}`,
        date: `${ngay}/${thang}/${nam} `,
    }
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
    userLocal[0].createCartAt.push(processAt);
    // alert("Ngày " + ngay + "/" + thang + "/" + nam + " lúc " + gio + ":" + phut + ":" + giay)
    localStorage.setItem('User', JSON.stringify(userLocal));
    const itemCart = document.createElement('p');
    itemCart.classList.add("item-cart");
    itemCart.innerText = `${userLocal[0].cart.length}`;
    navItemCart.appendChild(itemCart);
}

overlayAddCart.addEventListener('click', () => {
    clickAddCart();
});
overlayBuyNow.addEventListener('click', () => {
    clickBuy();
})

toast.forEach(e => {
    const exitToast = e.querySelector('.exit');
    exitToast.addEventListener('click', () => {
        toastContainer.style.display = 'none';
        e.style.display = 'none';


    })
})
let checkLike = true;


let checkLikeOverlay = true;

function clickSave(like) {
    const id = overlay.querySelector('#overlayid');
    var index = 0;
    for (let i = 0; i < userLocal[0].like.length; i++) {
        if (userLocal[0].like[i] === id.textContent) {
            checkLikeOverlay = false;
            checkLike = false;
            index = i;
            break;

        }
        if (userLocal[0].like[i] !== id.textContent) {
            checkLike = true;
            checkLikeOverlay = true;

        }
    }
    var like;
    const productItem = document.querySelectorAll('.product-item');
    for (let i = 0; i < productItem.length; i++) {
        let pId = productItem[i].querySelector('.id');
        if (id.textContent === pId.textContent) {
            like = productItem[i].querySelector('#like')
        }
    }
    console.log(like);

    const toastText = toastContainer.querySelector('h3');


    console.log(checkLikeOverlay);
    if (checkLikeOverlay) {
        like.style.color = 'red';
        checkLike = false;
        checkLikeOverlay = !checkLikeOverlay;
        toastContainer.style.display = 'flex';
        toastText.innerText = 'Đã thêm vào danh mục yêu thích'
        toastSaveProduct.style.display = 'flex';
        userLocal[0].like.push(id.textContent);
        checkLikeOverlay = !checkLikeOverlay;
    } else {

        toastText.innerText = 'Đã xóa khỏi danh mục yêu thích';
        toastContainer.style.display = 'flex';
        toastSaveProduct.style.display = 'flex';
        overlayLike.style.color = 'gray';
        like.style.color = 'gray';
        checkLike = true;
        checkLikeOverlay = !checkLikeOverlay;
        userLocal[0].like.splice(index, 1);

    }
    const itemHeart = document.createElement('p');
    itemHeart.classList.add("item-heart");
    itemHeart.innerText = `${userLocal[0].like.length}`;
    navItemHeart.appendChild(itemHeart)
    const updateLike = [...new Set(userLocal[0].like)]
    userLocal[0].like = updateLike;
    localStorage.setItem('User', JSON.stringify(userLocal));

    localStorage.setItem('User', JSON.stringify(userLocal))
}

overlayLike.addEventListener('click', () => {
    clickSave();
})




function displayItem(startIndex, endIndex) {
    productList.innerHTML = '';
    for (let i = startIndex; i < endIndex; i++) {
        if (data[i].imgSrc !== undefined &&
            data[i].name !== undefined &&
            data[i].price !== undefined) {
            let colors = data[i].dataColors;

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
displayItem(0, productsPerPage);


const itemCart = document.createElement('p');
itemCart.classList.add("item-cart");
itemCart.innerText = `${userLocal[0].cart.length}`;
const overlay = document.getElementById('overlay')

navItemCart.appendChild(itemCart);
const itemHeart = document.createElement('p');
itemHeart.classList.add("item-heart");
itemHeart.innerText = `${userLocal[0].like.length}`;
navItemHeart.appendChild(itemHeart);

var spacePageEnd = 1100;


if (window.innerWidth < 700) {
    spacePageEnd = 0;

}
if (window.innerWidth < 1000) {
    spacePageEnd = 0;

}


function updateEvent() {

    const productItems = document.querySelectorAll('.product-item');

    for (let i = 0; i < productItems.length; i++) {
        const Element = productItems[i];
        const addCart = Element.querySelector('#add-cart');
        const id = Element.querySelector('.id');
        const colorDots = Element.querySelector('.dot');

        let checkLike = true;

        const like = Element.querySelector('#like');
        const ElementImg = Element.querySelector('img')
        const ElementInfo = Element.querySelector('.overlay-click')


        ElementInfo.addEventListener('click', () => {
            overlay.style.display = 'flex';
            const overlayImg = overlay.querySelector('img');
            console.log(overlayImg)
            const closeToggle = overlay.querySelector('#close-toggler');
            const overlayName = overlay.querySelector('.name');
            const overlayPrice = overlay.querySelector('#overlay-price');



            const id = Element.querySelector('.id');
            const overlayid = overlay.querySelector('#overlayid');
            overlayid.innerHTML = id.textContent;
            closeToggle.addEventListener('click', () => {
                overlay.style.display = 'none';
                toastContainer.style.display = 'none';
            })
            overlayName.innerHTML = `${Element.querySelector('h3').textContent}`
            overlayImg.src = `${ElementImg.src}`;
            overlayPrice.innerHTML = `${Element.querySelector('p').textContent}`

            for (let i = 0; i < userLocal[0].like.length; i++) {
                if (userLocal[0].like[i] == id.textContent) {
                    checkLikeOverlay = false;
                    checkLike = false;

                }
            }
        })
        for (let i = 0; i < userLocal[0].like.length; i++) {
            if (userLocal[0].like[i] === id.textContent) {
                like.style.color = 'red';

            }
        }
        addCart.addEventListener('click', () => {

            for (let i = 0; i < userLocal[0].cart.length; i++) {

                if (userLocal[0].cart[i].id === id.textContent) {
                    quantity = parseInt(userLocal[0].cart[i].quantity);
                    break;
                }
            }
            console.log(quantity);
            quantity = quantity + 1;
            alert('đã thêm vao giỏ hàng')
            var currentTime = new Date();
            var ngay = currentTime.getDate();
            var thang = currentTime.getMonth() + 1;
            var nam = currentTime.getFullYear();
            var gio = currentTime.getHours();
            var phut = currentTime.getMinutes();
            var giay = currentTime.getSeconds();


            const processAt = {
                id: id.textContent,
                time: `${gio}:${phut}:${giay}`,
                date: `${ngay}/${thang}/${nam} `,
            }
            const process = {
                id: id.textContent,
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



            userLocal[0].createCartAt.push(processAt);

            localStorage.setItem('User', JSON.stringify(userLocal));
            const itemCart = document.createElement('p');
            itemCart.classList.add("item-cart");
            itemCart.innerText = `${userLocal[0].cart.length}`;
            navItemCart.appendChild(itemCart);

        });
        like.addEventListener('click', () => {
            for (let i = 0; i < userLocal[0].like.length; i++) {
                if (userLocal[0].like[i] === id.textContent) {
                    checkLike = false;
                    like.style.color = 'red';
                    userLocal[0].like.splice(i, 1);
                }
            }
            if (checkLike) {
                like.style.color = 'red';

                checkLike = !checkLike;
                userLocal[0].like.push(id.textContent);
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
            localStorage.setItem('User', JSON.stringify(userLocal));


        })
    }
}
prevPageButton.addEventListener('click', () => {

    if (currentPage > 1) {
        currentPage--;
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        displayItem(startIndex, endIndex);

        if (currentPage == 1) {
            id1.style.backgroundColor = '#333';
            id1.style.color = 'white';
            id2.style.backgroundColor = 'white';
            id2.style.color = 'black';
            id3.style.backgroundColor = 'white';
            id3.style.color = 'black';
            console.log('current == 1 vi tri 1')
        }
        if (currentPage < 3) {
            if (currentPage == 2) {
                id2.innerText = '2';
                id3.innerText = '3';
                id1.innerText = '1';
                id1.style.backgroundColor = 'white';
                id1.style.color = 'black';
                id2.style.backgroundColor = '#333';
                id2.style.color = 'white';
                id3.style.backgroundColor = 'white';
                id3.style.color = 'black';
                console.log('current == 2')
            }
            if (currentPage == 1) {
                id1.style.backgroundColor = '#333';
                id1.style.color = 'white';
                id2.style.backgroundColor = 'white';
                id2.style.color = 'black';
                id3.style.backgroundColor = 'white';
                id3.style.color = 'black';
                console.log('current == 1')
            }
            if (currentPage == 3) {
                id2.innerText = '2';
                id3.innerText = '3';
                id1.innerText = '1';
                id3.style.backgroundColor = '#333';
                id3.style.color = 'white';
                id1.style.backgroundColor = 'white';
                id1.style.color = 'black';
                id2.style.backgroundColor = 'white';
                id2.style.color = 'black';
                console.log('current == 3')
            }
            item1.style.display = 'none';
            pageStart.style.display = 'none';
        } else {
            id2.style.backgroundColor = '#333';
            id2.style.color = 'white';
            id1.style.backgroundColor = 'white';
            id1.style.color = 'black';
            id3.style.backgroundColor = 'white';
            id3.style.color = 'black';
            id2.innerText = `${currentPage}`;
            id3.innerText = `${currentPage + 1}`;
            id1.innerText = `${currentPage - 1}`;
        }
        if (currentPage == 3) {
            item1.style.display = 'none';
        }
        if (currentPage < 8) {
            if (window.innerWidth > 700) {

                item2.style.display = 'block';
                pageEnd.style.display = 'block';
            }

        }
        if (currentPage >= 7) {
            item2.style.display = 'none';
        }

    }





    updateEvent();

});
pageStart.addEventListener('click', () => {
    displayItem(0, productsPerPage);
    pageStart.style.display = 'none';
    pageEnd.style.display = 'block';
    currentPage = 1;
    item1.style.display = 'none';
    item2.style.display = 'block';
    id2.innerText = '2';
    id3.innerText = '3';
    id1.innerText = '1';
    id1.style.backgroundColor = '#333';
    id1.style.color = 'white';
    id2.style.backgroundColor = 'white';
    id2.style.color = 'black';
    id3.style.backgroundColor = 'white';
    id3.style.color = 'black';



    updateEvent();

})
pageEnd.addEventListener('click', () => {
    displayItem(80, 90);
    pageEnd.style.display = 'none';
    pageStart.style.display = 'block';
    item1.style.display = 'block';
    item2.style.display = 'none';
    console.log('clicked');
    currentPage = 9;
    id2.innerText = '8';
    id3.innerText = '9';
    id1.innerText = '7';
    id1.style.backgroundColor = 'white';
    id1.style.color = 'black';
    id2.style.backgroundColor = 'white';
    id2.style.color = 'black';
    id3.style.backgroundColor = '#333';
    id3.style.color = 'white';



    updateEvent();

})
nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(data.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        displayItem(startIndex, endIndex);

        if (currentPage == 9) {
            id3.style.backgroundColor = '#333';
            id3.style.color = 'white';
            id1.style.backgroundColor = 'white';
            id1.style.color = 'black';
            id2.style.backgroundColor = 'white';
            id2.style.color = 'black';
        } else {
            id2.style.backgroundColor = '#333';
            id2.style.color = 'white';
            id1.style.backgroundColor = 'white';
            id1.style.color = 'black';
            id3.style.backgroundColor = 'white';
            id3.style.color = 'black';
            id2.innerText = `${currentPage}`;
            id3.innerText = `${currentPage + 1}`;
            id1.innerText = `${currentPage - 1}`;
        }
        if (currentPage == 3) {
            if (window.innerWidth > 700) {

                pageStart.style.display = 'block';
            }
            item1.style.display = 'none';
        }
        if (currentPage > 3 && currentPage < 7) {
            if (window.innerWidth >= 700) {

                item1.style.display = 'block';
                pageStart.style.display = 'block';
            }
        }
        if (currentPage >= 7) {
            item2.style.display = 'none';

            pageEnd.style.transform = `translateX(-${spacePageEnd}%)`
        }
        if (currentPage >= 8) {
            item2.style.display = 'none';

            pageEnd.style.display = 'none';
        }
        console.log(currentPage);
        console.log('startIndex' + startIndex)
        console.log('endIndex' + endIndex)
    }



    updateEvent();
});


updateEvent()






// NAV BAR





























// for (let i = 0; i < data.length; i++) {
//     if (data[i].name != 'undefined') {


//         let productItem = document.createElement('div');
//         productItem.classList.add('product-item');
//         productItem.innerHTML = `

//                          <div class="imgSrc">
//                          <img src="${data[i].imgSrc}">
//                          <div class="overlay-hover">

//                         <div class="top-button">
//                             <button id="add-cart">
//                             <i class="fa-solid fa-cart-plus"></i>
//                             </button>
//                             <button id="heart-button">
//                                 <i class="fa-regular fa-heart" id="dislike"></i>
//                                 <i class="fa-solid fa-heart" id="like"></i>
//                             </button>
//                         </div>

//                                 <button id="buy-now">
//                                     Mua ngay
//                                 </button>

//                          </div>
//                          </div>
//                         <div class="product-information">
//                              <div class="color-dots">${data[i].dataColors.map(color => `<div class="dot-items" style="background-color: ${color};"></div>`).join('')}</div>
//                             <h3>${data[i].name}</h3>
//                             <p>Price: ${data[i].price}</p>
//                         </div>

//                     `;
//         productList.appendChild(productItem);







//     }
// }




