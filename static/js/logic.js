// Define global variables to store latitude and longitude
let clickedLat = 0;
let clickedLon = 0;

// Define URLs for different types of EV stations
const baseURL = "http://localhost:3000";
const urlParams = `?lat=${clickedLat}&lon=${clickedLon}`;
const urls = {
  green: `${baseURL}/green${urlParams}`,
  yellow: `${baseURL}/yellow${urlParams}`,
  red: `${baseURL}/red${urlParams}`
};

// Initialize map on page load (in other app types (i.e. Plotly belly button)
// there might be an actual `init()` function, but it's unnecessary in this case)

// Create the map object with options.
let map = L.map("map-id", {
  center: [41.31907562295139, -75.58593750000001],
  zoom: 7
});
let layerGroup;
let layerControl;

// Create the tile layer that will be the background of our map,
// and immediately add it to the map
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Instantiate an empty layer control with the desired options and add it to the map.
layerControl = L.control.layers([], [], { collapsed: false }).addTo(map);

// Dynamically add a base layer (no need for the baseMaps object)
layerControl.addBaseLayer(streetmap, "Street Map").addTo(map);

// Fetch the initial data and use the promise to call createMarkers
getResponse(urls.green);

function createMarkers(evChargers) {

  // Initialize an array to hold markers.
  // This var is only used inside this function scope.
  let evMarkers = [];

  // Loop through the stations array.
  for (let index = 0; index < evChargers.length; index++) {
    let charger = evChargers[index];

    // For each station, create a marker, and bind a popup with the station's name.
    let evMarker = L.marker([charger.latitude, charger.longitude])
      .bindPopup(`
      <h3>Station Name: ${charger["station name"]}</h3>
      <h3>Address: ${charger["street address"]}</h3>
      <h3>City: ${charger.city}</h3>
      <h3>State: ${charger.state}</h3>
      <h3>Zip Code: ${charger.zipcode}</h3>
      <p>Latitude: ${charger.latitude}</p>
      <p>Longitude: ${charger.longitude}</p>
      `);
    // Add the marker to the evMarkers array.
    evMarkers.push(evMarker);
  }

  // If layerGroup was previously populated, remove it from the map.
  if (typeof (layerGroup) != "undefined") {
    layerControl.removeLayer(layerGroup);
    map.removeLayer(layerGroup);
  }

  // Populate the layer group and add it as a user-toggleable overlay layer
  layerGroup = L.layerGroup(evMarkers).addTo(map);

  // Dynamically add an overlay layer now that we have the station data
  layerControl.addOverlay(layerGroup, "EV Stations").addTo(map);
}

function getResponse(url) {
  d3.json(url)
    .then(response => {
      // console.log(response);
      createMarkers(response);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Add event listener to the map for click events
map.on('click', function (event) {
  clickedLat = event.latlng.lat;
  clickedLon = event.latlng.lng;

  // Update the URLs with the new coordinates
  urls.green = `${baseURL}/green?lat=${clickedLat}&lon=${clickedLon}`;
  urls.yellow = `${baseURL}/yellow?lat=${clickedLat}&lon=${clickedLon}`;
  urls.red = `${baseURL}/red?lat=${clickedLat}&lon=${clickedLon}`;

  // how do i know which color url to call?
  getResponse(urls.green);
});