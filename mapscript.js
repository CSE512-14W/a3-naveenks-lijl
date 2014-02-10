var map = L.map("map").setView([45, 10], 2);
var tile = L.tileLayer('http://{s}.tile.cloudmade.com/b9748534dbd5412f9d99064a8911db5e/1/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy;',
    maxZoom: 18
});
var currLayer = L.layerGroup();
var currIndex = 0;
var maxIndex = circles.length;
var r_factor = 90000;
var animate_events = new Array();
var MAGMIN = 0;
var DEPTHMIN = 0;
var curr_mag = MAGMIN;
var curr_depth = DEPTHMIN;
var curr_day = 0;
var curr_hour = 0;
var fps = 5;
var day_start = 0;
var hour_start = 0;
var day_end = 0;
var hour_end = 0;
var currIndex_start = 0;
var currIndex_end = 0;

tile.addTo(map);

map._initPathRoot()

var svg = d3.select("#map").select("svg");

function start_day(value) {
    day_start = value;
}

function start_hour(value) {
    hour_start = value;
}

function end_day(value) {
    day_end = value;
}

function end_hour(value) {
    hour_end = value;
}

function range_drawCircles() {
    var start = parseInt(day_start * 24) + parseInt(hour_start);
    var end = parseInt(day_end * 24) + parseInt(hour_end);

    currIndex_start = start - 1;
    currIndex_end = end - 1;
    
     drawCircles(currIndex_start, currIndex_end);
}

function drawCircles(start_index, end_index) {    
    if (start_index >= 0 && start_index < maxIndex && end_index >= 0 && end_index < maxIndex && end_index >= start_index) {
	currLayer.clearLayers();
	for (var i = start_index; i <= end_index; i++) {
	    for (var j = 0; j < circles[i].length; j++) {
		if (circles[i][j].mag >= curr_mag && circles[i][j].depth >= curr_depth) {
		    var circle = L.circle(circles[i][j].coordinates, circles[i][j].mag * r_factor, {
			color: 'none',
			fillColor: 'red',
			fillOpacity: 0.5
		    });
		    circle.bindPopup("Time: " +  circles[i][j].time + "<br> Coordinates: [" + circles[i][j].coordinates[0] + ", " + circles[i][j].coordinates[1] + "]" + "<br> Magnitude: " + circles[i][j].mag + "<br> Depth: " + circles[i][j].depth);
		    currLayer.addLayer(circle);
		}
	    }
	}
	currLayer.addTo(map);
    }
}

function update_bar(value) {
    document.getElementById("slider_bar").value = value;
}

function update_dayhour(value) {
    curr_day = Math.floor(value / 24);
    curr_hour = value % 24;
    document.getElementById("number_day").value = curr_day;
    document.getElementById("number_hour").value = curr_hour;
}

function drawCircles_auto() {
    currLayer.clearLayers();
    circles[currIndex].forEach(function(d) {
	d.LatLng = new L.LatLng(d.coordinates[0],d.coordinates[1])
    })

    var g = svg.append("g");

    g.selectAll("circle")
	.data(circles[currIndex])
	.enter().append("circle")
	.attr('fill','red')
    .attr('opacity',1)
	.attr("cx",function(d) { return map.latLngToLayerPoint(d.LatLng).x})
	.attr("cy",function(d) { return map.latLngToLayerPoint(d.LatLng).y})
	.attr("r",1)
	.transition().duration(function(d) { return Math.round(1000*d.mag);})
    .attr('r',function(d) { return d.mag/1*Math.pow(2,map.getZoom())})
    .attr('opacity', 0.1)
    .remove();
	
    update_bar(currIndex+1);
    update_dayhour(currIndex+1);
    currIndex = currIndex + 1;
    animate_events.pop();
}

function animate() {
    stop_animate();
    currIndex = 0;
    for (var i = 0; i < maxIndex; i++) {
	animate_events.push(setTimeout(function(){drawCircles_auto()}, (Math.floor(1000 / fps)) * i));
    }
}

function stop_animate() {
    while (animate_events.length > 0) {
	clearTimeout(animate_events.pop());
    }
}

function slider(value) {
    update_dayhour(value);
    if (value == 0) {
	map.removeLayer(currLayer);
    } else {
	currIndex_start = value - 1;
	currIndex_end = value - 1;
	drawCircles(currIndex_start, currIndex_end);
    }
}

function speed(value) {
    if (value == "slow") {
	fps = 1;
    } else if (value == "medium") {
	fps = 3;
    } else {
	fps = 5;
    }
}

function mag(value) {
    if (value == 0) {
	curr_mag = MAGMIN;
    } else {
	curr_mag = value;
    }

    drawCircles(currIndex_start, currIndex_end);
}

function depth(value) {
    if (value == 0) {
	curr_depth = DEPTHMIN;
    } else {
	curr_depth = value;
    }

    drawCircles(currIndex_start, currIndex_end);
}

function day_hour() {
    var time = parseInt(curr_day * 24) + parseInt(curr_hour);

    if (time > 0 && time <= maxIndex) {
	currIndex_start = time - 1;
	currIndex_end = time - 1;
	drawCircles(currIndex_start, currIndex_end);
	update_bar(time);
    } else {
	map.removeLayer(currLayer);
	update_bar(0);
    }
}    
function day(value) {
    curr_day = value;
    day_hour();
}

function hour(value) {
    curr_hour = value;
    day_hour();
}
