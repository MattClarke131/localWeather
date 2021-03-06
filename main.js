/*
Local Weather App
Written by Matthew Clarke
*/

// Default
var temperature = 0
var weatherInfo;
var currentScale;

window.onload = function() {
  testGeoSupport();
}

// Test browser for geolocation support
testGeoSupport = function() {
  if (navigator.geolocation) {
    console.log("Geolocation is supported for this browser");
    getGeoLocation();
  } else {
    console.log("Geolocation is not supported for this browser")
    document.getElementById("error").innerHTML =
      "Geolocation is not supported in this browser!";
    document.getElementById("happening").innerHTML =
      "Weather isn't happening apparently";
  };
};

// Geolocation
getGeoLocation = function() {
  var geoSuccess = function(position) {
    var latitude = position.coords.latitude;
    latitude = latitude.toString();
    var longitude = position.coords.longitude;
    longitude = longitude.toString();
    getWeatherInfo(latitude,longitude);
  };
  var geoError = function(error) {
    console.log("Geolocation error occured: " + error.code);
    document.getElementById("error").innerHTML = "Geolocation failed!";
    document.getElementById("happening").innerHTML =
      "Weather isn't happening apparently";
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

function getWeatherInfo(latitude,longitude) {
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
  temperature = Math.round(weatherInfo.main.temp).toString();
  setTemp(temperature);
  document.getElementById('weatherIcon').src = weatherInfo.weather[0].icon;
  document.getElementById('weatherDisplay').removeAttribute('hidden');
};

function setTemp(newTemp) {
  document.getElementById('temperature').innerHTML = newTemp;
};

function convertTemp(newScale) {
  if (newScale == "C") {
    var newTemp = temperature;
  }
  if (newScale == "F") {
    var newTemp = Math.round((9/5)*temperature+32);
  }
  return newTemp;
}

function changeScale() {
  currentScale = document.getElementById("scale").innerHTML;
  var newScale;
  if(currentScale == "C") {
    newScale = "F";
    var newTemp = convertTemp('F');
  } else if (currentScale == "F") {
    newScale = "C";
    var newTemp = convertTemp('C');
  };
  document.getElementById("scale").innerHTML = newScale;
  setTemp(newTemp);
}
