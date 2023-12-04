import { displayError } from "./components/displayerror.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const productContainer = document.querySelector(".product-page");
const addToCartButton = document.createElement("button");
addToCartButton.classList.add("cta");
addToCartButton.innerText = "Add to cart";
productContainer.innerHTML = `<div class="loader"></div>`;

const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/rainy-days/" + id;

async function getProduct() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok (status: ${response.status})`);
    }

    const result = await response.json();
    productContainer.innerHTML = "";

    productContainer.innerHTML += `<img src="${result.image}" alt="${result.title}" />
            <section class="product-page-content">
              <h1>${result.title}</h1>
              <p class="price">${result.price} EUR</p>
              <p>${result.description}</p>
              <p>Gender: ${result.gender}</p>
              <p>Color: ${result.baseColor}</p>
              <form class="size">
                <label for="size">Select size:</label>
                <select name="size" id="size">
                  <option>${result.sizes[0]}</option>
                  <option>${result.sizes[1]}</option>
                  <option>${result.sizes[2]}</option>
                  <option>${result.sizes[3]}</option>
                  <option>${result.sizes[4]}</option>
                  <option>${result.sizes[5]}</option>
                </select>
              </form>
              <a href="../images/pictures/size-chart.png" class="size-chart">Size chart</a>
            </section>`;
    productContainer.appendChild(addToCartButton);

    addToCartButton.addEventListener("click", () => {
      numberOfCartItems(result);
      totalCost(result);
    });

    function numberOnLoad() {
      let numberOfProducts = localStorage.getItem("numberOfCartItems");

      if (numberOfProducts) {
        document.querySelector(".cart-span").textContent = numberOfProducts;
      }
    }

    function numberOfCartItems(result) {
      let numberOfProducts = localStorage.getItem("numberOfCartItems");

      numberOfProducts = parseInt(numberOfProducts);

      if (numberOfProducts) {
        localStorage.setItem("numberOfCartItems", numberOfProducts + 1);
        document.querySelector(".cart-span").textContent = numberOfProducts + 1;
      } else {
        localStorage.setItem("numberOfCartItems", 1);
        document.querySelector(".cart-span").textContent = 1;
      }

      setItems(result);
    }

    numberOnLoad();
  } catch (error) {
    productContainer.innerHTML = displayError("An error occured when uploading the product from the server!");
  }
}

getProduct();

function setItems(result) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[result.id] == undefined) {
      result.inCart = 0;
      cartItems = {
        ...cartItems,
        [result.id]: result,
      };
    }
    cartItems[result.id].inCart += 1;
  } else {
    result.inCart = 1;
    cartItems = {
      [result.id]: result,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(results) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost !== null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + results.price);
  } else {
    localStorage.setItem("totalCost", results.price);
  }
}
