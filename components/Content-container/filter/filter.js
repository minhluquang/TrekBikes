const filterIcon = document.querySelector('.filterIcon');
const filter_container = document.getElementById('filter');
const product_container = document.getElementById('product');
const dashBoardClose = document.getElementById('dash-board-icon-close');
const dashBoard = document.getElementById('dash-board');
const productList = document.getElementById('productList');
import DUMMY_PRODUCTS from "../../../database/products.js";
const data = DUMMY_PRODUCTS;




const overlay = document.getElementById('overlay');
const userLocal = JSON.parse(localStorage.getItem('User'));

const toast = document.querySelectorAll('.toast');
const toastContainer = document.querySelector('.toast-container')
const toastAddCart = document.querySelector('.toast-add-cart');
// localStorage.setItem('Carts', JSON.stringify(carts))
const navItemCart = document.getElementById('nav-item-cart');
const statusSearch = document.getElementById('statusSearch');
const returnPage = document.getElementById('return-to-page');
const paging = document.getElementById('paging')
const overlayLike = document.getElementById('overlayLike');
const navItemHeart = document.getElementById('nav-item-heart')
const selectButton = document.querySelectorAll('#selectButton');

function displayFilter() {

    if (window.innerWidth > 1000) {
        filterIcon.addEventListener('click', function () {
            if (filterIcon.classList.contains('open')) {
                filterIcon.classList.remove('open');
                filter_container.style.display = 'none';
                product_container.style.width = '100%'
            } else {
                filterIcon.classList.add('open');
                filter_container.style.display = 'block';
                product_container.style.width = '80%'
            }
        });
    } else {
        filter_container.style.display = 'none';
        filterIcon.addEventListener('click', () => {
            dashBoard.classList.toggle('show');
            console.log('filter container')


        });
        dashBoardClose.addEventListener('click', () => {
            dashBoard.classList.toggle('show');

        });
    }
}
displayFilter();

let quantity = 0;
const clickAddCart = (id) => {
    for (let i = 0; i < userLocal[0].cart.length; i++) {

        if (userLocal[0].cart[i].id === id.textContent) {
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
    // alert("Ngày " + ngay + "/" + thang + "/" + nam + " lúc " + gio + ":" + phut + ":" + giay)
    localStorage.setItem('User', JSON.stringify(userLocal));
    const itemCart = document.createElement('p');
    itemCart.classList.add("item-cart");
    itemCart.innerText = `${userLocal[0].cart.length}`;
    navItemCart.appendChild(itemCart);
}

function handleBtnClick(productItem) {
    const id = productItem.querySelector('.id');
    const addCart = productItem.querySelector('#add-cart');

    addCart.addEventListener('click', () => {
        console.log(id.textContent);
        clickAddCart(id);
    });


}

function handleOverlayProduct(productItem) {
    const clickProduct = productItem.querySelector('.overlay-click');
    const img = productItem.querySelector('img');
    const id = productItem.querySelector('.id');
    const name = productItem.querySelector('h3');
    const price = productItem.querySelector('p');

    const overlayClose = overlay.querySelector('#close-toggler');
    const overlayImg = overlay.querySelector('img');
    const overlayName = overlay.querySelector('.name');
    const overlayPrice = overlay.querySelector('#overlay-price');
    const overlayId = overlay.querySelector('#overlayid');


    toast.forEach(e => {
        const exitToast = e.querySelector('.exit');
        exitToast.addEventListener('click', () => {
            toastContainer.style.display = 'none';
            e.style.display = 'none';


        })
    })
    clickProduct.addEventListener('click', () => {
        overlayImg.src = img.src;
        overlayName.innerText = name.textContent;
        overlayPrice.innerText = price.textContent;
        overlayId.innerText = id.textContent;

        overlay.style.display = 'flex';
    })
    overlayClose.addEventListener('click', () => {
        overlay.style.display = 'none';
    })


}


function displayItem(data) {

    productList.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        if (data[i].imgSrc !== undefined &&
            data[i].name !== undefined &&
            data[i].price !== undefined) {
            let colors = data[i].dataColors;
            let checkLike = true;
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
            handleOverlayProduct(productItem);
            const id = productItem.querySelector('.id');
            const like = productItem.querySelector('#like');

            for (let i = 0; i < userLocal[0].like.length; i++) {
                if (userLocal[0].like[i] === id.textContent) {
                    checkLike = false;
                    like.style.color = 'red';

                }
            }
            handleBtnClick(productItem);

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


        } else {
            return;
        }
    }

}

window.addEventListener('resize', () => {
    document.location.reload();
})



const dropdownButton = document.querySelectorAll(".dropdown-button");



dropdownButton.forEach(e => {
    e.addEventListener('click', () => {
        const dropdownMenu = e.parentElement.querySelector(".dropdown-menu");
        if (dropdownMenu.style.display === "flex") {
            dropdownMenu.style.display = "none";
        } else {
            dropdownMenu.style.display = "flex";
        }
        console.log(e);
    })
})

const dropdownItems = document.querySelectorAll(".dropdown-menu li");
dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
        let filteredProducts = [];
        if (item.textContent === '10tr - 50tr') {
            filteredProducts = data.filter(product => {
                const price = parseInt(product.price.replace(/\D/g, '')); // Lấy giá và bỏ đi ký tự không phải là số
                return price >= 10000000 && price <= 50000000;

            })
        }
        if (item.textContent === '50tr - 100tr') {
            filteredProducts = data.filter(product => {
                const price = parseInt(product.price.replace(/\D/g, '')); // Lấy giá và bỏ đi ký tự không phải là số
                return price >= 50000000 && price <= 100000000;
            })

        }
        if (item.textContent === '100tr - 300tr') {
            filteredProducts = data.filter(product => {
                const price = parseInt(product.price.replace(/\D/g, '')); // Lấy giá và bỏ đi ký tự không phải là số
                return price >= 100000000 && price <= 300000000;
            })
        }
        statusSearch.innerText = 'Các sản phẩm tìm thấy';
        returnPage.style.display = 'flex'
        paging.style.display = 'none'
        displayItem(filteredProducts)
    });
});

const Type = document.querySelectorAll('#type-item');
Type.forEach(e => {
    let filteredProducts = [];
    e.addEventListener('click', () => {
        if (e.textContent === 'Mountain') {
            filteredProducts = data.filter(product => {
                return product.type === 'mountain';
            })
        }
        if (e.textContent === 'Road') {

            filteredProducts = data.filter(product => {
                return product.type === 'road';
            })
        }
        if (e.textContent === 'Kids') {
            filteredProducts = data.filter(product => {
                return product.type === 'kids';
            })

        }
        if (e.textContent === 'Touring') {
            filteredProducts = data.filter(product => {
                return product.type === 'touring';
            })
        }
        statusSearch.innerText = 'Các sản phẩm tìm thấy';
        returnPage.style.display = 'flex'
        paging.style.display = 'none'
        displayItem(filteredProducts)
    })

})




selectButton.forEach(e => {
    e.addEventListener('click', () => {
        const minInput = e.parentElement.querySelector('#minInput');
        const maxInput = e.parentElement.querySelector('#maxInput');

        minInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });


        maxInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });



        const minPrice = parseInt(minInput.value);
        const maxPrice = parseInt(maxInput.value);
        const filteredProducts = data.filter(product => {
            const price = parseInt(product.price.replace(/\D/g, '')); // Lấy giá và bỏ đi ký tự không phải là số
            return price >= minPrice && price <= maxPrice;
        })
        if (filteredProducts.length > 0) {
            displayItem(filteredProducts);
            statusSearch.innerText = 'Các sản phẩm tìm thấy';
            returnPage.style.display = 'flex'
            paging.style.display = 'none'
        } else {
            statusSearch.innerText = 'Không tìm thấy sản phẩm'
            productList.innerHTML = '';
            returnPage.style.display = 'flex'
            paging.style.display = 'none'
        }
    })
})

