import { dataFormater } from "../app.js";
import getWeatherDescription from '../utils/dataWeather.js'
export default class UI {
  constructor() {
    this.currentHour;
  }

  displayData(weatherData, cityData, date) {

    this.currentHour = +date.slice(-5, -3);

    this.changeBackgroundImage(this.currentHour);

    this.displayHeaderContent(cityData, date);

    this.displayCurrentWeather(weatherData.current);

    this.displayHourlyWeather(weatherData.hourly);
  }

  changeBackgroundImage() {
    const containerApp = document.querySelector(".container");

    containerApp.classList.forEach(classEl => {
      if (classEl === 'container') {
        return;
      }

      containerApp.classList.remove(classEl);
    })

    if (this.currentHour < 5) {
      containerApp.classList.add("night");
    }else if (this.currentHour >= 5 && this.currentHour < 10) {
      containerApp.classList.add('morning')
    } else if (this.currentHour >= 10 && this.currentHour < 15) {
      containerApp.classList.add("day");
    } else if (this.currentHour >= 15 && this.currentHour < 20) {
      containerApp.classList.add("evening");
    } else if(this.currentHour >= 20 && this.currentHour < 24){
      containerApp.classList.add('night')
    }
  }

  displayHeaderContent(cityData, date) {
    const dateDiv = document.querySelector(".header__text-date");
    const locationDiv = document.querySelector(".header__text-location");

    const {country, city, state} = cityData;

    dateDiv.textContent = date;
    locationDiv.innerHTML = `${city ? 'Cd ' + city : state} / ${country}`;
  }

  displayCurrentWeather(currentWeather) {
    const {temp, weatherId, ...todayData} = currentWeather;

    const tempDiv = document.querySelector(".description__temp");
    const descriptionDivPrimary = document.querySelector(".description__name-primary")
    const descriptionDivPrimaryConector = document.querySelector(".description__name-primary > span")
    const descriptionDivSecondary = document.querySelector(".description__name-secondary")
    const iconDiv = document.querySelector(".description__icon");

    tempDiv.innerHTML = `${parseInt(temp)}&deg;C`;

    const {description, iconUrl} = getWeatherDescription(weatherId, this.currentHour, 'full');

    //Displays the weather description
    if (description.length === 1) {
      descriptionDivPrimary.innerHTML = description[0];
      descriptionDivPrimaryConector.innerHTML = "&nbsp;";
      descriptionDivSecondary.innerHTML = '&nbsp;';
    }

    if (description.length === 2) {
      descriptionDivPrimary.innerHTML = description[0];
      descriptionDivPrimaryConector.innerHTML = "&nbsp;";
      descriptionDivSecondary.innerHTML = description[1];
    }

    if (description.length === 3) {
      descriptionDivPrimary.innerHTML = description[0];
      descriptionDivPrimaryConector.innerHTML = description[1];
      descriptionDivSecondary.innerHTML = description[2];
    }
    
    //Displays the weather icon
    iconDiv.data = iconUrl;

    const todayInfoCards = document.querySelectorAll('.card--today .card__unit');

    todayInfoCards.forEach(cardEl => {
      if (cardEl.classList.contains('wind_speed')) {
        const spanSpeed = document.createElement("span");
        spanSpeed.classList.add("span-sm");
        spanSpeed.textContent = `m/s`;
        cardEl.textContent = `${(todayData.wind_speed)} `;
        cardEl.appendChild(spanSpeed);
      }

      if (cardEl.classList.contains('sunrise')){
        cardEl.textContent = `${(todayData.sunrise)}:00`;
      }

      if (cardEl.classList.contains('sunset')){
        cardEl.textContent = `${(todayData.sunset)}:00`;
      }

      if (cardEl.classList.contains('humidity')){
        cardEl.textContent = `${(todayData.humidity)}%`;
      }

      if (cardEl.classList.contains('uvi')){
        // cardEl.textContent = `${(todayData.uvi)} `;

        const spanUV = document.createElement('span');
        spanUV.classList.add('span-sm');

        if (todayData.uvi <= 2) {
          spanUV.textContent = `Bajo`;
        }

        if (todayData <= 5) {
          spanUV.textContent = `Medio`;
        }

        if (todayData <= 7) {
          spanUV.textContent = `Alto`;
        }

        if (todayData <= 10) {
          spanUV.innerHTML = `Muy\nAlto`;
        }

        if (todayData > 10) { 
          spanUV.textContent = `Extremo`;
        }

        cardEl.removeChild(cardEl.firstChild);

        cardEl.appendChild(spanUV);
      }

      if (cardEl.classList.contains("clouds")) {
        cardEl.textContent = `${todayData.clouds}%`;
      }
    })
  }

  displayHourlyWeather(hourlyWeather) {
    console.log(hourlyWeather);
    const hourlyInfoCards = document.querySelectorAll('.card--hourly');
    
    hourlyInfoCards.forEach((cardEl, index) => {
      const { temp, time, weatherId } = hourlyWeather[index];

      const { description, iconUrl } = getWeatherDescription(weatherId, +time);

      this.clearHTML(cardEl.children[2]);

      cardEl.children[0].textContent = `${time}:00`;

      cardEl.children[1].data = iconUrl;

      description.forEach((line) => {
        const pEl = document.createElement("p");
        pEl.classList.add("card__text--p");

        pEl.textContent = line;

        cardEl.children[2].appendChild(pEl);
      });

      cardEl.children[3].innerHTML = `${parseInt(temp)}&deg;`;
    })
  }

  clearHTML(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
}