import { dataFormater } from "../app.js";

export default class UI {
  constructor() {
  }

  displayData(weatherData, cityData, date) {
    this.displayHeaderContent(cityData, date);

    this.displayCurrentWeather(weatherData.current);
  }

  displayHeaderContent(cityData, date) {
    const dateDiv = document.querySelector(".header__text-date");
    const locationDiv = document.querySelector(".header__text-location");

    const {country, city, state} = cityData;

    dateDiv.textContent = date;
    locationDiv.innerHTML = `${city ? 'Cd ' + city : state} / ${country}`;
  }

  displayCurrentWeather(currentWeather) {
    console.log(currentWeather);
    const {temp, weather, clouds, humidity, sunrise, sunset, uvi, wind_speed} = currentWeather;

    const tempDiv = document.querySelector(".description__temp");
    const descriptionDiv = document.querySelector(".description__name");
    const descriptionDivPrimary = document.querySelector(".description__name-primary")
    const descriptionDivSecondary = document.querySelector(".description__name-secondary")

    tempDiv.innerHTML = `${parseInt(temp)}&deg;C`;
    
    const weatherDescription = dataFormater.getDescriptionByID(weather.id);
    if (weatherDescription.length === 1) {
      descriptionDivPrimary.textContent = weatherDescription[0];
      descriptionDivSecondary.innerHTML = '&nbsp;';
    }
    
  }
}