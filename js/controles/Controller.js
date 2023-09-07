import { api, dataFormater, ui } from "../app.js";

export default class Controller {
  fetchController = null;

  constructor() {
    this.coords = {};
    this.weatherInfo = {};
    this.cityInfo = {};
    this.timeInfo = {};
    this.charging = false;
  }

  async weatherByLocation() {
    //1) Call the geolocation API for get the current location
    const geolocationResponse = await api.callGeolocation();

    //2) Check if the user gets acces to the location if not, return the function
    if (!geolocationResponse.success || isNaN(geolocationResponse.data.lat) || isNaN(geolocationResponse.data.lng))
      return;

    
    ui.spinner();
    //3) Call the weather API giving the coordinates
    const response = await this.getWeatherData(geolocationResponse.data)

    //4) Check if the weather data has been received correctly, otherwise return the function
    if(!response.success) return `Error: ${response.message}`

    //5) Display the data to the user calling the ui class and passing the weather data received from the API
    ui.displayData(this.weatherInfo.data, this.cityInfo.data, this.timeInfo);
  }

  async getWeatherData(data) {
    this.weatherInfo = await api.getWeather(data);

    if (!this.weatherInfo.success) return {
      success: false,
      message: `Somenthing went wrong with de weather information`
    };

    const { timeZone } = this.weatherInfo;

    //5) Gets the date based on the coordinates and weather API response
    this.timeInfo = dataFormater.formatDate(new Date(), timeZone);

    //6) Call the city information API based on the coordinates
    this.cityInfo = await api.getCityByCoords(data);
    if (!this.cityInfo.success) return {
      success: false,
      message: `Somenthing went wrong with de city information`,
    };

    return {
      success: true,
      message: 'Data set in the local variables'
    }
  }

  async generateSuggestions(inputValue) {
    if(this.fetchController)
      api.abortFetch();
    
    if (inputValue === "") {
      ui.displaySuggestions('remove');
      return;
    };
    
    this.cityInfo = await api.getCitySuggestions(inputValue);

    if (!this.cityInfo.success) {
      return
    }

    this.fetchController = this.cityInfo.fetchController;
    const suggestions = this.cityInfo.suggestions;

    ui.renderSuggestions(suggestions);

    ui.displaySuggestions('add');
  }

  async selectSuggest(e) {
    if (!e.target.classList.contains("search-matches__el")) return;

    const suggest = e.target.textContent;
    ui.changeSearchValue(suggest);
    ui.spinner();

    this.cityInfo = await api.getCitySuggestions(suggest, 'search');

    if (!this.cityInfo.success) return;

    const response = await this.getWeatherData(this.cityInfo.data);

    if(!response.success) return;

    ui.displayData(this.weatherInfo.data, this.cityInfo.data, this.timeInfo);    
  }

  searchFocused(e) {
    ui.searchActive();
    
    if (e.target.value) {
      ui.displaySuggestions();
    }
  };

  searchBlur() {
    if (this.fetchController) api.abortFetch();

    setTimeout(() => {
      ui.searchActive("remove");
      ui.displaySuggestions('remove');
    }, 200);  
  }

  async weatherDefault() {
    this.cityInfo = await api.getCitySuggestions('Ciudad de México, México', "search");

    if (!this.cityInfo.success) return;

    const response = await this.getWeatherData(this.cityInfo.data);

    if (!response.success) return;

    ui.displayData(this.weatherInfo.data, this.cityInfo.data, this.timeInfo);
  }

  async searchCity(e) {
    e.preventDefault();

    const value = ui.getInputValue();

    if (value === undefined || value === '') return;
    
    this.cityInfo = await api.getCitySuggestions(value, 'search');

    if (!this.cityInfo.success) return;

    const response = await this.getWeatherData(this.cityInfo.data);

    if (!response.success) return;

    ui.displayData(this.weatherInfo.data, this.cityInfo.data, this.timeInfo);
  }
};