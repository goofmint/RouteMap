var map_element = 'map-canvas';

var default_zoom = 14;
var uminoie_lat = 35.658182;
var uminoie_lon = 139.702043;
var station_marker = "東京駅";

var map;
var renderer = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

function getUmiNoIeLocation() {
	return new google.maps.LatLng(uminoie_lat, uminoie_lon);
}

function initialize() {
	var latitudeLongitude = getUmiNoIeLocation();
	var mapCanvas = document.getElementById(map_element);
	var mapOptions = {
		center: latitudeLongitude,
		zoom: default_zoom,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	map = new google.maps.Map(mapCanvas, mapOptions)
	renderer.setMap(map);

	var marker = new google.maps.Marker({
		position: latitudeLongitude,
		map: map,
		title: station_marker
	});
}

function displayRoute(opt, in_map) 
{
	var request = {
		origin:	     opt.start,
		destination: opt.end,
		travelMode:  opt.model || google.maps.TravelMode.WALKING
	};
	
	directionsService.route (
		request, 
		function(res, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			renderer.setDirections(res);
		}
	});
};

function calculateRoute(from, to) {
	displayRoute({
		start: from,
		end:   to
	},
	map);
}

function handleNoGeolocation() {
	applican.notification.alert("ルート表示にはGPS許可が必要です。", function(){}, "エラー", "OK");
}

function handleNoLocationDetermined() {
	applican.notification.alert("ルート表示にはGPS許可が必要です。", function(){}, "エラー", "OK");
}

var currentLatitude  = 0;
var currentLongitude = 0;
var locationDetermined = false;

function onDeviceReady() {
	var options = { maximumAge: 10000, timeout: 30000, enableHighAccuracy: false};
	applican.geolocation.getCurrentPosition(function(res) {
		currentLatitude = res.coords.latitude;
		currentLongitude = res.coords.longitude;
		locationDetermined = true;
	}, 
	function(error) { 
		handleNoGeolocation(); 
		console.log("GPS error: " + error.code + ", message: " + error.message);
	}, 
	options);
}

function routeFromHereTo(where) {
	if(locationDetermined) 
	{
		var initialLocation = new google.maps.LatLng(currentLatitude, currentLongitude);
		calculateRoute (initialLocation, where);
	}
	else 
	{
		handleNoLocationDetermined();
	}
}

google.maps.event.addDomListener(window, 'load', initialize);

var DEBUG_MODE = false

if(DEBUG_MODE) {
	$(function() {
		onDeviceReady();
	});
} else {
	document.addEventListener("deviceready", onDeviceReady, false);
}