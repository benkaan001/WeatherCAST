
// test out the response

// var cityname = "Austin";
// var response = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=049287381c116e50be8c10a4efd8f47c")
// .then(function(response){
//     console.log("inside", response);

// });
// console.log("outside");

var citynameInputEl = document.querySelector("#city-name");
var citySearchFormEl = document.querySelector("city-search-form");
var citySearchInputEl = document.querySelector("searched-city");

var presentForecastContainerEl = document.querySelector("#present-forecast-container");
var fiveDayForecastHeader = document.querySelector("#five-day-forecast");
var futureForecastContainerEl = document.querySelector("#future-forecast-container");
var searchHistoryButtonEl = document.querySelector("#search-history");



var cityList =[];


var formSubmitHandler = function(event){
    event.preventDefault();
    var cityname = citySearchInputEl.value.trim();
    if(cityname){
        citySearchInputEl.value ="";
        getWeather(cityname);

        // ***********LINK HERE FOR CITY SEARCH INPUTS

    }else{
        alert("PLEASE ENTER A VALID CITY NAME!")
    }
    saveSearch();
};



var saveSearch = function(){
    localStorage.setItem("cityList", JSON.stringify(cityList));
};



var getWeather = function(cityname){
    
    //  format the 5-day weather forecast API
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=049287381c116e50be8c10a4efd8f47c";

    // make a get request to the url

    fetch(apiURL)
    .then(function(response){
        
       // console.log(response);

       response.json().then(function(data){
           castWeather(data, cityname);
       });
    });
};

var getOneCall = function(lat,lon) {
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    
    //One-Call API may need to (optional) + &exclude={part} ----> part look up

    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" + lon+ "&exclude=current,hourly,minutely,alerts&appid=049287381c116e50be8c10a4efd8f47c";
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            getOneCall(data)

            
        })
    })
};



var weatherDisplay = function(weather, searchCity) {

//clear search history text content

presentForecastContainerEl.textContent= "";
citySearchInputEl.textContent = searchCity; 



//span to display the date

dateSpanEl = document.createElement("span");
dateSpanEl. textContent = moment(weather.dt.value).format("MMMM DD, YYYY");
citySearchInputEl.appendChild(dateSpanEl);



// span to hold temperature info

var temperatureSpanEl = document.createElement("span");
temperatureSpanEl.textContent = "TEMPERATURE: " + " °F ";
temperatureSpanEl.classList = "list-group-item";

// span to hold wind info

var windSpanEl = document.createElement("span");
windSpanEl.textContent = "WIND SPEED: " + "  MPH";
windSpanEl.classList = "list-group-item";

// span to hold humidity info

var humiditySpanEl = document.createElement("span");
humiditySpanEl.textContent = "HUMIDITY: " + " %";
humiditySpanEl.classList = "list-group-item";

// img icon

var weatherIcon = document.createElement("img");
weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png");

// append elements 
citySearchInputEl.appendChild(weatherIcon);
presentForecastContainerEl.appendChild(temperatureSpanEl);
presentForecastContainerEl.appendChild(windSpanEl);
presentForecastContainerEl.appendChild(humiditySpanEl);

var lat = weather.coord.lat;
var lon = weather.coord.lon;
getOneCall(lat,lon);


};

var displayFiveDayForecast = function(weahter){
    futureForecastContainerEl.textContent="";
    fiveDayForecastHeader.textContent = "5-DAY FORECAST";

    var forecast = weather.list;
    for (i=5; i<forecast.lenght; i+=8) {
        var dailyForecast = forecast[i];

        // div to hold forecast card

        var forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-primary text-light m-2";

        // date 

        var forecastDate = document.createElement("h5");
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYY");
        forecastDate.classList = "card-header text-center";
        
        // img

        var weatherIcon =document.createElement("img");
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png");


        // span for temp

        var forecastTempEl = document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        // span for humidity

        var forecastHumidityEl = document.createElement("span");
        forecastHumidityEl.classList = "card-body text-center";
        forecastHumidityEl.textContent = dailyForecast.main.humidity + " %";

        // append

        forecastEl.appendChild(forecastDate);
        forecastEl.appendChild(weatherIcon);
        forecastEl.appendChild(forecastTempEl);
        forecastEl.appendChild(forecastHumidityEl);

        futureForecastContainerEl.appendChild(forecastEl);


    }
};












// icon URL src http://openweathermap.org/img/wn/10d@2x.png


 //SAVE THIS TO THE END*******************************************

    // fetch(apiURL)
    // .then(function(response){
    //     //request was successful
    //     if (response.ok) {
    //         console.log(response);
    //         response.json().then(function(data) {
    //             console.log(data);
    //             displayCity(data,cityname);
    //         });
    //     } else {
    //         alert("Error: " + response.statusText);
    //     }
    // })
    // .catch(function(error) {
    //     alert("Unable to connect to Open Weather Map")
    // });




