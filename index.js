const container = document.querySelector(".container");

const API_URL = "https://api.punkapi.com/v2/beers";

const render = (data) => {
  if (!data.length) return;
  const fragment = document.createDocumentFragment();
  data.forEach(({ name, tagline, description, image_url: imageURL }) => {
    const div = document.createElement("div");
    div.classList.add("beer");
    div.innerHTML = `
        <div class="beer--content">
        <h1 class="beer--title">${name}</h1>
        <p class="beer--tagline">${tagline}</p>
        <p class="beer--description">${description}</p>
        </div>
        <img class="beer--image" src="${imageURL}">
        `;
    fragment.appendChild(div);
  });
  container.appendChild(fragment);
};

const success = (data) => {
  const beers = JSON.parse(data.target.responseText);
  console.log("beers:", beers);
  render(beers);
};

const error = (error) => {
  console.log(error);
};
const req = new XMLHttpRequest();
req.onload = success;
req.onerror = error;
// to samo
// req.addEventListener('load', success)
// req.addEventListener('error', error)
req.open("GET", API_URL);
req.send();
