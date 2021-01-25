//Displays the current date and time
function formatDate() {
  let current = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let subHeading = document.querySelector("#day-time");
  let day = days[current.getDay()];
  let date = current.getDate();
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }

  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }

  let formattedDate = `as of ${day} ${date}, ${hours}:${minutes}`;
  let p = document.querySelector("#day-time");
  p.innerHTML = subHeading.value;

  return formattedDate;
}
let updateDayTime = document.querySelector("#day-time");
updateDayTime.innerHTML = formatDate();

//Add a search engine, when searching for a city (i.e. Paris),
//display the city name on the page after the user submits the form.

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", citySearch);

//Get your API key and save in a variable called apiKey
//Get the API response for the weather using metrics unit
function searchCity(city) {
  let apiKey = "c2d9b90e33955a3023ce0c9c75586190";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

//When searching for a city , display the current temperature of the city.
function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".degree");
  currentTemp.innerHTML = `${temperature}`;
  let tempDescription = document.querySelector(".currentForecast");
  tempDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity-stat");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind-stat");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

//Add a Current Location button.
//When clicking on it, it uses the Geolocation API to get your GPS coordinates
//to display the city and current temperature using the OpenWeather API.
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(requestPosition);
}

function requestPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c2d9b90e33955a3023ce0c9c75586190";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentLocationTemp);
}

function showCurrentLocationTemp(response) {
  let locationName = response.data.name;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${locationName}`;
  let localTemp = Math.round(response.data.main.temp);
  let currentLocTemp = document.querySelector(".degree");
  currentLocTemp.innerHTML = `${localTemp}`;
  let tempDescription = document.querySelector(".currentForecast");
  tempDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity-stat");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind-stat");
  wind.innerHTML = Math.round(response.data.wind.speed);
}
let currentButton = document.querySelector(".current-location");
currentButton.addEventListener("click", currentPosition);
