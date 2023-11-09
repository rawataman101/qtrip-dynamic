import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
async function getAdventureIdFromURL(search) {
  // MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const id = urlParams.get("adventure");
  return id;
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const reponse = await fetch(
      `${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`
    );
    const detailData = await reponse.json();
    //console.log("adventures list -> ",adventures);
    return detailData;
  } catch (e) {
    console.log("Error in fetch detail adventures data");
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const { id, name, subtitle, images, content, available, reserved, cost } =
    adventure;
  document.getElementById("adventure-name").textContent = name;
  document.getElementById("adventure-subtitle").textContent = subtitle;
  const imgRow = document.getElementById("photo-gallery");
  for (let i = 0; i < images.length; i++) {
    const imgDiv = document.createElement("img");
    imgDiv.src = images[i];
    imgDiv.alt = `image${i + 1}`;
    imgDiv.id = `image-id-${i}`;
    imgDiv.className = "activity-card-image";
    imgRow.append(imgDiv);
  }
  document.getElementById("adventure-content").textContent = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //console.log(images)
  const carouselDiv = document.createElement("div");
  carouselDiv.id = "carouselExampleIndicators";
  carouselDiv.className = "carousel slide";
  carouselDiv.setAttribute("data-bs-ride", "carousel");

  const olDiv = document.createElement("div");
  const carouselInnerDiv = document.createElement("div");
  carouselInnerDiv.id = "carousel-inner";
  olDiv.className = "carousel-indicators";

  images.forEach((e, i, arr) => {
    olDiv.innerHTML += `
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class=${
      i === 0 ? "active" : ""
    }></li>
    `;
    carouselInnerDiv.innerHTML += `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
    <img class="d-block w-100 activity-card-image" src=${e} alt=image${i + 1}>
    </div>
    `;
  });
  // adding carousel button
  carouselDiv.append(olDiv);
  carouselDiv.append(carouselInnerDiv);
  // adding buttons
  // Previous button
  const prevButton = document.createElement("a");
  prevButton.className = "carousel-control-prev";
  prevButton.href = "#carouselExampleIndicators";
  prevButton.setAttribute("role", "button");
  prevButton.setAttribute("data-bs-slide", "prev");
  prevButton.innerHTML = `
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    `;
  carouselDiv.appendChild(prevButton);

  // Next button
  const nextButton = document.createElement("a");
  nextButton.className = "carousel-control-next";
  nextButton.href = "#carouselExampleIndicators";
  nextButton.setAttribute("role", "button");
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.innerHTML = `
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    `;
  carouselDiv.appendChild(nextButton);
  document.getElementById("photo-gallery").innerHTML = "";
  document.getElementById("photo-gallery").append(carouselDiv);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOutDiv = document.getElementById("reservation-panel-sold-out");
  const revFormDiv = document.getElementById("reservation-panel-available");

  //If the adventure is available
  if (adventure.available) {
    soldOutDiv.style.display = "none";
    revFormDiv.style.display = "block";
    document.getElementById("reservation-person-cost").textContent =
      adventure.costPerHead;
  } else {
    soldOutDiv.style.display = "block";
    revFormDiv.style.display = "none";
  }
}
//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = Number(
    persons * adventure.costPerHead
  );
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  let form = document.getElementById("myForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let url = config.backendEndpoint + "/reservations/new";
    let formElements = form.elements;
    console.log("formElements", formElements);

    let payload = {
      name: formElements["name"].value.trim(),
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        alert("Success!");
        window.location.reload();
      } else {
        alert("Failed!");
      }
    } catch (error) {
      console.log(error);
      alert("Failed!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
