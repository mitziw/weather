$(document).ready(function() {
  getLocation();

  function getLocation() {
    $.get('http://ipinfo.io', function(location) {
      console.log(location);
      $('.location').append(location.city + ', ').append(location.region);
      getWeather(location.loc);
    }, 'jsonp');
  }

  function getWeather(loc) {
    lat = loc.split(',')[0];
    lon = loc.split(',')[1];
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&APPID=9752253151e1abe04f74417f8cfb14ce';
    console.log(weatherApiUrl);
    $.get(weatherApiUrl, function(weather) {
      var windDir = convertWindDirection(weather.wind.deg);
      var temperature = weather.main.temp;
      var unitLabelF = 'F';
      var unitLabelC = 'C';
      temperature = parseFloat(temperature.toFixed(1));
      var cTempVal = parseFloat((temperature - 32) * (5 / 9)).toFixed(1);
      console.log(weather);
      $('#icon').append('<img src=\'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png\'>');
      $('#temp').append(temperature + unitLabelF + '/' + cTempVal + unitLabelC);
      $('#conditions').append(weather.weather[0].description);
      $('#wind').append(windDir + ' ' + weather.wind.speed + ' knots');
      $('#postal').append(postal);
      //console.log(weather.weather[0].description);
      switch (weather.weather[0].description) {
        case "scattered clouds":
          $('body').addClass('clouds');
          break;
        case "broken clouds":
          $('body').addClass('clouds');
          break;
        case "clouds":
          $('body').addClass('cloudy');
          break;
        case "haze":
          $('body').addClass('haze');
          break;
        case "rain":
          $('body').removeClass('clear').addClass('rain');
          break;
        case "clear":
          $('body').removeClass('clear').addClass('clouds');
          break;
        case "thunderstorm":
          $('body').removeClass('clear').addClass('thunderstorm');
          break;
        default:
          $('body').removeClass('clear').addClass('clear');
      }
    }, 'jsonp');
  }

  function convertWindDirection(dir) {
    var rose = [
      'N',
      'NE',
      'E',
      'SE',
      'S',
      'SW',
      'W',
      'NW'
    ];
    var eightPoint = Math.floor(dir / 45);
    return rose[eightPoint];
  }

});