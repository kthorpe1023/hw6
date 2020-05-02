$(document).ready(function(){

    $("a").on("click", searchCity)

    function searchCity(){
        var city = $("input").val();
      // This is our API key. Add your own API key between the ""
      var APIKey = "115202e2247bd2aae5e7bd324023eefd";
  
      // Here we are building the URL we need to query the database
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            mathod: "GET"
        }).then(function(response){
            var newBtn = $("<button>").text(city);
            var br = $("<br>");
            $("#display-past").prepend(newBtn, br);
            console.log(response);
            $("#display-current").empty();
            $("#display-5-day").empty();
            var newDiv = $("<div>")
            var cityDate = $("<h5>").text(response.city.name + "--" + moment().format('MMMM Do YYYY'));
            var description = $("<p>").text("Forecast: " + response.list[0].weather[0].description);
            var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
            // var tempF1 = $("<span>").text();
            var temp = $("<p>").attr("id", "t").text("Temperature: " + tempF.toFixed(2) + "F");

            var humidity = $("<p>").text("Humidity: " + response.list[0].main.humidity);
            var wind = $("<p>").text("Wind Speed: " + response.list[0].wind.speed);

            newDiv.append(cityDate, description, temp, humidity, wind);
            $("#display-current").append(newDiv);
            if(tempF <= 40){
                $("#t").addClass("cold")
            } else if(tempF >= 40.01 && tempF <= 75){
                $("#t").addClass("moderate")
            } else if (tempF >= 75.01){
                $("#t").addClass("hot")
            }

            var days = 0
            var heading = $("<h5>").text("5 Day Forcast:")
            $("#display-5-day").append(heading)

            for (var i = 8; i < 40; i = i + 8){
                var newDate = $("<div>").addClass("col s2.75 fiveDay");
                var nextDay = $("<h6>").text(moment().add(days = days + 1, 'days').format('MMMM Do YYYY'));
                // var date = $("<p>").text(response.list[i].dt_txt)
                var iconCode = response.list[i].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                var icon = $("<img>").attr("src", iconurl);
                var description5 = $("<p>").text("Forecast: " + response.list[i].weather[0].description)
                var tempFa = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                var temp5 = $("<p>").text("Temperature: " + tempFa.toFixed(2) + "F");
                var humidity5 = $("<p>").text("Humidity: " + response.list[i].main.humidity)
                newDate.append(nextDay, icon, description5, temp5, humidity5);
                $("#display-5-day").append(newDate)
            }

        })

    }








})