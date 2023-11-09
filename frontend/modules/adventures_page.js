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
    //console.log("adventures list -> ",adventures);
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
  // MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log("filter by duration list - > ",list);
  let filteredList = list.filter((obj) => {
    return obj.duration >= low && obj.duration <= high;
  });
  //console.log("filter by duration filtered list - > ",filteredList)
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter((obj) => {
    return categoryList.includes(obj.category);
  });
  //console.log("filter by category filtered list - > ",filteredList)
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  /*filters input - (input, {
  duration: "12-20",
  category: ["Beaches", "Cycling"],}
*/
  // console.log(list)
  // console.log(filters)
  const durationFilter = filters.duration;
  const categoryFilter = filters.category;
  //console.log(durationFilter, categoryFilter)
  const low =
    durationFilter.split("-").length > 0 ? durationFilter.split("-")[0] : null;
  const high =
    durationFilter.split("-").length > 0 ? durationFilter.split("-")[1] : null;

  let filteredList = list;
  if (durationFilter.length > 0 && categoryFilter.length === 0) {
    filteredList = filterByDuration(filteredList, low, high);
    console.log(filteredList);
    return filteredList;
  } else if (durationFilter.length === 0 && categoryFilter.length > 0) {
    filteredList = filterByCategory(filteredList, categoryFilter);
    return filteredList;
  } else if (durationFilter.length > 0 && categoryFilter.length > 0) {
    filteredList = filterByDuration(filteredList, low, high);
    filteredList = filterByCategory(filteredList, categoryFilter);
    return filteredList;
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // const obj = {
  //   category: filters.category,
  //   duration: filters.duration
  // }

  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const obj = localStorage.getItem("filters");
  const data = JSON.parse(obj);
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  for (let i of filters.category) {
    const pillDiv = document.createElement("div");
    pillDiv.className = "category-filter";
    pillDiv.id = "category-list";
    pillDiv.textContent = i;
    document.getElementById("category-list").append(pillDiv);
  }
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
