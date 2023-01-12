var historyList = document.querySelector("#search-history")
var searchHis = []

var searchbtn = document.getElementById("search")

var city = document.querySelector("#cityName")



var mainCity = document.querySelector("#city-main")
var mainDate = document.querySelector("#date-main")
var mainTemp = document.querySelector("#temp")
var mainWind = document.querySelector("#wind")
var mainHumid = document.querySelector("#humid")

var futureCard = document.querySelectorAll(".for-card")
var futureDate = document.querySelectorAll(".for-date")
var futureTemp = document.querySelectorAll(".for-temp")
var futureWind = document.querySelectorAll(".for-wind")
var futureHumid  = document.querySelectorAll(".for-humid")
var icons = document.querySelectorAll(".icon")

var today = dayjs().format("MMM D, YYYY")

mainDate.textContent = today

getLocation = (name) => {

    var URL = 'http://api.openweathermap.org/geo/1.0/direct?q='+ name + '&limit=5&appid=57d36bf47787a5ae0769083997c01298'
  
    fetch(URL)
    .then(function (response) {
     
      return response.json()
    })
    .then(function (details) {
      getForecast(details)
      console.log(details)
    })
   
};

getForecast = (details) => {
  var lat = details[0].lat;
  var long = details[0].lon;
  var weatherURL =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" +
    long +
    "&units=imperial&appid=57d36bf47787a5ae0769083997c01298"
  
  fetch(weatherURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      searchHistory(details)
      renderCurrentWeather(details, data)
      upcoming(data)
    })
}

renderCurrentWeather = (searchCity, weather) => {
  mainCity.textContent = searchCity[0].name
  mainTemp.textContent = weather.current.temp + " ℉"
  mainWind.textContent = weather.current.wind_speed + " mph"
  mainHumid.textContent = weather.current.humidity + " %"


  let iconData = weather.current.weather[0].icon

var icon1 =  document.querySelector(".icon1")

icon1.setAttribute("src", 'http://openweathermap.org/img/wn/' + iconData + '@2x.png')
};


upcoming = (weather) => {

  for (let i = 0; i < 5; i++) {
    futureDate[i].textContent = dayjs().add(i + 1, "day").format("MMM D, YYYY")
    futureTemp[i].textContent = weather.daily[i + 1].temp.day + " ℉"
    futureWind[i].textContent = weather.daily[i + 1].wind_speed + " mph"
    futureHumid[i].textContent = weather.daily[i + 1].humidity + " %"


    let iconNum = weather.daily[i + 1].weather[0].icon
    var icon = document.querySelectorAll(".icon")
    icon[i].setAttribute("src", 'http://openweathermap.org/img/wn/' + iconNum + '@2x.png')
  }
};

searchHistory = (details) => {
  var city = details[0].name
  searchHis.push(city)
  localStorage.setItem("searchHis", JSON.stringify(searchHis))
  console.log(searchHis)
  renderSearchHistory()
}

renderSearchHistory = () => {
  search.textContent = ""
  searchHis = JSON.parse(localStorage.getItem("searchHis"))
  citySearch = searchHis[0]

  for (let i = 0; i < searchHis.length; i++) {
    var button = document.createElement("button")
    button.textContent = searchHis[i]

    button.classList.add("btn")
    button.classList.add("btn-secondary")
    button.classList.add("btn-block")
    button.classList.add("mb-2")
    button.classList.add("searched-cities-btn")
    button.addEventListener("click", function (event) {
      getLocation();
    });
    historyList.appendChild(button)
  }

}






searchbtn.addEventListener("click", function (event) {
  event.preventDefault()

  getLocation(city.value)

  console.log(city.value)
})