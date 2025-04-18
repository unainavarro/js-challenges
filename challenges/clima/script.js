const apiKey = "dc0d81fd775ea4862087481d8f849365";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherIcons = {
  Clouds: "☁️",
  Clear: "🌤️",
  Rain: "🌧️",
  Drizzle: "⛈️",
  Mist: "🌫️",
};

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "ºc";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    const weatherMain = data.weather[0].main;

    weatherIcon.innerHTML = weatherIcons[weatherMain] || "📎";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
