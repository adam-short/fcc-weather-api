function create_temp(inital) {
  var temp = inital;
  var type = "C";

  return function () {
    if (type === "C") {
      temp = temp * 1.8 + 32;
      type = "F";
    } else if (type === "F") {
      temp = (temp - 32) / 1.8;
      type = "C";
    }
    return Math.round(temp) + " " + type;
  }
}

var temp = create_temp(0);
var $tempDisplay = $('#temp');
var $icon = $('#icon');
var $switchdeg = $("#switch");

$switchdeg.click(function () {
  $switchdeg.text(temp());
});

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = "lat="+position.coords.latitude;
    var lon = "lon="+position.coords.longitude;
    var url = "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon
    $.getJSON(url, function (data) {
      console.log("!");
      var weather = data['weather'][0];
      var main = data['main'];
      $icon.attr('src', weather['icon']);
      temp = create_temp(main['temp']);
      $switchdeg.text(temp());
    });
  });
});
