var cityInputEl = document.querySelector("#city");
var citySearchFormEl = document.querySelector("#city-search-form");
var citySearchInputEl = document.querySelector("#searched-city");

var presentForecastContainerEl = document.querySelector(
  "#present-forecast-container"
);
var fiveDayForecastHeader = document.querySelector("#forecast-header");
var futureForecastContainerEl = document.querySelector(
  "#future-forecast-container"
);
var searchHistoryButtonEl = document.querySelector("#search-history");

var cityList = [];

$("#city-search-form").on("submit", function(event){
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getWeather(city);
    getFiveDayForecast(city);
    cityInputEl.value = "";
  } else {
    alert("Invalid City Name!")
}

  saveCitySearch();
  searchHistory(city);
});

var saveCitySearch = function (city) {
  cityList.push(city);
  for (i = 0; i < cityList.length; i++) {
    localStorage.setItem("city", cityList[0]);
  }
};

var getWeather = function (city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=049287381c116e50be8c10a4efd8f47c";

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      weatherDisplay(data, city);
    });
  });
};

var getOneCall = function (lat, lon) {
  //One-Call API may need to (optional) + &exclude={part} ----> part look up

  var apiURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=current,hourly,minutely,alerts&appid=049287381c116e50be8c10a4efd8f47c";
  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {});
  });
};

var getFiveDayForecast = function (city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=049287381c116e50be8c10a4efd8f47c";

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayFiveDayForecast(data);
    });
  });
};

var weatherDisplay = function (weather, searchCity) {
  //clear search history text content
  presentForecastContainerEl.textContent = "";
  citySearchInputEl.textContent = searchCity;

  //span to display the date

  var currentDate = document.createElement("span");
  currentDate.textContent =
    " " + moment(weather.dt.value).format("MMM D, YYYY");
  citySearchInputEl.appendChild(currentDate);

  //span to hold temperature info
  var temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
  temperatureEl.classList = "list-group-item";
  presentForecastContainerEl.appendChild(temperatureEl);

  //span to hold wind info
  var windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " mph";
  windSpeedEl.classList = "list-group-item";
  presentForecastContainerEl.appendChild(windSpeedEl);

  //span to hold humidity info
  var humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
  humidityEl.classList = "list-group-item";
  presentForecastContainerEl.appendChild(humidityEl);

  //img icon

  // icon URL src http://openweathermap.org/img/wn/10d@2x.png

  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
  );
  citySearchInputEl.appendChild(weatherIcon);

  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  getOneCall(lat, lon);
};

var displayFiveDayForecast = function (weather) {
  futureForecastContainerEl.textContent = "";
  fiveDayForecastHeader.textContent = "5️-DAY FORECAST";

  var forecast = weather.list;
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    // div to hold forecast card

    var forecastEl = document.createElement("div");
    forecastEl.classList = "card bg-primary text-light m-2";

    // date

    var forecastDate = document.createElement("h5");
    forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM Do");
    forecastDate.classList = "card-header text-center";
    forecastEl.appendChild(forecastDate);

    // img
    var weatherIcon = document.createElement("img");
    weatherIcon.classList = "card-body text-center";
    weatherIcon.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" +
        dailyForecast.weather[0].icon +
        "@2x.png"
    );
    forecastEl.appendChild(weatherIcon);

    //span for temp
    var forecastTempratureEl = document.createElement("span");
    forecastTempratureEl.classList = "card-body text-center";
    forecastTempratureEl.textContent = dailyForecast.main.temp + " °F";
    forecastEl.appendChild(forecastTempratureEl);

    // span for feels like temperature

    var forecastFeelsLikeEl = document.createElement("span");
    forecastFeelsLikeEl.classList = " card-body text-center";
    forecastFeelsLikeEl.textContent= "Feels " + dailyForecast.main.feels_like + " °F";
    forecastEl.appendChild(forecastFeelsLikeEl);
    

    // span for humidity
    var forecastHumidityEl = document.createElement("span");
    forecastHumidityEl.classList = "card-body text-center";
    forecastHumidityEl.textContent = dailyForecast.main.humidity + "  %";
    forecastEl.appendChild(forecastHumidityEl);

    // span for windspeed 

    var forecastWindSpeedEl = document.createElement("span");
    forecastWindSpeedEl.classList = " card-body text-center";
    forecastWindSpeedEl.textContent= dailyForecast.wind.speed + " mph";
    forecastEl.appendChild(forecastWindSpeedEl);

    


    // append
    futureForecastContainerEl.appendChild(forecastEl);
  }
};

var searchHistory = function (searchHistory) {
  searchHistoryEl = document.createElement("button");
  searchHistoryEl.textContent = searchHistory;
  searchHistoryEl.classList = "d-flex w-100 btn-light border p-2";
  searchHistoryEl.setAttribute("data-city", searchHistory);
  searchHistoryEl.setAttribute("type", "submit");

  searchHistoryButtonEl.prepend(searchHistoryEl);
};

var searchHistoryEventHandler = function (event) {
  var city = event.target.getAttribute("data-city");
  if (city) {
    getWeather(city);
    getFiveDayForecast(city);
  }
};


// incorporating jQuery 
$("#search-history").on("click", function(event){
  saveCitySearch();
  searchHistory(city);
});
