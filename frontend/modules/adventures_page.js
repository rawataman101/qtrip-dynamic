import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  const city = urlParams.get("city");
  //console.log(city);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const reponse = await fetch(
      `${config.backendEndpoint}/adventures/?city=bengaluru`
    );
    const adventures = await reponse.json();
    console.log(adventures);
    return adventures;
  } catch (e) {
    console.log("Error in fetch adventures");
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  if (adventures) {
    adventures.forEach(
      ({ id, category, image, name, costPerHead, duration }) => {
        // banner
        const bannerDiv = document.createElement("div");
        bannerDiv.className = "category-banner";
        bannerDiv.textContent = category;

        //link
        const aDiv = document.createElement("a");
        aDiv.setAttribute("href", `detail/?adventure=${id}`);
        aDiv.id = id;

        // rows
        const rowDiv = document.querySelector("#data");

        const colDiv = document.createElement("div");
        colDiv.className =
          "col-6 col-sm-6 col-md-6 col-lg-3 mb-3 position-relative";

        const cardDiv = document.createElement("div");
        cardDiv.id = id;
        cardDiv.className = "activity-card";

        const imgDiv = document.createElement("img");
        imgDiv.src = image;

        const cardBody = document.createElement("div");
        cardBody.className = "activitycard__body w-100 p-3";
        const cardBodyDiv1 = document.createElement("div");
        cardBodyDiv1.className =
          "activityCard__body1 d-flex justify-content-between";
        cardBodyDiv1.innerHTML = `<h5>${name}</h5>
      <p>₹${costPerHead}</p>`;

        const cardBodyDiv2 = document.createElement("div");
        cardBodyDiv2.className =
          "activityCard__body2 d-flex justify-content-between";
        cardBodyDiv2.innerHTML = `<h5>Duration</h5>
      <p>${duration} Hours</p>`;

        cardBody.append(cardBodyDiv1);
        cardBody.append(cardBodyDiv2);

        cardDiv.append(imgDiv);
        cardDiv.append(cardBody);
        aDiv.append(cardDiv);
        colDiv.append(bannerDiv);
        colDiv.append(aDiv);
        rowDiv.append(colDiv);
      }
    );
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
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

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
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
