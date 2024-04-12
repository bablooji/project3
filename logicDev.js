// Define global variables to store latitude and longitude
let clickedLat = -74.05166858972046;
let clickedLon = 40.74988975154915;
const url_red = `http://localhost:3000/red?lat=${clickedLat}&lon=${clickedLon}`;
const url_yellow = `http://localhost:3000/yellow?lat=${clickedLat}&lon=${clickedLon}`;
const url_green = `http://localhost:3000/green?lat=${clickedLat}&lon=${clickedLon}`;

let URLs = [url_green, url_yellow, url_red]

function createMap(evStations) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the evStations layer.
  let overlayMaps = {
    "EV Stations": evStations
  };

  // Create the map object with options.
  let map = L.map("map-id", {
    center: [40.74988975154915, -74.05166858972046],
    zoom: 10,
    layers: [streetmap, evStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  // Add event listener to the map for click events
  map.on('click', function (event) {
    clickedLat = event.latlng.lat;
    clickedLon = event.latlng.lng;
    console.log("Latitude: " + clickedLat + ", Longitude: " + clickedLon);
    // You can perform further actions with the latitude and longitude here
  });


    // Create a dropdown menu in the top-left corner of the map
    // let dropdown = L.control({position: 'topleft'});

    // dropdown.onAdd = function (map) {
    //     let div = L.DomUtil.create('div', 'dropdown');
    //     div.innerHTML = `
    //         <select id="color-dropdown">
    //             <option value="green">Green</option>
    //             <option value="yellow">Yellow</option>
    //             <option value="red">Red</option>
    //         </select>
    //     `;
    //     return div;
    // };

    // dropdown.addTo(map);

    // Add event listener to the map for click events
    map.on('click', function (event) {
        clickedLat = event.latlng.lat;
        clickedLon = event.latlng.lng;
        console.log("Latitude: " + clickedLat + ", Longitude: " + clickedLon);
        // You can perform further actions with the latitude and longitude here
        createMarkers(getResponse(url_green)); // Pass the JSON data to createMarkers function
    });

    
}

function createMarkers(evChargers) {
  // Pull the "stations" property from response.data.
  // let evChargers = response;

  // Initialize an array to hold bike markers.
  let evMarkers = [];

  console.log(evChargers)
  // Loop through the stations array.
  for (let index = 0; index < evChargers.length; index++) {
    let charger = evChargers[index];

    // For each station, create a marker, and bind a popup with the station's name.
    let evMarker = L.marker([charger.latitude, charger.longitude])
      .bindPopup("<h3>" + charger.state + "<h3><h3>facility type:" + charger.city + "</h3>");

    // Add the marker to the evMarkers array.
    evMarkers.push(evMarker);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(evMarkers));
}


function getResponse(url){
console.log(url);  
d3.json(url)
  .then(response => {
  console.log(response); // Log the JSON data

  createMarkers(response);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}
getResponse(url_green)




// // Function to handle fetching data based on the selected dropdown option
// function fetchDataAndUpdateMap(selectedUrl) {
//   d3.json(selectedUrl)
//     .then(response => {
//       console.log(response); // Log the JSON data
//       createMarkers(response); // Pass the JSON data to createMarkers function
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }



// // Event listener for dropdown change event
// document.getElementById('color-dropdown').addEventListener('change', function() {
//   const selectedColor = this.value;
//   // Update URL based on selected color
//   switch (selectedColor) {
//     case 'red':
//       currentUrl = url_red;
//       break;
//     case 'yellow':
//       currentUrl = url_yellow;
//       break;
//     case 'green':
//       currentUrl = url_green;
//       break;
//     default:
//       currentUrl = url_green; // Default to red if invalid option
//   }
//   // Fetch data based on updated URL
//   fetchDataAndUpdateMap(currentUrl);
// });

// // Initial fetch with default URL
// fetchDataAndUpdateMap(currentUrl);


// const url_green = 'http://localhost:3000/green'

