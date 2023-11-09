import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(`${config.backendEndpoint}/reservations`);
    const resJSON = await res.json();
    console.log(resJSON);
    return resJSON;
  } catch (error) {
    console.log("Error in fetch reservations");
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";

    for (let {
      name,
      date,
      person,
      adventure,
      adventureName,
      price,
      id,
      time,
    } of reservations) {
      let rowDiv = document.createElement("tr");
      //console.log(typeof(time))
      const dateObject = new Date(date);
      const currentDate = new Date(time);
      console.log(currentDate);
      const options = { day: "numeric", month: "numeric", year: "numeric" };

      const currDateOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedDate = dateObject.toLocaleDateString("en-IN", options);
      const fomattedCurrDate = currentDate.toLocaleDateString(
        "en-IN",
        currDateOptions
      );
      const formatCurrTime = currentDate.toLocaleTimeString(
        "en-IN",
        timeOptions
      );
      console.log(formatCurrTime);
      rowDiv.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${adventureName}</td>
        <td>${person}</td>
        <td>${formattedDate}</td>
        <td>${price}</td>
        <td>${fomattedCurrDate}, ${formatCurrTime}</td>
        <td id="${id}"><a href = "../detail/?adventure=${adventure}"><button type="Submit" class="reservation-visit-button">Visit Adventure</button></td>
        `;

      document.getElementById("reservation-table").append(rowDiv);
    }
  } else {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }
}

export { fetchReservations, addReservationToTable };
