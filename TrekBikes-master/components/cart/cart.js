const carts = JSON.parse(localStorage.getItem('Carts'));
const cartInfo = document.getElementById('cart-info')
import data from "../../data/data.js";






function displayProductItems() {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < carts.length; j++) {
            if (data[i].ID === carts[j]) {
                const cartItem = document.createElement('div');
                cartItem.classList.add('info-item-container');
                cartItem.innerHTML = `

                    <div class="name-img">
                        <p class ="id">${data[i].ID}</p>
                        <img src="../../${data[i].imgSrc}">
                        <p>${data[i].name}</p>

                    </div>
                    <div class="item-info">
                        <p>${data[i].price}</p>
                        <p class="total-price">${data[i].price}</p>
                        <button id="delete-cart">delete</button>

                    </div>
                
                `
                cartInfo.appendChild(cartItem)
            }

        }
    }
}
displayProductItems();

function deleteItem() {
    const infoItems = document.querySelectorAll('.info-item-container');
    console.log(infoItems);
    for (let i = 0; i < infoItems.length; i++) {
        const element = infoItems[i];
        const deleteBtn = element.querySelector('#delete-cart');
        const id = element.querySelector('.id');
        //console.log(deleteBtn)\
        //console.log(updateCart)
        deleteBtn.addEventListener('click', () => {
            cartInfo.removeChild(element);

            for (let i = 0; i < carts.length; i++) {
                if (carts[i] === id.textContent) {
                    carts.splice(i, 1);
                }
            }
            localStorage.setItem('Carts', JSON.stringify(carts));
        })


    }
    // const deleteBtn = document.getElementById('delete-cart');

}

deleteItem();