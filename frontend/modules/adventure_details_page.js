import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let params = new URLSearchParams(search);
  let adventureId = params.get('adventure');
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let url = config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById('adventure-name').innerHTML = adventure.name;
  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;

  let photoParent = document.getElementById('photo-gallery');

  adventure.images.forEach(img => {
    let imgTag = document.createElement('img');
    imgTag.src = img;
    imgTag.className = 'activity-card-image';
    photoParent.appendChild(imgTag);
  })

  document.getElementById('adventure-content').innerHTML = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let parent = document.getElementById('photo-gallery');
  parent.innerHTML = "";
  let div = document.createElement('div');
  div.className = 'carousel slide';
  div.setAttribute('data-bs-ride', 'carousel');
  div.setAttribute('id', 'imageCarousel');

  let indicators = document.createElement('div');
  indicators.className = 'carousel-indicators'

  for(let i=0; i<images.length; i++){
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-target', '#imageCarousel');
    button.setAttribute('data-bs-slide-to', `${i}`);
    button.setAttribute('aria-label', `slide ${i+1}`);
    if(i==0){
    button.className = 'active';
    button.setAttribute('aria-current', 'true');
    }
    indicators.appendChild(button);
  }
  div.appendChild(indicators);
  
  let carouselInner = document.createElement('div');
  carouselInner.className = 'carousel-inner';

  for(let i=0; i<images.length; i++){
    let div = document.createElement('div');
    if(i==0){
      div.className = 'carousel-item activity-card-image active';
    }
    else {
      div.className = 'carousel-item activity-card-image';
    }
    let img = document.createElement('img');
    img.src = images[i];
    img.className = 'd-block w-100 h-100 img-fluid'
    div.appendChild(img);
    carouselInner.appendChild(div);
  }
  div.appendChild(carouselInner);

  // Previous Arrow

  let prevArrow = document.createElement('button');
  prevArrow.className = 'carousel-control-prev';
  prevArrow.setAttribute('type', 'button');
  prevArrow.setAttribute('data-bs-target', '#imageCarousel')
  prevArrow.setAttribute('data-bs-slide', 'prev')

  let prevSpan1 = document.createElement('span');
  prevSpan1.className = 'carousel-control-prev-icon';
  prevSpan1.setAttribute('aria-hidden', 'true');
  prevArrow.appendChild(prevSpan1);

  let prevSpan2 = document.createElement('span');
  prevSpan2.className = 'visually-hidden';
  prevSpan2.innerHTML = 'Previous';
  prevArrow.appendChild(prevSpan2);

  div.appendChild(prevArrow);

  // Next Arrow

  let nextArrow = document.createElement('button');
  nextArrow.className = 'carousel-control-next';
  nextArrow.setAttribute('type', 'button');
  nextArrow.setAttribute('data-bs-target', '#imageCarousel')
  nextArrow.setAttribute('data-bs-slide', 'next')

  let nextSpan1 = document.createElement('span');
  nextSpan1.className = 'carousel-control-next-icon';
  nextSpan1.setAttribute('aria-hidden', 'true');
  nextArrow.appendChild(nextSpan1);

  let nextSpan2 = document.createElement('span');
  nextSpan2.className = 'visually-hidden';
  nextSpan2.innerHTML = 'Next';
  nextArrow.appendChild(nextSpan2);

  div.appendChild(nextArrow);

  parent.appendChild(div);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available == true){
    document.getElementById("reservation-panel-sold-out").style.display = "none"
    document.getElementById("reservation-panel-available").style.display = "block"
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else {
    document.getElementById("reservation-panel-available").style.display = "none"
    document.getElementById("reservation-panel-sold-out").style.display = "block"
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerHead = adventure.costPerHead;
  let totalReservationCost = costPerHead*persons;
  document.getElementById('reservation-cost').innerHTML = totalReservationCost;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $(document).on('submit', '#myForm', function(event){
    event.preventDefault();
    // let endPoint = config.backendEndpoint + `/reservations/new`;
    let endPoint = `${config.backendEndpoint}/reservations/new`;
    let data = $(this).serialize()+'&adventure='+adventure.id;
    $.ajax({
      url: endPoint,
      type: "POST",
      data: data,
      success: function(response){
        alert("Success!");
        window.location.reload();
      },
      error: function(){
        alert("Failed!");
      }
    });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved == true){
    document.getElementById('reserved-banner').style.display = 'block';
  } else {
    document.getElementById('reserved-banner').style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
