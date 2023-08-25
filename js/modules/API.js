import { dataFormater } from "../app.js";

export default class API {
  callGeolocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position =>
            resolve({
              success: true,
              data: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            }),
          error =>
            resolve({
              success: false,
              message: "Geolocation permission denied",
            })
        );
      } else {
        resolve({
          success: false,
          message: "Geolocation not supported for this browser"
        })
      }
    });
  };

  async getWeather({ lat, lng }) {
    //Sets de url of the API 
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=143328e49e68626ede078c0fb85e7c8d&lang=es&units=metric`;

    try {
      //2) Makes de call to the API
      const response = await fetch(url);
      const data = await response.json();

      const { timezone, current, hourly, daily } = data;
      const { clouds, temp, humidity, sunrise, sunset, uvi, weather, wind_speed } = current; //Extracting the data of the current weather

      //3) Extract de needed data and returns it to the user
      const hourlyData = hourly.slice(1, 7).map(dataEl => {
        const { dt, temp, weather } = dataEl;

        return {
          time: dataFormater.formatHourFromUnix(dt),
          temp,
          weatherId: weather[0].id
        };
      });

      const dailyData = daily.slice(1).map(dataEl => {
        const { dt, temp, weather, uvi, wind_speed, humidity } = dataEl;

        return {
          time: new Date(dt * 1000),
          temp: {
            min: temp.min,
            max: temp.max
          },
          weatherId: weather[0].id,
          uvi, 
          wind_speed,
          humidity
        };
      });

      return {
        success: true,
        data: {
          timezone,
          current: {
            clouds,
            humidity,
            sunrise: dataFormater.formatHourFromUnix(sunrise),
            sunset: dataFormater.formatHourFromUnix(sunset),
            temp,
            uvi,
            wind_speed,
            weatherId: weather[0].id,
          },
          hourly: hourlyData,
          daily: dailyData,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }

  async getCityByCoords({lat, lng}) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=8`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const { city, country, state } = data.address;

      return {
        success: true,
        data: {
          city,
          country,
          state
        }
      };
    } catch (error) {
      return {
        success: false,
        message: error
      }
    }
  }
}