import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let url = config.backendEndpoint + "/cities/";
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parent = document.getElementById('data');

  // Creating columns col-6 col-md-3

  let cardCol = document.createElement('div');
  cardCol.className = 'col-6 col-md-3 mb-4';

  // Creating Card

  let cardBody = document.createElement('div');
  cardBody.className = 'tile'
  cardBody.id = id;

  // Card Image

  let cardImage = document.createElement('img');
  cardImage.className = 'img-fluid';
  cardImage.src = image;
  cardBody.appendChild(cardImage);

  // Card Text div

  let cardText = document.createElement('div');
  cardText.className = 'tile-text';

  // Card Text Heading

  let cardHeading = document.createElement('h5');
  cardHeading.innerText = city;
  cardText.appendChild(cardHeading);

  // Card Text Body

  let cardTextBody = document.createElement('p');
  cardTextBody.innerText = description;
  cardText.appendChild(cardTextBody);

  // Card Anchor Tag
  let link = document.createElement('a');
  // let href = `${id}`.toLowerCase();
  link.id = `${id}`;
  link.href = `./pages/adventures/?city=${id}`

  link.appendChild(cardBody);
  cardBody.appendChild(cardText);
  cardCol.appendChild(link);
  parent.appendChild(cardCol);
}

export { init, fetchCities, addCityToDOM };
