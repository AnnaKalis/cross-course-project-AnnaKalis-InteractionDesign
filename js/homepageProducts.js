import { displayError } from "./components/displayerror.js";

const url = "https://api.noroff.dev/api/v1/rainy-days";

const featured = document.querySelector(".featured");

const homepageProductsContainer = document.createElement("div");
homepageProductsContainer.classList.add("products");
featured.append(homepageProductsContainer);
homepageProductsContainer.innerHTML = `<div class="loader"></div>`;

async function getProducts() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok (status: ${response.status})`);
    }

    const results = await response.json();

    const products = results;
    homepageProductsContainer.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
      if (i === 3) {
        break;
      }

      homepageProductsContainer.innerHTML += `
          <a href="../products/singleproduct.html?id=${products[i].id}" class="product">
          <div class="product-card">
            <img src="${products[i].image}" alt="${products[i].title}" class="product-image" />
            <p class="product-name">${products[i].title}</p>
            <p class="price">${products[i].price} EUR</p>
            <p class="gender-tag">${products[i].gender}</p>
          </div>
          </a>`;
    }
  } catch (error) {
    homepageProductsContainer.innerHTML = displayError(
      "An error occured when uploading the products from the server!"
    );
  }
}

getProducts();
