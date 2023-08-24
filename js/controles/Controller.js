import { api } from "../app.js";

export default class Controller {
  constructor() {
    this.coords = {};
  }

  async getLocation() {
    //1) Call the geolocation API to get the coordinates
    const geolocationResponse = await api.callGeolocation();
    console.log(geolocationResponse);

    //2) Check if the user gets acces to the location

    //3) If the user gets acces to the location, store the coordinates in the coords object

    //4) Call the weather API giving the coordinates

    //5) Gets the date based on the coordinates and weather API response

    //6) Call the city information API based on the coordinates

  }
};