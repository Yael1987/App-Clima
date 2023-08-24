import Controller from "./controles/Controller.js";
import UI from "./view/UI.js";
import API from "./modules/API.js";

const controller = new Controller();
const ui = new UI();
const api = new API();

document.addEventListener("DOMContentLoaded", () => {
  const btnGetLocation = document.querySelector('.btn--get-location');

  btnGetLocation.addEventListener('click', () => {
    controller.getLocation();
  });
});

export {
  controller,
  ui,
  api
}