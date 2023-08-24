import { api, dataFormater, ui } from "../app.js";

export default class Controller {
  constructor() {
    this.coords = {};
    this.weatherInfo = {};
    this.cityInfo = {};
    this.timeInfo = {};
  }

  async getCurrentLocation() {
    //1) Call the geolocation API to get the coordinates
    const geolocationResponse = await api.callGeolocation();
    console.log(geolocationResponse);

    //2) Check if the user gets acces to the location
    if (!geolocationResponse.success || isNaN(geolocationResponse.data.lat) || isNaN(geolocationResponse.data.lng))
      return;

    //3) If the user gets acces to the location, store the coordinates in the coords object
    this.coords = geolocationResponse.data;

    //4) Call the weather API giving the coordinates
    this.weatherInfo = await api.getWeather(this.coords);    

    if (!this.weatherInfo.success) return;

    const { timeZone } = this.weatherInfo;

    //5) Gets the date based on the coordinates and weather API response
    this.timeInfo = dataFormater.formatDate(new Date(), timeZone);

    //6) Call the city information API based on the coordinates
    this.cityInfo = await api.getCityByCoords(this.coords);
    if(!this.cityInfo.success) return

    //7) Displays the data to the user
    ui.displayData(this.weatherInfo.data, this.cityInfo.data, this.timeInfo)
  }
};