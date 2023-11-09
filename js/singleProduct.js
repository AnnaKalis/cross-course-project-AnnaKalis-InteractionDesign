import { displayError } from "./components/displayerror.js";

const queryString = document.location.search;
console.log(queryString);
const params = new URLSearchParams(queryString);
console.log(params);

const productContainer = document.querySelector(".product-page");
productContainer.innerHTML = `<div class="loader"></div>`;

const id = params.get("id");
console.log(id);

const url = "https://api.noroff.dev/api/v1/rainy-days/" + id;
console.log(url);

async function getProduct() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok (status: ${response.status})`);
    }

    const result = await response.json();
    console.log(result);
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
              <a href="../checkout.html" class="cta">Add to cart</a>
            </section>`;
  } catch (error) {
    console.log("An error occured: ", error);
    productContainer.innerHTML = displayError("An error occured when uploading the product from the server!");
  }
}

getProduct();
