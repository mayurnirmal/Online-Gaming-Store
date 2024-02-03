let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
/*let listProductHTML = document.querySelector('#container');*/
let listProductHTML = document.querySelector('.services-container');
let listProductHTML2 = document.querySelector('.console');
let listProducts = [];
let carts = [];
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        alert("Product Added to Cart");
        addToCart(product_id);
    }
})

listProductHTML2.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        alert("Product Added to Cart");
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    //console.log(carts);
    addCartToHtml();
}

const addCartToHtml = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            var imageElement = document.querySelector('.box[data-id="' + cart.product_id + '"] .box-img img');
            var h3Element = document.querySelector('.box[data-id="' + cart.product_id + '"] h3');
            var h2Element = document.querySelector('.box[data-id="' + cart.product_id + '"] h2');

            // Get the values
            var imageSrc = imageElement.src;
            var h3Value = h3Element.textContent;
            var h2Value = parseInt(h2Element.textContent.match(/\d+/)[0]); // Extract the first integer from h2

            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            newCart.innerHTML = `
            
                <div class="image"><img src="${imageSrc}"></div>
                <div class="name">${h3Value}</div>
                <div class="totalPrice">$${h2Value * cart.quantity}</div>
                <div class="quantity">
                    <span class="sign minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="sign plus">+</span>
            
            `;
            listCartHTML.appendChild(newCart);

        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;

            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                } break;
        }
    }
    addCartToHtml();
}

/*search bar

const searchBar = document.querySelector('.search-bar');
const boxes = document.querySelectorAll('.box');

searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    boxes.forEach(box => {
      const h3 = box.querySelector('h3');
      if (h3.innerText.toLowerCase().includes(searchTerm)) {
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });
  });
*/

const searchBar = document.querySelector('.search-bar');
const boxes = document.querySelectorAll('.box');

const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
  // search function here
  const searchTerm = searchBar.value.toLowerCase();
    boxes.forEach(box => {
      const h3 = box.querySelector('h3');
      if (h3.innerText.toLowerCase().includes(searchTerm)) {
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });
});