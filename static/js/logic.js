let map; // Define a global variable to hold the map instance

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

function createMap(evStations) {

    // Check if the map is already initialized
    if (!map) {
        // Create the tile layer that will be the background of our map.
        const streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        // Create the map object with options.
        map = L.map("map-id", {
            center: [40.74988975154915, -74.05166858972046],
            zoom: 10,
            layers: [streetmap, evStations]
        });

        // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
        L.control.layers({"Street Map": streetmap}, {"EV Stations": evStations}, {collapsed: false}).addTo(map);
    } else {
        // If the map is already initialized, add the new EV stations to the existing map
        evStations.addTo(map);
    }

    // Add event listener to the map for click events
    map.on('click', function (event) {
      clickedLat = event.latlng.lat;
      clickedLon = event.latlng.lng;
      console.log("Latitude: " + clickedLat + ", Longitude: " + clickedLon);
      // Update the URLs with the new coordinates
      urls.green = `${baseURL}/green?lat=${clickedLat}&lon=${clickedLon}`;
      urls.yellow = `${baseURL}/yellow?lat=${clickedLat}&lon=${clickedLon}`;
      urls.red = `${baseURL}/red?lat=${clickedLat}&lon=${clickedLon}`;
      // Fetch data for green EV stations
      if (evStations) {
        map.removeLayer(evStations);
    }
      getResponse(urls.green);
    });



}

function createMarkers(evChargers) {
    // Initialize an array to hold EV markers.
    const evMarkers = evChargers.map(charger => {
        // Create a marker for each charger, and bind a popup with the station's information.
        return L.marker([charger.latitude, charger.longitude])
            .bindPopup(`<h3>${charger.state}</h3><h3>Facility type: ${charger.city}</h3>`);
    });

    // Create a layer group from the EV markers array
    const evStations = L.layerGroup(evMarkers);

    // Call createMap function to display the EV stations on the map
    createMap(evStations);
}

function getResponse(url) {
    console.log(url);
    // Fetch JSON data from the provided URL
    d3.json(url)
        .then(response => {
            console.log(response); // Log the JSON data
            // Create markers for the fetched EV chargers
            createMarkers(response);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Initially fetch data for green EV stations
getResponse(urls.green);