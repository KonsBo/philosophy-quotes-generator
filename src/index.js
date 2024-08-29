function generateQuote(event) {
  event.preventDefault();

  new Typewriter("#quote", {
    strings: [
      "Time is one of the few things we regard as regular and unchanging.Time works by measuring periods between the past, present and future.",
    ],
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

// function generateImage(event) {
//     event.preventDefault();
//     let imageElement = document.querySelector("#image");
//     imageElement.innerHTML =

// }

let quoteFormElement = document.querySelector("#quote-generator-form");
quoteFormElement.addEventListener("submit", generateQuote);

// let imageFormElement = document.querySelector("#image-generator");
// imageFormElement.addEventListener("submit", generateImage);
