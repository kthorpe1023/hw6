$(document).ready(function(){
// eventlistener for search button
    $("a").on("click", searchCity)
    // empty array to store searched cities
    var pastCities = []
    // get items from localstorage and redefine pastCities array
    var getItem = localStorage.getItem("Past Cities")
    if (getItem !== null){
        pastCities = JSON.parse(getItem)
    }
    var getItems = JSON.parse(getItem)
    // generate buttons using cities in local storage
    for(var i = 0; i <getItems.length; i++){
        var pastBtn = $("<button>").text(pastCities[i]);
        var pastbr = $("<br>");
        $("#display-past").prepend(pastBtn, pastbr);
    }


// function to search city
    function searchCity(){
        // variable for city input value
        var city = $("input").val();
        // This is our API key. Add your own API key between the ""
        var APIKey = "115202e2247bd2aae5e7bd324023eefd";
    
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        // ca;; the api to get information
        $.ajax({
            url: queryURL,
            mathod: "GET"
        }).then(function(response){

            console.log(response);
            // use empty to clear out current display and 5 day display

            $("#display-current").empty();
            $("#display-5-day").empty();
            // create new div, header, desciprtion, temp in fahrenheit, humidity, and wind for current city
            var newDiv = $("<div>")
            var cityDate = $("<h5>").text(response.city.name + "--" + moment().format('MMMM Do YYYY'));
            var description = $("<p>").text("Forecast: " + response.list[0].weather[0].description);
            var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
            // var tempF1 = $("<span>").text();
            var temp = $("<p>").attr("id", "t").text("Temperature: " + tempF.toFixed(2) + "F");

            var humidity = $("<p>").text("Humidity: " + response.list[0].main.humidity);
            var wind = $("<p>").text("Wind Speed: " + response.list[0].wind.speed);
            // create button and push to array pastCities if not included already
            if(!pastCities.includes(response.city.name)){
            var newBtn = $("<button>").text(response.city.name);
            var br = $("<br>");
            pastCities.push(response.city.name)
            // stringify array to send to local storage
            var strPastCities = JSON.stringify(pastCities);
            localStorage.setItem("Past Cities", strPastCities)
            // add new button of new city name
            $("#display-past").prepend(newBtn, br);
            // $("button").on("click", function(){
            //     city = $(this).val()
            //     searchCity()
            // })

            }
           
            // append display for current day to new div and append new div to display current id
            newDiv.append(cityDate, description, temp, humidity, wind);
            $("#display-current").append(newDiv);
            // change background color of temp based on temp value
            if(tempF <= 45){
                $("#t").addClass("cold")
            } else if(tempF >= 45.01 && tempF <= 70){
                $("#t").addClass("moderate")
            } else if (tempF >= 70.01 && tempF <=90){
                $("#t").addClass("hot")
            } else if(tempF >= 90.01){
                $("#t").addClass("superhot")
            }

            // set var days to 0 for date display of next four days in for loop
            var days = 0
            var heading = $("<h5>").text("5 Day Forcast:")
            $("#display-5-day").append(heading)

            // for loop to get weather icon, description, tempF, and humidity for next 4 days
            for (var i = 8; i < 40; i = i + 8){
                var newDate = $("<div>").addClass("col s2.75 fiveDay");
                var nextDay = $("<h6>").text(moment().add(days = days + 1, 'days').format('MMMM Do YYYY'));
                var iconCode = response.list[i].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                var icon = $("<img>").attr("src", iconurl);
                var description5 = $("<p>").text("Forecast: " + response.list[i].weather[0].description)
                var tempFa = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                var temp5 = $("<p>").text("Temperature: " + tempFa.toFixed(2) + "F");
                var humidity5 = $("<p>").text("Humidity: " + response.list[i].main.humidity)
                // append to newDate div and append newDate to display-5-day id
                newDate.append(nextDay, icon, description5, temp5, humidity5);
                $("#display-5-day").append(newDate)
            }

        })

    }








})