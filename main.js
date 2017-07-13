/*
Local Weather App
Written by Matthew Clarke
*/

function setTemp(newTemp) {
  document.getElementById('temperature').innerHTML = newTemp;
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
