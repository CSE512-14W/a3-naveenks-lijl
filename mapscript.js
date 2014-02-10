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

function update_bar(value) {
    document.getElementById("slider_bar").value = value;
    document.getElementById("number_hour").value = value;
}

function drawCircles_auto() {
    drawCircles(currIndex);
    update_bar(currIndex+1);
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
    if (value == 0) {
	map.removeLayer(currLayer);
    } else {
	currIndex = value - 1;
	drawCircles(currIndex);
    }
    document.getElementById("number_hour").value = value;
}

function mag(value) {
    if (value == 0) {
	curr_mag = MAGMAX;
    } else {
	curr_mag = value;
    }

    drawCircles(currIndex);
}

function depth(value) {
    if (value == 0) {
	curr_depth = DEPTHMAX;
    } else {
	curr_depth = value;
    }

    drawCircles(currIndex);
}

function hour(value) {
    if (value > 0 && value <= maxIndex) {
	currIndex = value - 1;
	drawCircles(currIndex);
	document.getElementById("slider_bar").value = value;
    } else {
	map.removeLayer(currLayer);
	document.getElementById("slider_bar").value = 0;
    }
}