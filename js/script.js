import {displayError} from "./components/displayError.js"

const url = "https://api.noroff.dev/api/v1/rainy-days";

const mainAllJacketsPage = document.querySelector(".all-jackets-page");
const backToTop = document.querySelector(".back-to-top");
const productsContainer = document.createElement("div");
productsContainer.classList.add("products");
mainAllJacketsPage.insertBefore(productsContainer, backToTop);

async function getProducts() {
    try {
        const response = await fetch(url);
        const results = await response.json();
        console.log(results);
      
        const products = results;
        productsContainer.innerHTML = "";

        for (let i = 0; i < products.length; i++) {
          productsContainer.innerHTML += `<a href="../products/singleProduct.html?id=${products[i].id}" class="product">
          <img src="${products[i].image}" alt="${products[i].title}" class="product-image" />
          <p class="product-name">${products[i].title}</p>
          <p class="price">${products[i].price} EUR</p>
          </a>`;
      
        }
    } catch (error) {
        console.log("There is an error", error);
        productsContainer.innerHTML = displayError("An error occured when uploading the products from the server!");
        // // 
    }
 
};

getProducts();
