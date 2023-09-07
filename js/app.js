import Controller from "./controles/Controller.js";
import UI from "./view/UI.js";
import API from "./modules/API.js";

import DataFormater from './utils/DataFormater.js';

//Instances of the main clases
const controller = new Controller();
const ui = new UI();
const api = new API();

//Instances of the utils clases
const dataFormater = new DataFormater();

document.addEventListener("DOMContentLoaded", () => {
  const btnGetLocation = document.querySelector('.btn--get-location');
  const inputSearch = document.querySelector('.search-field__input');
  const suggestions = document.querySelector(".search-matches");
  const searchBtn = document.querySelector(".search-field__submit");

  controller.weatherDefault();

  btnGetLocation.addEventListener('click', () => {
    controller.weatherByLocation();
  });

  suggestions.addEventListener("click", (e) => {
    controller.selectSuggest(e);
  });

  inputSearch.addEventListener('focus', e => {
    controller.searchFocused(e);
  })

  inputSearch.addEventListener('input', e => {
   controller.generateSuggestions(e.target.value);
  })

  inputSearch.addEventListener("blur", () => {
    controller.searchBlur();
  });

  searchBtn.addEventListener('click', e => {
    controller.searchCity(e);
  })
});

export {
  ui,
  api,
  dataFormater
}