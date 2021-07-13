import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let cityName = params.get("city");
  return cityName;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let url = config.backendEndpoint + `/adventures?city=${city}`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    let parent = document.getElementById("data");

    // Card Column
    let cardCol = document.createElement("div");
    cardCol.className = "col-6 col-md-3 mb-4";

    // Activity Card

    let cardBody = document.createElement("div");
    cardBody.className = "activity-card";
    cardBody.id = key.id;

    // Link

    let link = document.createElement("a");
    link.href = `detail/?adventure=${key.id}`;
    link.id = key.id;

    // Category Banner

    let banner = document.createElement("div");
    banner.className = "category-banner";
    let bannerText = document.createElement("p");
    bannerText.innerText = key.category;
    banner.appendChild(bannerText);
    cardBody.appendChild(banner);

    // Activity Card Image

    let image = document.createElement("img");
    image.src = key.image;
    image.className = "img-fluid";
    cardBody.appendChild(image);

    // Activity Card Text

    let textBody = document.createElement("div");
    textBody.className = "text-md-center w-100 mt-3 p-1";

    let firstRow = document.createElement("div");
    firstRow.className = "d-flex justify-content-between";

    let activityName = document.createElement("p");
    let activityNameBold = document.createElement("b");
    activityNameBold.innerText = key.name;
    activityName.appendChild(activityNameBold);

    let activityCost = document.createElement("p");
    activityCost.innerText = "₹" + key.costPerHead;
    firstRow.appendChild(activityName);
    firstRow.appendChild(activityCost);

    let secondRow = document.createElement("div");
    secondRow.className = "d-flex justify-content-between";

    let activityDuration = document.createElement("p");
    let activityDurationBold = document.createElement("b");
    activityDurationBold.innerText = "Duration";
    activityDuration.appendChild(activityDurationBold);

    let duration = document.createElement("p");
    duration.innerText = key.duration + " hours";

    secondRow.appendChild(activityDuration);
    secondRow.appendChild(duration);
    link.appendChild(cardBody);
    textBody.appendChild(firstRow);
    textBody.appendChild(secondRow);
    cardBody.appendChild(textBody);
    cardCol.appendChild(link);
    parent.appendChild(cardCol);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(data => data.duration>=low && data.duration<=high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(data => categoryList.includes(data.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let newList = list
  
  if (filters.category.length > 0){
   newList = filterByCategory(list, filters.category);
  }
  if (filters.duration.length > 0) {
    let rg = filters.duration.split("-");
    newList = filterByDuration(newList, parseInt(rg[0]), parseInt(rg[1]));
  }
  // Place holder for functionality to work in the Stubs
  console.log(newList);
  return newList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let filter = JSON.parse(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return filter;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;

  let parent = document.getElementById('category-list');

  filters.category.forEach(element => {
    let pill = document.createElement('span');
    pill.className = 'category-filter';
    pill.innerText = element;
    // pill.id = id;
    // pill.setAttribute('id', element)
    let cross = document.createElement('i');
    cross.className = 'material-icons';
    cross.innerText = 'close'

    // Handling the close

    pill.appendChild(cross);
    parent.appendChild(pill);
  })  

}

function removeFilterPill(){
  
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
