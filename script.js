var resultsEl = document.querySelector(".results-container");
var inputEl = document.querySelector(".input-container");
var searchBtn = document.querySelector(".btn");
//

searchBtn.addEventListener("click", showResults);

function showResults() {
  inputEl.classList.add("hide");
  resultsEl.classList.remove("hide");
}

$(document).ready(function() {
  // to request data from openweather.org

  $(".btn").click(function() {
    var city = $(".location").val();

    if (city != "") {
      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial" +
          "&appid=de0beaf5a28fc57eed081e333502c625",

        type: "GET",

        dataType: "json",

        success: function(data) {
          var lat =  data.coord.lat;
          var long = data.coord.lon;
          console.log(data);

          var widget = show(data);
          $(".weather-container").html(widget);
          $(".location").val();
          show(data);
          var url = "https://en.wikipedia.org/w/api.php";

          var params = {
            action: "query",
            list: "geosearch",
            gscoord: `${lat}|${long}`,
            gsradius: "10000",
            gslimit: "10",
            format: "json"
          };
          
          url = url + "?origin=*";
          Object.keys(params).forEach(function(key) {
            url += "&" + key + "=" + params[key];
          });
          
          fetch(url)
            .then(function(response) {
              return response.json();
            })
            .then(function(response) {
              console.log(response.query.geosearch[0].pageid);
              var pages = response.query.geosearch;
              for (var place in pages) {
                let thing = document.createElement("a");
          
                thing.href =
                  "https://en.wikipedia.org/?curid=" +
                  response.query.geosearch[0].pageid;
                thing.textContent = "link";
                document.querySelector("body").append(thing);
              }
            })
            .catch(function(error) {
              console.log(error);
            });

        }
      });
    } else {
      $("#error").html("Field cannot be empty");
    }

   
  });

  //return data current for weather temp, humidity, wind, uv index

  function show(data) {
    return (
      "<h4>Current Weather for " +
      data.name +
      "," +
      data.sys.country +
      "</h4>" +
      "<h5><strong>Weather</strong>: " +
      data.weather[0].main +
      "</h5>" +
      "<h5><strong>Temperature</strong>: " +
      data.main.temp +
      "</h5>" +
      "<h5><strong>Pressure</strong>: " +
      data.main.pressure +
      "</h5>" +
      "<h5><strong>Humidity</strong>: " +
      data.main.humidity +
      "</h5>" +
      "<h5><strong>Min Temperature</strong>: " +
      data.main.temp_min +
      "</h5>" +
      "<h5><strong>Max Temperature</strong>: " +
      data.main.temp_max +
      "</h5>" +
      "<h5><strong>Wind speed</strong>: " +
      data.wind.speed +
      "</h5>"
    );
  }
 
});
/*var lat = "41.4993";
var long = "-81.6944";
var url = "https://en.wikipedia.org/w/api.php";

var params = {
  action: "query",
  list: "geosearch",
  gscoord: `${lat}|${long}`,
  gsradius: "10000",
  gslimit: "10",
  format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key) {
  url += "&" + key + "=" + params[key];
});

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response.query.geosearch[0].pageid);
    var pages = response.query.geosearch;
    for (var place in pages) {
      let thing = document.createElement("a");

      thing.href =
        "https://en.wikipedia.org/?curid=" +
        response.query.geosearch[0].pageid;
      thing.textContent = "link";
      document.querySelector("body").append(thing);
    }
  })
  .catch(function(error) {
    console.log(error);
  });*/