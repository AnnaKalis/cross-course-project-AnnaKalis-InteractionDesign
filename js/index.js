import {displayError} from "./components/displayError.js"

const url = "https://api.noroff.dev/api/v1/rainy-days";

const main = document.querySelector("main");
const backToTop = document.querySelector(".back-to-top");
const productsContainer = document.createElement("div");
productsContainer.classList.add("products");
main.insertBefore(productsContainer, backToTop);

async function getProducts() {
    try {
        const response = await fetch(url);
        const results = await response.json();
        console.log(results);
      
        const products = results;
        productsContainer.innerHTML = "";
        for (let i = 0; i < products.length; i++) {
          productsContainer.innerHTML += `<div class="product">
          <img src="${products[i].image}" alt="${products[i].title}" class="product-image" />
          <p class="product-name">${products[i].title}</p>
          <p class="price">${products[i].price} NOK</p>
          </div>`;
      
        }
    } catch (error) {
        console.log(error)
        productsContainer.innerHTML = "There was an error with uploading the products from the server!"
    }
 
}

getProducts();
