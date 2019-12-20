$(document).ready(function () {
    // to request data from openweather.org
    $('#submitWeather').click(function () {

        var city = $("#city").val();
        if (city != '') {

            $.ajax({

                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city +
                    "&units=imperial" + "&appid=de0beaf5a28fc57eed081e333502c625",
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                    var widget = show(data);

                    $("#show").html(widget);

                    $("#city").val();
                    show()
                }
            });

        } else {
            $("#error").html('Field cannot be empty');
        }
    });



    //return data current for weather temp, humidity, wind, uv index

    function show(data) {
        return "<h4>Current Weather for " + data.name + "," + data.sys.country + "</h4>" +
            "<h5><strong>Weather</strong>: " + data.weather[0].main + "</h5>" +
            "<h5><strong>Temperature</strong>: " + data.main.temp + "</h5>" +
            "<h5><strong>Pressure</strong>: " + data.main.pressure + "</h5>" +
            "<h5><strong>Humidity</strong>: " + data.main.humidity + "</h5>" +
            "<h5><strong>Min Temperature</strong>: " + data.main.temp_min + "</h5>" +
            "<h5><strong>Max Temperature</strong>: " + data.main.temp_max + "</h5>" +
            "<h5><strong>Wind speed</strong>: " + data.wind.speed + "</h5>"
    }

    });