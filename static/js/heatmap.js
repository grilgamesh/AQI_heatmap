var myMap = L.map("map", {
  center: [52.4862, -1.8904],
  zoom: 7
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var url = "static/js/national_gp_dict.json";

d3.json(url).then(function(response) {


  var heatArray = [];
  var nationalAsthmaData = response.metadata;
  console.log(nationalAsthmaData);
  console.log(nationalAsthmaData.length);



  for (var i = 0; i < nationalAsthmaData.length; i++) {
    var location = nationalAsthmaData[i];
    console.log(location.asthma_percentage);
    console.log(location.lat);
    console.log(location.lon);

    if (location) {
      for(var j=0;j<((location.asthma_percentage)*(25)); j++){
        heatArray.push([location.lat, location.lon]);
        console.log([location.lat, location.lon] + ", "+ location.asthma_percentage + " times") ;
      }
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 50,
    blur: 35
  }).addTo(myMap);

});
