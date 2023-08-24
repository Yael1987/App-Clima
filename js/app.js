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

  btnGetLocation.addEventListener('click', () => {
    controller.getCurrentLocation();
  });
});

export {
  controller,
  ui,
  api,
  dataFormater
}