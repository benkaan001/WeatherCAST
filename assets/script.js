

var getCity = function(cityname){
    //  format the 5-day weather forecast API
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + {cityname} + "&appid={049287381c116e50be8c10a4efd8f47c}";

    // make a get request to the url

    fetch(apiURL)
    .then(function(response){
        //request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayCity(data,cityname);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather Map")
    });

};

