var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
var myMap = L.map("map", {
		center: [37.09, -95.71],
		zoom: 5
		
	});	
streetmap.addTo(myMap);

  
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

d3.json(url, function(data) {
	
  
	function styleInfo(feature){
	return {
		opacity:1,
		fillOpacity:1,
		color:"#000000",
		stroke: true,
		weight: 0.5,
		fillColor: markercolor(feature.properties.mag),
		radius: markerSize (feature.properties.mag)
		};
	}
  
  

	function markercolor(magnitude){
	switch(true){
		case magnitude > 5:
			return "#72120E";
		case magnitude > 4:
			return"#AB1D18" ;
		case magnitude > 3:
			return "#EF2B24";
			
		case magnitude > 2:
			return"#F76863";
		case magnitude > 1:
			return"#FBACA9";
			
		default:
			return "#FDDAD8 ";	
		}			
	}
  
	function markerSize(magnitude) {
		if (magnitude === 0){ 
		return 1;
		}
		return magnitude * 4;
		
	}

	

	
	L.geoJson(data, {
		
	  pointToLayer : function(feature, latlng){
		  return L.circleMarker(latlng);
		  
	  },
	  
	style: styleInfo,

 
   onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag +
      "<br>Location: " + feature.properties.place); 
	  
	  
	}

}).addTo(myMap);
 
	var legend = L.control({
	position : "bottomright"
}); 

	legend.onAdd = function(){
	;
	// html to display legend
	
	var div = L.DomUtil.create("div", "info legend");
	
	var grade = [0,1,2,3,4,5];
	var color = ["#FDDAD8 ","#FBACA9","#F76863","#EF2B24","#AB1D18","#72120E"];
	
	
	for (var i = 0;i < grade.length;i++){
		div.innerHTML +=
		"<i style='background: " + color[i] + "'></i>"+ 
		grade[i] + (grade[i+1] ? "&ndash;" + grade[i+1] + "<br>": "+");
	}
	return div;	
	
};
legend.addTo(myMap);

});





