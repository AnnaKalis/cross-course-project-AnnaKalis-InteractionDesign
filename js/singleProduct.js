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
            </section>`;
    productContainer.appendChild(addToCartButton);
  } catch (error) {
    productContainer.innerHTML = displayError("An error occured when uploading the product from the server!");
  }
}

getProduct();

addToCartButton.addEventListener("click", () => {
  numberOfCartItems();
});

function numberOfCartItems() {
  let numberOfProducts = localStorage.getItem("numberOfCartItems");

  numberOfProducts = parseInt(numberOfProducts);

  if (numberOfProducts) {
    localStorage.setItem("numberOfCartItems", numberOfProducts + 1);
    document.querySelector(".cart-span").textContent = numberOfProducts + 1;
  } else {
    localStorage.setItem("numberOfCartItems", 1)
    document.querySelector(".cart-span").textContent = 1;
  }
}
