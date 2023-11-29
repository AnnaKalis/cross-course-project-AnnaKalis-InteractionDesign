const feedbackSection = document.querySelector(".checkout-succesfull");
const feedbackHeader = document.createElement("h1");
const feedbackParagraph = document.createElement("p");
const followContainer = document.querySelector(".follow");

function createFeedback() {
  feedbackSection.insertBefore(feedbackParagraph, followContainer);
  feedbackSection.insertBefore(feedbackHeader, feedbackParagraph);
  feedbackHeader.innerText = `Thank you for contacting us!`;
  feedbackParagraph.innerText = `We will get back to you as soon as possible and within 24 hours.`;
}

createFeedback();
