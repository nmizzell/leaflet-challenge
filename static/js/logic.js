
function createMap(eq_layer) {

    //create the background layer of the map
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

  

  
    //create the map object
    let map = L.map("map", {
      center: [0,0],
      zoom: 1,
      layers: [streetmap, eq_layer]
    });
  

  }
  
  function createMarkers(response) {
  
    //check that the data is pulling properly
    console.log(response.features)

    let earthquakes = response.features;
  
    //will hold earthquake marker objects
    let earthquake_markers = [];
  
    for (let i = 0; i < earthquakes.length; i++) {
      let earthquake = earthquakes[i];
  
      //create a marker for each earthquake as a circle
      let eqmarker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]],{
        color: earthquake.geometry.coordinates[2] // depth level
        ,fillColor: '#f03'
        ,fillOpacity: 0.5
        ,radius: earthquake.properties.mag * 100000
      })
      //setup popup info
        .bindPopup("<h3>" + earthquake.properties.place + "<h3><h3>Magnitude: " + earthquake.properties.mag + "<h3><h3>Depth: "+ earthquake.geometry.coordinates[2]);
  
      //add each marker to the markers list
      earthquake_markers.push(eqmarker);
    }
  
    createMap(L.layerGroup(earthquake_markers));
  }
  
//fetch eq data from geojson api using d3
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(createMarkers);
  