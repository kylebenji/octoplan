import { useEffect, useState } from "react";
import { WEATHER_API_URL, WEATHER_DAYS_SHOW } from "../../config";
import {
  faCloudShowersHeavy,
  faTemperatureHigh,
  faTemperatureLow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WeatherDay({ day }) {
  const dateArr = day.time.split("-"); //split input string into component parts
  dateArr[1] = parseInt(dateArr[1], 10) - 1; //making the month value into an indexed value for the Date constructor
  const date = new Date(...dateArr);
  const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
  return (
    <div className="weather-day border border-primary p-1">
      <p>{dateString}</p>
      <p>
        <FontAwesomeIcon icon={faTemperatureHigh} /> {day.temperature_2m_max}
      </p>
      <p>
        <FontAwesomeIcon icon={faTemperatureLow} /> {day.temperature_2m_min}
      </p>
      <p>
        <FontAwesomeIcon icon={faCloudShowersHeavy} />{" "}
        {day.precipitation_probability_mean}%
      </p>
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
      "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean&timezone=auto&temperature_unit=fahrenheit";
    return url;
  };

  //function to parse returned data from API
  function buildDays(data) {
    const dailyData = Object.entries(data.daily);
    const days = data.daily.time.map((time, i) => {
      return Object.fromEntries(dailyData.map((data) => [data[0], data[1][i]]));
    });
    days.splice(WEATHER_DAYS_SHOW);
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
      <div className="d-flex calendar">
        {weather.length
          ? weather.map((day, i) => <WeatherDay key={"day-" + i} day={day} />)
          : ""}
      </div>
    </div>
  );
}
