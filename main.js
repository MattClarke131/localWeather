/*
Local Weather App
Written by Matthew Clarke
*/

// Default
temperature = 0

// Test browser for geolocation support
if (navigator.geolocation) {
  console.log("Geolocation is supported for this browser");
} else {
  console.log("Geolocation is not supported for this browser")
};

// Variables
window.onload = function() {
  var geoSuccess = function(position) {
    var latitude = position.coords.latitude;
    latitude = latitude.toString();
    var longitude = position.coords.longitude;
    longitude = longitude.toString();
    makexhr(latitude,longitude);
  };
  var geoError = function(error) {
    console.log("Error occured: " + error.code);
  };
  var geoOptions = {
    timeout: 30 * 1000,
    enableHighAccuracy: false,
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}

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

function makexhr(latitude,longitude) {
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
  xhr.send();
}

function updateWeatherDisplay() {
  temperature = Math.round(weatherInfo.main.temp)
  document.getElementById('temperature').innerHTML = temperature.toString()
  document.getElementById('weatherIcon').src = weatherInfo.weather[0].icon
};

function setTemp(newTemp) {
  document.getElementById('temperature').innerHTML = newTemp;
};

function convertTemp(newScale) {
  if (newScale == "celsius") {
    var newTemp = temperature;
  }
  if (newScale == "farenheit") {
    var newTemp = Math.round((9/5)*temperature+32);
  }
  return newTemp;
}

function changeScale() {
  currentScale = document.getElementById("scale").innerHTML;
  if(currentScale == "C") {
    var newScale = "F";
    var newTemp = convertTemp('farenheit');
  } else if (currentScale == "F") {
    newScale = "C";
    var newTemp = convertTemp('celsius');
  };
  document.getElementById("scale").innerHTML = newScale;
  document.getElementById("temperature").innerHTML = newTemp;
}
