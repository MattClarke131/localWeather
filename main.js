/*
Local Weather App
Written by Matthew Clarke
*/

// Test browser for geolocation support
if (navigator.geolocation) {
  console.log("Geolocation is supported for this browser");
} else {
  console.log("Geolocation is not supported for this browser")
};

// Variables
var latitude;
var longitude;
var weatherInfo;

window.onload = function() {
  var geoSuccess = function(position) {
    latitude = position.coords.latitude;
    latitude = latitude.toString();
    longitude = position.coords.longitude;
    longitude = longitude.toString();
  };
  var geoError = function(error) {
    console.log("Error occured: " + error.code);
  };
  var geoOptions = {
    timeout: 30 * 1000,
    enableHighAccuracy: false,
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  xhr.send();
}

function setTemp(newTemp) {
  document.getElementById('temperature').innerHTML = newTemp;
};

// Cross-Origin Resource Sharing
// https://www.html5rocks.com/en/tutorials/cors/
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if("withCredentials" in xhr) {
    // Check if XMLHttpRequest object has "withCredentials" property.
    // Chrome, Firefox, Opera, and Safari use XMLHttpRequest
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // IE uses XDomainRequest
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS is not supported by the browser
    xhr = null;
  }
  return xhr;
}

var xhr = createCORSRequest('GET', 'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude);
if (!xhr) {
  throw new Error('CORS not supported');
}
xhr.onload = function() {
  var responseText = xhr.responseText;
  weatherInfo = JSON.parse(responseText);
  updateWeatherDisplay();
};
xhr.onerror = function() {
  console.log("Error in CORS Request!");
};

function updateWeatherDisplay() {
  document.getElementById('temperature').innerHTML = weatherInfo.main.temp
};



function convertTemp(oldTemp, newScale) {
  if (newScale == "celsius") {
    var newTemp = (5/9)*(oldTemp-32);
  }
  if (newScale == "farenheit") {
    var newTemp = (9/5)*oldTemp+32;
  }
  return newTemp;
}

function changeScale() {
  currentScale = document.getElementById("scale").innerHTML;
  oldTemp = document.getElementById("temperature").innerHTML;
  if(currentScale == "C") {
    var newScale = "F";
    var newTemp = convertTemp(oldTemp, 'farenheit');
  } else if (currentScale == "F") {
    newScale = "C";
    var newTemp = convertTemp(oldTemp, 'celsius');
  };
  document.getElementById("scale").innerHTML = newScale;
  document.getElementById("temperature").innerHTML = newTemp;
}
