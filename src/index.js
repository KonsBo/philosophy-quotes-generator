// Display the generated quote
function displayQuote(response) {
  new Typewriter("#quote", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

// Display the background image
function displayBackgroundImage(imageUrl) {
  document.body.style.backgroundImage = `url(${imageUrl})`;
}

function generateQuote(event) {
  event.preventDefault();

  // Build the API URL
  let instructionsInput = document.querySelector("#user-instructions");

  let apiKey = "fo0aeaadb1171c3bat01accf9c25f94b";

  let context =
    "You are a quote expert and you can give quotes of every author in the world. Especially quotes from poets, scientists, philosophers, academics in general. Your mission is to generate a top 5 line quote providing it with a HTML format. You just have to include the word that is given by the user, finding a topic. If you find the instructed word just give the answer and the name, don't say anything else. If the instruction given by the user is unknown, add a quote from an existing one, saying first politely that you can't find a quote with the word that is given. Please follow the users' instructions. ";

  let prompt = `Users' instructions: Generate a quote from ${instructionsInput.value}. Provide the authors' name into a <strong> element.`;

  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let quoteElement = document.querySelector("#quote");
  quoteElement.classList.remove("hidden");
  quoteElement.innerHTML = `<div class="generating">⏳Generating a special quote from ${instructionsInput.value}</div>`;

  // Make a call to the API for the quote
  axios.get(apiURL).then(displayQuote);

  // Make a call to the Unsplash API for the image
  let unsplashApiKey = "r5Ax6pxb8Pur_qwmM5VPpIFReMBV_w5Ib29_K05sjEQ";
  let unsplashApiURL = `https://api.unsplash.com/photos/random?query=abstract,${encodeURIComponent(
    instructionsInput.value
  )}&client_id=${unsplashApiKey}`;

  axios
    .get(unsplashApiURL)
    .then(function (response) {
      let imageUrl = response.data.urls.regular;
      displayBackgroundImage(imageUrl);

      // Change the footer background color after the image is successfully fetched
      let footer = document.querySelector("footer");
      footer.style.color = "white";
    })
    .catch(function (error) {
      console.error("Error fetching the image:", error);
    });
}

let quoteFormElement = document.querySelector("#quote-generator-form");
quoteFormElement.addEventListener("submit", generateQuote);

// Display the background image with responsive styling
function displayBackgroundImage(imageUrl) {
  const body = document.body;
  body.style.backgroundImage = `url(${imageUrl})`;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundAttachment = "fixed"; /* Keeps the background fixed */

  // Optional: Adjust the background for very small screens
  if (window.innerWidth < 768) {
    body.style.backgroundAttachment = "scroll";
  } else {
    body.style.backgroundAttachment = "fixed";
  }
}
