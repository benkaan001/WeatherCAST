
// test out the response

// var cityname = "Austin";
// var response = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=049287381c116e50be8c10a4efd8f47c")
// .then(function(response){
//     console.log("inside", response);

// });
// console.log("outside");




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
    
    //One-Call API may need to (optional) + &exclude={part} ----> part look up

    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" + lon+ "&appid=049287381c116e50be8c10a4efd8f47c";
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            getOneCall(data)
        })
    })
};












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




