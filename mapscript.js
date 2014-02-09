var map = L.map("map").setView([45, 10], 2);
var tile = L.tileLayer('http://{s}.tile.cloudmade.com/b9748534dbd5412f9d99064a8911db5e/1/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy;',
    maxZoom: 18
});
var currLayer = L.layerGroup();
var currIndex = 0;
var maxIndex = 8;
var r_factor = 80000;
var animate_events = new Array();
var MAGMAX = 10;
var DEPTHMAX = 200;
var curr_mag = MAGMAX;
var curr_depth = DEPTHMAX;

tile.addTo(map);

function drawCircles(index) {
    currLayer.clearLayers();
    for (var i = 0; i < circles[index].length; i++) {
	if (circles[index][i].mag <= curr_mag && circles[index][i].depth <= curr_depth) {
	    var circle = L.circle(circles[index][i].coordinated, circles[index][i].mag * r_factor, {
		color: 'red',
		fillColor: '#f05',
		fillOpacity: 0.5
	    });
	    currLayer.addLayer(circle);
	}
    }
    currLayer.addTo(map);
}

function drawCircles_auto() {
    drawCircles(currIndex);
    document.getElementById("slider_bar").value = currIndex + 1;
    document.getElementById("time").innerHTML = currIndex + 1;
    currIndex = currIndex + 1;
}

function animate() {
    stop_animate();
    currIndex = 0;
    for (var i = 0; i < maxIndex; i++) {
	animate_events.push(setTimeout(function(){drawCircles_auto()}, 1000 * i));
    }
}

function stop_animate() {
    while (animate_events.length > 0) {
	clearTimeout(animate_events.pop());
    }
}

function slider(value) {
    document.getElementById("time").innerHTML=value;
    if (value == 0) {
	map.removeLayer(currLayer);
    } else {
	drawCircles(value-1);
    }
}

function mag(value) {
    if (value == 0) {
	curr_mag = MAGMAX;
    } else {
	curr_mag = value;
    }
}

function depth(value) {
    if (value == 0) {
	curr_depth = DEPTHMAX;
    } else {
	curr_depth = value;
    }
}
