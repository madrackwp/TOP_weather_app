import "./styles.css";

// console.log("HELLO WORLD");

const WEATHER_API_KEY = "ca5278f6817f42e8b6992013240204";
const GIPHY_API_KEY = "ufRpW4xp0cl2TyAoBZxc9J6zwQD1uUBm";

const weather_gif = document.getElementById("weather-gif");
const weather_info = document.getElementById("weather-info-temp");
// console.log(weather_gif);

const weather_form = document.getElementById("weather-form");
const weather_form_submit_btn = document.querySelector(
  "#weather-form form button"
);
const weather_form_input = document.querySelector("#weather-form form input");

async function getWeather(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}`
  );

  if (response.status == 200) {
    console.log("Weather data successful!");
    // console.log(response);
    return response.json(); //This returns a promise
  } else {
    throw new Error(response.status);
  }
}

async function getGIF(query, weirdness = 4) {
  let response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${query}&weirdness=${weirdness}`
  );

  const gifData = await response.json();
  displayGIF(gifData);
}

function displayGIF(GIFData) {
  weather_gif.src = GIFData.data.images.original.url;
}

weather_form_submit_btn.addEventListener("click", (event) => {
  event.preventDefault();
  try {
    getWeather(weather_form_input.value)
      .then((weatherData) => {
        getGIF(weatherData.current.condition.text).then(() => {
          weather_info.innerText = `It is currently ${weatherData.current.condition.text} in ${weatherData.location.name}`;
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  } catch (error) {
    console.log("ERROR!");
  }
});
