/*variable to get all button with add-cart class */
let carts = document.querySelectorAll('.add-cart');
console.log("carts is",carts);
let products = [{
        id:1,
        name: 'Mask',
        tag: 'mask',
        price: 19,
        inCart: 0
    },
    {
        id:2,
        name: 'Gloves',
        tag: 'gloves',
        price: 19,
        inCart: 0
    },
    {
        id:3,
        name: 'PPE Kit',
        tag: 'ppe',
        price: 19,
        inCart: 0
    },
    {
        id:4,
        name: 'Protein Powder',
        tag: 'nutriOne',
        price: 19,
        inCart: 0
    },    {
        id:5,
        name: 'Protein Shakes',
        tag: 'nutriTwo',
        price: 19,
        inCart: 0
    },    {
        id:6,
        name: 'Veggie Bowl',
        tag: 'NutriThree',
        price: 19,
        inCart: 0
    }
]
/*loop for each add to cart button click */
for (let i = 0; i < carts.length; i++) {

    carts[i].addEventListener("click", () => {
        console.log("carts[i] is",carts[i]);
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
/*function  to get cart number  on page load*/
/*if page is refreshed */
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumber');
    if (productNumbers) {
        document.querySelector('.shopping-cart span').textContent = productNumbers;
    }
}
/*function to get number of item in cart */
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumber');

    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumber', productNumbers + 1);
        document.querySelector('.shopping-cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.shopping-cart span').textContent = 1;
    }
    setItems(product);
}
/*function to store clicked product in local storage*/
function setItems(product) {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productInCart", JSON.stringify(cartItems));

}
/*function to calculate total cost */
function totalCost(product) {
    console.log("product price", product.price);
    let cartCost = localStorage.getItem("totalCost");
    console.log("cost is", cartCost);
    console.log(typeof cartCost);
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}
/*function to load cart data */
function displayCart() {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    console.log("inside display", cartItems);
    let productContainer = document.querySelector(".products");
    let totalContainer = document.querySelector(".basketTotalContainer");
    let cartCost = localStorage.getItem("totalCost");
    if (cartItems && productContainer) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
               <tr>
                    <td>${item.id}</td>
                    <td><img src="./Images/${item.tag}.jpg" class="productImage">
                        <span>${item.name}</span></td>
                        <td>${item.price}</td>
                        <td>${item.inCart}</td>
                        <td>$${item.inCart*item.price},00</td> 
                        <td>
                            <button class="closeBtn" onClick="Delete(this)"><i class="fa fa-times-circle"></i></button>
                            
                        </td>
                </tr>
            `;

        });

        totalContainer.innerHTML += `
        <h6  class="basketTotal">Grand Total:$${cartCost},00 </h6>`
    }

}
function Delete(e){
    let cartItems = localStorage.getItem("productInCart");
    cartItems=JSON.parse(cartItems);
    console.log(cartItems);
    let items=[];
    Object.values(cartItems).map(data=>{
        if(data.id!=e.parentElement.parentElement.children[0].textContent){
            items.push(data);
        }
        localStorage.setItem('productInCart',JSON.stringify(items));
        localStorage.setItem('cartNumber',0);
        localStorage.setItem('totalCost',0);
        window.location.reload();

    });

}
/*function removeCartItem(){
    let cartItem = document.querySelectorAll('.closeBtn');  
    console.log("removeItem is",cartItem);
    for (let i = 0; i < cartItem.length; i++) {
        cartItem[i].addEventListener("click", () => {
          getItem(cartItem[i]);
        })
    }
}
function getItem(product){
    let cartItems = localStorage.getItem("productInCart");
    if(cartItems){
        
    }
     
}*/
onLoadCartNumbers();
displayCart();