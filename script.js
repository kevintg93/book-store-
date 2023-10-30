if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){


    let removeCartItemButtons = document.getElementsByClassName('btn-danger');

    Array.from(removeCartItemButtons).forEach((element)=>{
        let button = element;
        button.addEventListener('click',removeCartItem)
    });

    let quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < quantityInputs.length;i++){
        let input =quantityInputs[i];
        input.addEventListener('change',quantityChanged);
    }

    let addToCartButton = document.querySelectorAll('.shop-item-button')
    Array.from(addToCartButton).forEach((cartButton)=>{
        cartButton.addEventListener('click',addCartItem);
    });

}

function addCartItem(event){
    let cartButton = event.target;
    let shopItem = cartButton.parentElement.parentElement;
    let cartItems = document.querySelector('.cart-items');
    let newItemTitle = shopItem.querySelector('.shop-item-title').innerHTML;
    let quantity = cartItems.getElementsByClassName("cart-quantity-input")
    let title = cartItems.getElementsByClassName("cart-item-title");
    for(let i=0;i < title.length;i++){
        if (title[i].innerHTML === newItemTitle){
            quantity[i].value = parseInt(quantity[i].value) + 1;
            return;
        }if (title[i].innerHTML !== newItemTitle){
            let cartRow = document.createElement('div')
            cartRow.setAttribute('class','cart-row')
            cartRow.innerHTML= `         
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${shopItem.querySelector(".shop-item-image").src}" width="100" height="100">
                <span class="cart-item-title">${newItemTitle}</span>
            </div>
            <span class="cart-price cart-column">${shopItem.querySelector(".shop-item-price").innerHTML}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1" min="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;
            cartItems.appendChild(cartRow);
        }

    }
    
    updateCartTotal()
    }

   
        
    

function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal()
}

function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


function updateCartTotal(){
    let parent = document.querySelector(".cart-items")
    let cartprice =  parent.querySelectorAll(".cart-price");
    let quantity = document.querySelectorAll(".cart-quantity-input");
    let total = 0
    for( let i = 0; i < cartprice.length; i++){
        let price = parseFloat(cartprice[i].innerHTML.slice(1,));
        total += (price *quantity[i].value);
    }
    
    document.querySelector(".cart-total-price").innerHTML = `\$${total.toFixed(2)}`;
}

