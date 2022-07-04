var myMap = L.map("map", {
  center: [54, -1],
  zoom: 7
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var url = "national_gp_dict.json";

d3.json(url).then(function(response) {

  console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i].metadata;
    console.log(location);

    if (location) {
      for(var i=0;i<response[i].metadata.asthma_percentage; i++){
        heatArray.push([location.lat, location.lon]);
        console.log(response[i].metadata.asthma_percentage);
      }
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 500,
    blur: 35
  }).addTo(myMap);

});
