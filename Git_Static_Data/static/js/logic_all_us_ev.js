// Function to create the Leaflet map
function createMap(evStations) {
    const streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    const baseMaps = { "Street Map": streetmap };
    const overlayMaps = { "EV Stations": evStations };
  
    const map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [streetmap, evStations]
    });
  
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
  }
  
  // Function to create markers for EV charging stations
  function createMarkers(evChargers) {
    const evMarkers = evChargers.map(charger => {
      const popupContent = `
      <h3>Station Name: ${charger["station name"]}</h3>
      <h3>State: ${charger.state}</h3>
      <h3>City: ${charger.city}</h3>
      <h3>ZipCode: ${charger.zipcode}</h3>
      <p>Latitude: ${charger.latitude}</p>
      <p>Longitude: ${charger.longitude}</p>
      `;
      return L.marker([charger.latitude, charger.longitude]).bindPopup(popupContent);
    });
  
    createMap(L.layerGroup(evMarkers));
  }
  
  // URL for GeoJSON data
  const url = "https://marinelloc.github.io/Proj_3/data/evchargingstations.json";
  
  // Fetch GeoJSON data and create markers when it completes
  d3.json(url).then(createMarkers);  