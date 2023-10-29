import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  console.log("1. from init() -> running @port = ", config.backendEndpoint);
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`);
    const cities = await response.json();
    console.log(cities);
    return cities;
  } catch (e) {
    // error in cities fetch
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // for col
  let rowDiv = document.querySelector("#data");

  let colDiv = document.createElement("div");
  let aDiv = document.createElement("a");
  aDiv.setAttribute("href", `adventures/?city=${id}`);

  colDiv.className = "col-xs-6 col-sm-6 col-md-6 col-lg-3";
  aDiv.id = id;

  let cardDiv = document.createElement("div");
  cardDiv.className = "tile";
  let img__cardDiv = document.createElement("img");
  img__cardDiv.src = image;
  img__cardDiv.alt = id;
  img__cardDiv.className = "tile-img";
  cardDiv.append(img__cardDiv);

  let cardBody = document.createElement("div");
  cardBody.className = "tile-text";
  let city__div = document.createElement("h3");
  city__div.innerText = city;
  let desc__div = document.createElement("h6");
  desc__div.innerText = description;

  cardBody.appendChild(city__div);
  cardBody.appendChild(desc__div);

  cardDiv.append(cardBody);
  colDiv.append(cardDiv);
  colDiv.append(aDiv);
  rowDiv.append(colDiv);
}

//addCityToDOM("london","london","london","london","london");
//adding london city
//addCityToDOM("london", "London", "149+ Places", "https://images.unsplash.com/photo-1535051188811-c841ac77c80b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80")

export { init, fetchCities, addCityToDOM };
