// Define global variables to store latitude and longitude
let clickedLat;
let clickedLon;

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
    center: [40.73, -74.0059],
    zoom: 12,
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
  let dropdown = L.control({position: 'topleft'});

  dropdown.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'dropdown');
    div.innerHTML = `
      <select id="color-dropdown">
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="red">Red</option>
      </select>
    `;
    return div;
  };

  dropdown.addTo(map);
}

function createMarkers(response) {
  // Pull the "stations" property from response.data.
  let evChargers = response;

  // Initialize an array to hold bike markers.
  let evMarkers = [];

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

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// Load the GeoJSON data.
// comment for alan

url = "https://marinelloc.github.io/Proj_3/data/tristate_northeast.json";
d3.json(url).then(createMarkers);