const feedbackSection = document.querySelector(".checkout-succesfull");
const feedbackHeader = document.createElement("h1");
const feedbackParagraph = document.createElement("p");

function createFeedback() {
  feedbackSection.appendChild(feedbackHeader);
  feedbackSection.appendChild(feedbackParagraph);
  feedbackHeader.innerText = `Payment succesfull !`;
  feedbackHeader.classList.add("checkout-succesfull-header");
  feedbackParagraph.innerText=`Your order number is 80456123.
                                Copy of your order was send to your email adress.`;
}

createFeedback();

