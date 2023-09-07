import { dataFormater } from "../app.js";
import getWeatherDescription from '../utils/dataWeather.js'
export default class UI {
  currentHour;
  inputSearch = document.querySelector(".search-field__input");
  suggestions = document.querySelector(".search-matches");

  displayData(weatherData, cityData, date) {
    //1) Sets the current hour for custom iamges and icons
    this.currentHour = +date.slice(-5, -3);

    //2) Using the current hour set the background image
    this.changeBackgroundImage(this.currentHour);

    //3) Displays the city and date information
    this.displayHeaderContent(cityData, date);

    //4) Displays the current weather information
    this.displayCurrentWeather(weatherData.current);

    this.displayHourlyWeather(weatherData.hourly);

    this.displayDailyWeather(weatherData.daily);

    setTimeout(() => {
      this.spinner("remove");
    }, 500);
  }

  changeBackgroundImage() {
    const containerApp = document.querySelector(".container");

    containerApp.classList.forEach((classEl) => {
      if (classEl === "container") {
        return;
      }

      containerApp.classList.remove(classEl);
    });

    if (this.currentHour < 5) {
      containerApp.classList.add("night");
    } else if (this.currentHour >= 5 && this.currentHour < 10) {
      containerApp.classList.add("morning");
    } else if (this.currentHour >= 10 && this.currentHour < 15) {
      containerApp.classList.add("day");
    } else if (this.currentHour >= 15 && this.currentHour < 20) {
      containerApp.classList.add("evening");
    } else if (this.currentHour >= 20 && this.currentHour < 24) {
      containerApp.classList.add("night");
    }
  }

  //Displays the current date and the city information
  displayHeaderContent(cityData, date) {
    const dateDiv = document.querySelector(".header__text-date");
    const locationDiv = document.querySelector(".header__text-location");

    const {country, city, state} = cityData;

    dateDiv.textContent = date;
    locationDiv.innerHTML = `${city ? "Cd " + city : state} / ${country}`;
  }

  //Displays the current weather information
  displayCurrentWeather(currentWeather) {
    const {temp, weatherId, ...todayData} = currentWeather;

    const tempDiv = document.querySelector(".description__temp");
    const descriptionDivPrimary = document.querySelector(
      ".description__name-primary"
    );
    let descriptionDivPrimaryConector = document.querySelector(
      ".description__name-primary > span"
    );

    const descriptionDivSecondary = document.querySelector(
      ".description__name-secondary"
    );
    const iconSVG = document.querySelector(".description__icon");

    if (!descriptionDivPrimaryConector) {
      descriptionDivPrimaryConector = document.createElement("span");
    }

    tempDiv.innerHTML = `${parseInt(temp)}&deg;C`;

    //Gets the icon and the description of the weather
    const { description, iconUrl } = getWeatherDescription(weatherId, this.currentHour, "full");

    console.log(description, iconUrl);

    //Displays the weather description
    if (description.length === 1) {
      descriptionDivPrimary.innerHTML = description[0];
      descriptionDivPrimaryConector.innerHTML = "&nbsp;";
      descriptionDivSecondary.innerHTML = "&nbsp;";
    } else if (description.length === 2) {
      descriptionDivPrimary.innerHTML = description[0];
      descriptionDivPrimaryConector.innerHTML = "&nbsp;";
      descriptionDivSecondary.innerHTML = description[1];
    } else if (description.length === 3) {
      descriptionDivPrimary.textContent = description[0];
      descriptionDivPrimaryConector.textContent = ` ${description[1]}`;
      descriptionDivSecondary.textContent = description[2];
    }

    descriptionDivPrimary.appendChild(descriptionDivPrimaryConector);

    //Displays the weather icon
    iconSVG.innerHTML = `<use xlink:href="./src/img/icons.svg#icon-${iconUrl}"></use>`;

    const todayInfoCards = document.querySelectorAll(
      ".card--today .card__unit"
    );

    todayInfoCards.forEach((cardEl) => {
      if (cardEl.classList.contains("wind_speed")) {
        const spanSpeed = document.createElement("span");
        spanSpeed.classList.add("span-sm");
        spanSpeed.textContent = `m/s`;
        cardEl.textContent = `${todayData.wind_speed} `;
        cardEl.appendChild(spanSpeed);
      }

      if (cardEl.classList.contains("sunrise")) {
        cardEl.textContent = `${todayData.sunrise}:00`;
      }

      if (cardEl.classList.contains("sunset")) {
        cardEl.textContent = `${todayData.sunset}:00`;
      }

      if (cardEl.classList.contains("humidity")) {
        cardEl.textContent = `${todayData.humidity}%`;
      }

      if (cardEl.classList.contains("uvi")) {
        cardEl.textContent = `${parseInt(todayData.uvi)} `;
      }

      if (cardEl.classList.contains("clouds")) {
        cardEl.textContent = `${todayData.clouds}%`;
      }
    });
  }

  displayHourlyWeather(hourlyWeather) {
    const hourlyInfoCards = document.querySelectorAll(".card--hourly");

    hourlyInfoCards.forEach((cardEl, index) => {
      const {temp, time, weatherId} = hourlyWeather[index];

      const {description, iconUrl} = getWeatherDescription(weatherId, +time);

      this.clearHTML(cardEl.querySelector(".card__text"));

      cardEl.querySelector(".card--hourly__time").textContent = `${time}:00`;

      cardEl.querySelector(
        ".card__icon"
      ).innerHTML = `<use xlink:href="./src/img/icons.svg#icon-${iconUrl}"></use>`;

      description.forEach((line) => {
        const pEl = document.createElement("p");
        pEl.classList.add("card__text--p");

        pEl.textContent = line;

        cardEl.querySelector(".card__text").appendChild(pEl);
      });

      cardEl.querySelector(".card__unit").innerHTML = `${parseInt(temp)}&deg;`;
    });
  }

  displayDailyWeather(dailyWeather) {
    const dailyInfoCards = document.querySelectorAll(".card--daily");

    dailyInfoCards.forEach((card, i) => {
      const {humidity, temp, time, uvi, weatherId, wind_speed} =
        dailyWeather[i];

      //Displays the date information in two lines
      const dayData = dataFormater.formatDateForCard(time);
      card.querySelector(".card--daily__date").children[0].textContent =
        dayData.full;
      card.querySelector(".card--daily__date").children[1].textContent =
        dayData.day;

      const spanMax = document.createElement("span");
      spanMax.classList.add("card--daily__temp--max");
      spanMax.innerHTML = `${parseInt(temp.max)}&deg;`;

      card.querySelector(".card--daily__temp").innerHTML = ` / ${parseInt(
        temp.min
      )}&deg;`;
      card
        .querySelector(".card--daily__temp")
        .insertAdjacentElement("afterbegin", spanMax);

      const {description, iconUrl} = getWeatherDescription(weatherId, 6);

      card.querySelector(
        ".card--daily__info"
      ).children[0].innerHTML = `<use xlink:href="./src/img/icons.svg#icon-${iconUrl}"></use>`;
      card.querySelector(".card--daily__info").children[1].textContent =
        description.join(" ");

      card
        .querySelector(".card--daily__extras")
        .querySelectorAll(".extras__item")
        .forEach((extra, i) => {
          if (i === 0) {
            extra.querySelector(
              ".extras__item-text"
            ).textContent = `${wind_speed} m/s`;
          } else if (i === 1) {
            extra.querySelector(
              ".extras__item-text"
            ).textContent = `${humidity}%`;
          } else if (i === 2) {
            extra.querySelector(".extras__item-text").textContent =
              parseInt(uvi);
          }
        });
    });
  }

  spinner(action = "add") {
    const body = document.querySelector("body");
    const layer = document.querySelector(".layer");

    body.classList[action]("searching");
    layer.classList[action]("loading");
  }

  searchActive(action = "add") {
    const body = document.querySelector("body");

    body.classList[action]("searching");
  }

  changeSearchValue(newValue) {
    this.inputSearch.value = newValue;
    this.displaySuggestions('remove');
  }

  displaySuggestions(option = 'add') {
    if (option === 'add') {
      if (document.querySelector("body").classList.contains("searching")) {
        this.suggestions.classList.add("active");
      }
      return;
    }
    
    this.suggestions.classList[option]('active');
  }

  renderSuggestions(suggestions) {
    if (suggestions.length > 0) {
      this.suggestions.innerHTML = "";

      suggestions.forEach(city => {
        const matchParagraph = document.createElement("div");
        matchParagraph.classList.add("search-matches__el");

        matchParagraph.textContent = city;
        this.suggestions.appendChild(matchParagraph);
      });
    }
  }

  getInputValue() {
    return this.inputSearch.value;
  }

  clearHTML(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
}