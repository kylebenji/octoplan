import { useEffect, useState } from "react";
import { WEATHER_API_URL } from "../../config";

function WeatherDay({ day }) {
  const date = new Date(day.time);
  const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
  return (
    <div className="day border border-primary">
      <p>{dateString}</p>
      <p>High: {day.temperature_2m_max}</p>
      <p>Low: {day.temperature_2m_min}</p>
    </div>
  );
}

export default function Weather() {
  const [weather, setWeather] = useState({});

  //put together API URL
  const buildWeatherURL = (pos) => {
    let url =
      WEATHER_API_URL +
      "?latitude=" +
      pos.coords.latitude +
      "&longitude=" +
      pos.coords.longitude +
      "&daily=temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=fahrenheit";
    return url;
  };

  //function to parse returned data from API
  function buildDays(data) {
    console.log(data);
    const dailyData = Object.entries(data.daily);
    const days = data.daily.time.map((time, i) => {
      return Object.fromEntries(dailyData.map((data) => [data[0], data[1][i]]));
    });
    return days;
  }

  //fetch data after render
  useEffect(() => {
    //fetch data from weather API for current location
    async function fetchWeather(position) {
      const weatherURL = buildWeatherURL(position);
      fetch(weatherURL)
        .then((response) => response.json())
        .then((data) => {
          const days = buildDays(data);
          setWeather(days);
        });
    }

    //get location from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather(position),
        function () {
          alert("Could not find your position");
        }
      );
    }
  }, []);

  //display the daily weather conditionally
  return (
    <div>
      <h5>Forecast:</h5>
      <div className="d-flex justify-content-between calendar">
        {weather.length
          ? weather.map((day, i) => <WeatherDay key={"day-" + i} day={day} />)
          : ""}
      </div>
    </div>
  );
}
