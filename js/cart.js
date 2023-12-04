function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".cart-products");
  let cartCost = localStorage.getItem("totalCost");
  if (cartItems && productContainer) {
    productContainer.innerHTML = " ";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class="cart-single-product">
        <img src="${item.image}" alt="${item.title}">
        <p>${item.title}</p>
        <div class="adjust-products">
        <img src="../images/icons/Minus.svg" alt="Remove product" />
        <p>${item.inCart}</p>
        <img src="../images/icons/Plus.svg" alt="Add product" />
        </div>
        <p class="price price-shopping-cart">${item.price * item.inCart} EUR</p>
        <img src="../images/icons/Trash.svg" alt="Remove product from shopping cart" class="trash" />
        </div>`;
    });

    productContainer.innerHTML += `
    <div class="total-price">
        <h4>Total:</h4>
        <h4> ${cartCost} EUR</h4>
    </div>`;
  }
}

displayCart();
