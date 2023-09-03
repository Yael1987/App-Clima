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
  const inputSearch = document.querySelector('.search-field__input')

  btnGetLocation.addEventListener('click', () => {
    controller.weatherByLocation();
  });

  inputSearch.addEventListener('focus', e => {
    ui.searchActive();
  })

  inputSearch.addEventListener('blur', e => {
    ui.searchActive('remove');
  })
});

export {
  ui,
  api,
  dataFormater
}